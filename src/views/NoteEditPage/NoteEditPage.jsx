import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Done from '@material-ui/icons/Done';
import ErrorOutline from "@material-ui/icons/ErrorOutline";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { noteController } from 'variables/general.jsx';
import { Link, Redirect } from "react-router-dom";
import wangeditor from 'wangeditor';

const styles = theme => ({
  editor: {
    width: '100%'
  },
  link: {
    color: '#FFF',
  },
});


class NoteEditPage extends React.Component {
  constructor(props){
    super(props);
    const {userId} = this.props;
    const {meetingId, ownerId} = this.props.match.params;
    this.state = {
      loaded: false,

      redirect: userId !== ownerId ? true : false,
      redirect_url: userId !== ownerId ? "/note/" + meetingId + "/" + ownerId + "/profile" : "/",

      br: false,
      notificationMessage: "null",
      notificationType: null,
    };
  }

  componentDidMount(){
    this.editor = new wangeditor('#div1');
    this.editor.customConfig.showLinkImg = true;
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.create();

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
      // create a new note
      if (!res){
        this.setState({ 
          loaded: true, 
          status: "new",
          id: null,
          heading: "",
          meetingHeading: meetingId,
          name: ownerId,
        })
        return;
      }

      if (res.error){
        console.log(res.error);
        this.warning("加载失败");
        return;
      }
      else {
        console.log(res)
        this.setState({
          loaded: true,
          status: "edit",
          id: res.meetingNote.id,
          heading: res.meetingNote.title,
          meetingHeading: meetingId,
        })
        this.editor.txt.html(res.meetingNote.note);
      }
    })
    .catch(e => {
      console.log(e);
      this.warning("加载失败");
    })
    
    
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

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  }

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { meetingId, ownerId } = this.props.match.params;
    //console.log(this.editor.txt.html());

    if (this.state.status === "new"){
      let api = noteController.createNote();
      let msg = {
        "collectorIds": [],
        "id": null,
        "meetingId": this.props.match.params.meetingId,
        "meetingNoteType": "HTML",
        "note": this.editor.txt.html(),
        "ownerId": this.props.match.params.ownerId,
        "title": this.state.heading,
        "voiceFileName": "string"
      };
      fetch(api, {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(msg),
      })
      .then(res => res.json())
      .then(res => {
        if (res.error){
          console.log(res.error);
          this.warning("提交失败");
          return;
        }
        else {
          this.success("提交成功");
          this.setState({ redirect: true, redirect_url: "/note/" + meetingId + "/" + ownerId + "/profile"});
        }
      })
    }
  }

  render(){
    const {classes} = this.props;
    const { loaded, heading, redirect, redirect_url } = this.state;
    let {meetingId, ownerId} = this.props.match.params;
    if (redirect){
        return <Redirect to={redirect_url}/>;
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
                  {"会议标题："}<Link className={classes.link} to={"/meeting/"+this.state.meetingId}>什么都不队第三次会议</Link>
                </h3>
                <h4>
                  {"作者："}<Link to={"/user/"+ownerId+"/profile"} className={classes.link}>潘子奕</Link>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={11}>
                  <TextField
                    label="笔记标题"
                    name="heading"
                    fullWidth
                    onChange={this.handleChange}
                    className={classes.textField}
                    value={loaded ? heading : "null"}
                    margin="normal"
                    variant="outlined"
                  />
                </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                    <div id="div1" className={classes.editor}>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>确认修改</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button variant="contained" color="secondary" onClick={() => { this.setState({ redirect: true, redirect_url: "/note/" + meetingId + "/" + ownerId + "/profile"})}}>取消修改</Button>
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
export default withStyles(styles)(NoteEditPage);