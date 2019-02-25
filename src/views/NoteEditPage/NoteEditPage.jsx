import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import { Link } from "react-router-dom";
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
    this.state = {
      loaded: false,
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
    let content = "<p><span style=\"font-weight: bold;\">咋回事</span></p>";
    this.setState({
      loaded: true,
      meetingHeading:"会议标题",
      heading:"笔记标题",
      author: true,
      content,
    })
    this.editor.txt.html(content);
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
    const {classes} = this.props;
    const {loaded, heading, author } = this.state;
    let {meetingId, userId} = this.props.match.params;
    if (author === false){
        window.location.href = "/note/" + meetingId + "/" + userId + "/profile";
        return null;
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
        </GridContainer>
      
    )
  }
}
export default withStyles(styles)(NoteEditPage);