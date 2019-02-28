import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

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
    };
  }

  updateEditorContent = content => {
    this.setState({content});
  }

  componentDidMount(){
    this.editor = new wangeditor('#div1');
    this.editor.customConfig.showLinkImg = true;
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.create();

    //let {meetingId, userId} = this.props.match.params;
    // 获取笔记
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
        this.editor.txt.html(res.meetingNote.note);
      }
    })
    
    
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.editor.txt.html());
  }

  render(){
    const {classes, userId} = this.props;
    const {loaded, heading, redirect, redirect_url } = this.state;
    let {meetingId, ownerId} = this.props.match.params;
    if (redirect){
        return <Redirect to={redirect_url}/>;
    }
    return (
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>
                  {"会议标题:"}<Link className={classes.link} to={"/meeting/"+this.state.meetingId}>{this.state.meetingHeading}</Link>
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
      
    )
  }
}
export default withStyles(styles)(NoteEditPage);