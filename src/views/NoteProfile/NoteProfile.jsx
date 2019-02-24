import React from "react";
import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import wangeditor from 'wangeditor';

const styles = {
  editor: {
    width: '100%'
  },
};

class NoteProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
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

    let noteId = this.props.match.params.noteId;
    // 获取笔记
    this.setState({
      loaded: true,
      meetingHeading:"会议标题",
      heading:"笔记标题"
    })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    const {classes} = this.props;
    const {loaded, heading} = this.state;
    return (
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>{"会议标题:"+this.state.meetingHeading}</h4>
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
                        <p>{this.state.content}</p>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button variant="contained" color="primary" onClick={this.handleSmartReserve}>确认修改</Button>
          </GridItem>
        </GridContainer>
      
    )
  }
}
export default withStyles(styles)(NoteProfile);