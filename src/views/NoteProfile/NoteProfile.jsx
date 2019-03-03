import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Edit from '@material-ui/icons/EditOutlined';
import Favorite from '@material-ui/icons/Favorite';
import GetApp from '@material-ui/icons/GetAppOutlined';
import Delete from '@material-ui/icons/Delete';
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { noteController } from "variables/general.jsx";
import { Link, Redirect } from "react-router-dom";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

const styles = theme => ({
  link: {
    color: '#FFF',
  },
  left: {
    float: 'left',
    fontSize: 30
  },
  right: {
    float: 'right'
  }
});

class NoteProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
      redirect_url: '/',

      loaded: false,

      br: false,
      notificationMessage: "null",
      notificationType: null,
    };
  }

  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }

  typeToIcon = (type) => {
    if (type === "success")
      return Done;
    if (type === "danger")
      return ErrorOutline;
    return null;
  }

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  }

  updateEditorContent = content => {
    this.setState({content});
  }

  componentDidMount(){

    let { meetingId, ownerId } = this.props.match.params;
    let { userId } = this.props;
    let api = noteController.getNoteByOwnerIdByMeetingId(userId, ownerId, meetingId);
    fetch(api, {
      method: 'get',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => res[0])
    .then(res => {
      if (!res){
        this.setState({ 
          redirect: true, 
          redirect_url: "/note/"+meetingId+"/"+ownerId+"/edit"
        });
        return;
      }
      if (res.error){
        console.log(res.error);
        return;
      }
      else {
        console.log(res)
        this.setState({
          loaded: true,
          id: res.meetingNote.id,
          heading: res.meetingNote.title,
          meetingHeading: meetingId,
          name: ownerId,
          content: res.meetingNote.note,
          favorite: res.collected,
        })
      }
    })
  }

  exportPDF = (e) => {
    e.preventDefault();
    var iframe=document.createElement('iframe');
    document.body.appendChild(iframe);
    var iframedoc=iframe.contentDocument||iframe.contentWindow.document;
    iframedoc.body.innerHTML=this.state.content;
    html2canvas(iframedoc.body)
    .then((canvas) => {
      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
      var pdf = new jsPDF('', 'pt', 'a4');

      //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
      pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
      pdf.save(this.state.id+'.pdf');
      this.success("开始下载");
    })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleFavorite = (e) => {
    e.preventDefault();
    let favorite = !this.state.favorite;
    this.setState({ favorite });
    let api = noteController.handleFavorite(this.state.id);
    let method = favorite ? 'post' : 'delete';
    
    fetch(api, {
      method: method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.props.userId
    })
    .then(res => res.json())
    .then(res => {
      if (res.error){
        console.log(res.error);
        this.warning('收藏失败');
        return;
      }
      else {
        if (favorite)
          this.success('收藏成功');
        else
          this.success('取消收藏');
      }
    })
    .catch(e => {
      console.log(e);
      this.warning('收藏失败');
    })
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.success("删除成功")
  }

  render(){
    const { classes, userId } = this.props;
    //const {loaded, heading, author } = this.state;
    let { meetingId, ownerId } = this.props.match.params;
    if (this.state.redirect){
      return <Redirect to={this.state.redirect_url}/>
    }
    return (
      <div>
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h3 className={classes.cardTitleWhite}>
                  {"会议名称："}<Link to={"/meeting/"+meetingId+"/profile"} className={classes.link}>{this.state.meetingHeading}</Link>
                </h3>
                <h4>
                  {"作者："}<Link to={"/user/"+ownerId+"/profile"} className={classes.link}>{this.state.name}</Link>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div>
                    <p className={classes.left} >{this.state.heading}</p>
                    <p className={classes.right} >
                    {
                      userId === ownerId && 
                      <IconButton onClick={() => { this.setState({redirect: true, redirect_url: "/note/"+meetingId+"/"+ownerId+"/edit"})}}>
                        <Edit/>
                      </IconButton>
                    }
                    <IconButton color={this.state.favorite?"secondary":"default"} onClick={this.handleFavorite}>
                      <Favorite/>
                    </IconButton>
                    <IconButton onClick={this.exportPDF}>
                      <GetApp/>
                    </IconButton>
                    {
                      userId === ownerId && 
                      <IconButton onClick={this.handleDelete}>
                        <Delete/>
                      </IconButton>
                    }
                    </p>
                  </div>
                </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                  <Divider/>
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }}>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
          place="br"
          color={this.state.notificationType}
          icon={this.typeToIcon(this.state.notificationType)}
          message={this.state.notificationMessage}
          open={this.state.br}
          closeNotification={() => this.setState({ br: false })}
          close
        />
        </div>
      
    )
  }
}
export default withStyles(styles)(NoteProfile);