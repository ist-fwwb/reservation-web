import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import TextField from "@material-ui/core/TextField";

import { notificationController } from "variables/general.jsx";
import { Link } from "react-router-dom";

const styles = theme => ({
  link: {
    color: '#FFF',
  },
  content: {
    borderStyle: "none none none solid",
    borderWidth: "2px",
    padding: "10px",
  }
});

class NotificationProfile extends React.Component {
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

    let { notificationId } = this.props.match.params;
    let api = notificationController.getNotificationByNotificationId(notificationId);
    fetch(api, {
      method:'get',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if (res.error){
        console.log(res.error);
        return;
      }
      else{
        this.setState({
          loaded: true,
          ...res
        })
        if (res.messageStatus === "NEW"){
          let api2 = notificationController.readNotifiaction(notificationId);
          fetch(api2, {
            method: 'put',
            credentials: 'include'
          });
        }
      }
      
    })
    /*
    this.setState({
        loaded: true,
        id: "1111",
        title: "系统消息",
        sender: "系统",
        read: false,
        time: "2019-02-10",
        content: "<span style=\"font-weight: bold;\">咋回事&nbsp;</span><pre><code>fmt.Print(\"Hello world\")</code></pre><p><br></p>"
      })
      */
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  render(){
    const {classes} = this.props;
    const { loaded, title, time, content } = this.state;
    let { meetingId, userId } = this.props.match.params;
    return (
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>
                  {"消息内容"}
                </h4>
              </CardHeader>
              <CardBody>
                <table></table>
                <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <TextField
                    label="标题"
                    disabled={true}
                    fullWidth
                    value={loaded? title:"NULL"}
                    margin="normal"
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={5}>
                  <TextField
                    label="日期"
                    disabled={true}
                    fullWidth
                    value={loaded? time:"NULL"}
                    margin="normal"
                  />
                </GridItem>
                  <GridItem xs={12} sm={12} md={11}>
                    <TextField
                      label="内容"
                      multiline
                      rows="10"
                      disabled={true}
                      fullWidth
                      value={loaded? content:"NULL"}
                      margin="normal"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <Button variant="contained" color="primary" onClick={() => { window.location.href = "/notification"; }}>返回</Button>
            &nbsp;
            <Button variant="contained" color="secondary" onClick={() => {}}>删除</Button>
          </GridItem>
        </GridContainer>
      
    )
  }
}
export default withStyles(styles)(NotificationProfile);