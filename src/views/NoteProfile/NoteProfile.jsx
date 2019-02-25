import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import { Link } from "react-router-dom";

const styles = {
  
};

class NoteProfile extends React.Component {
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

    //let {meetingId, userId} = this.props.match.params;
    
    // 获取笔记
    this.setState({
      loaded: true,
      meetingHeading:"会议名称",
      heading:"笔记标题",
      name: "皮皮盘",
      author: true,
      content: "<p><span style=\"font-weight: bold;\">咋回事</span></p>"
    })
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    const {classes} = this.props;
    //const {loaded, heading, author } = this.state;
    let {meetingId, userId} = this.props.match.params;
    return (
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>
                  {"会议名称:"}<Link to={"/meeting/"+this.state.meetingId}>{this.state.meetingHeading}</Link>
                </h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                <GridItem xs={12} sm={12} md={11}>
                  <h3>{this.state.heading}</h3>
                </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                    <div dangerouslySetInnerHTML={{ __html: this.state.content }}>
                    </div>
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button variant="contained" color="primary" onClick={() => { window.location.href="/note/"+meetingId+"/"+userId+"/edit"; }}>编辑笔记</Button>
          </GridItem>
        </GridContainer>
      
    )
  }
}
export default withStyles(styles)(NoteProfile);