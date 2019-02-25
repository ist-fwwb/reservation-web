import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import meetingRoomImage from "assets/img/meetingroom.jpeg";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import Update from "@material-ui/icons/Update";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import Icon from "@material-ui/core/Icon";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import airConditionerIcon from "assets/icon/airConditioner.svg";
import airConditionerIcon0 from "assets/icon/airConditioner0.svg";
import blackBoardIcon from "assets/icon/blackboard.png";
import blackBoardIcon0 from "assets/icon/blackboard0.png";
import deskIcon from "assets/icon/desk.svg";
import deskIcon0 from "assets/icon/desk0.svg";
import projectorIcon from "assets/icon/projector.svg";
import projectorIcon0 from "assets/icon/projector0.svg";
import powerIcon from "assets/icon/power.svg";
import powerIcon0 from "assets/icon/power0.svg";
import wifiIcon from "assets/icon/wifi.png";
import wifiIcon0 from "assets/icon/wifi0.png";
import wireNetworkIcon from "assets/icon/wireNetwork.svg";
import wireNetworkIcon0 from "assets/icon/wireNetwork0.svg";
import tvIcon from "assets/icon/tv.svg";
import tvIcon0 from "assets/icon/tv0.svg";

import { roomController } from "variables/general.jsx";

import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";

import { ScheduleDataToRows, timeSliceController, meetingController, idToTime } from "variables/general.jsx";

function roomCategory(eng){
  if (eng === "SMALL")
    return "小";
  else if (eng === "BIG")
    return "大";
  return "中";
}

class RoomProfile extends React.Component {
  state = {
    br: false,
    notificationMessage: "null",
    notificationType: null,

    airConditioned: false,
    blackBoard: false,
    desk: false,
    projector: false,
    power: false,
    wifi: false,
    wireNetwork: false,
    tv: false,

    scheduleData: null,
    firstChosen: null,
    secondChosen: null
  }

  componentDidMount(){
    let roomId = this.props.match.params.roomId
    fetch(roomController.getRoomByRoomId(roomId), {
      credentials: 'include',
      method:'get'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({room: data});
    })
    .catch(error => {
      console.log(error);
      this.setState({error: true});
    })

    let timeApi = timeSliceController.getTimeSilceByRoomId(roomId);
    fetch(timeApi, {
      credentials: 'include',
      method: 'get',
    })
    .then(res => res.json())
    .then((data2) => {
      if (data2.error){
        let state = {
          notificationType: "danger",
          notificationMessage: data2.error
        };
        this.setState(state);
      }
      else{
        this.setState({scheduleData: data2})
      }
    })
  }

  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState({[place]: true});
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
    })
    this.showNotification("br");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let firstChosen = this.state.firstChosen;
    let secondChosen = this.state.secondChosen;
    if (!this.state.firstChosen){
      this.warning("请先选择时间");
      return;
    }
    let start;
    let end;
    let chosenDate = this.state.chosenDate;
    if (!secondChosen){
      start = firstChosen[0];
      end = start + 1;
    }
    else{
      start = firstChosen[0];
      end = secondChosen[0]+1;
    }
    let discription = this.props.match.params.discription;
    let meeting = {
      "attendantNum": null,
      "attendants": null,
      "date": chosenDate,
      "description": discription ? discription : "无",
      "endTime": end,
      "heading": "Meeting-" + chosenDate + "-" + start + "-" + end ,
      "hostId": this.props.userId,
      "location": null,
      "needSignIn": false,
      "roomId": this.props.match.params.roomId,
      "startTime": start,
      "type": "COMMON",
      "tags": [],
    }
    meeting = JSON.stringify(meeting);
    let api = meetingController.createMeeting();
    fetch(api, {
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: meeting
    })
    .then( res => res.json())
    .then((data) => {
      if (data.error){
        this.warning(data.error);
      }
      else {
        this.success("预约成功");
        window.location.href="/meeting/"+data.id+"/profile";
      }
    })
    .catch(error => {
      this.warning(error);
    })
  }

  handleChange = (state) => {
    this.setState(state);
    if (state.notificationType)
      this.showNotification("br");
  }

  render(){
    if (this.state.error){
      return <h2>404 Not Found</h2>
    }
    const { classes } = this.props;
    //const roomId = this.props.match.params.roomId
    const room = this.state.room;
    let airConditioned = false;
    let blackBoard = false;
    let desk = false;
    let projector = false;
    let power = false;
    let wifi = false;
    let wireNetwork = false;
    let tv = false;
    if (room){
      const devices = room.utils;
      airConditioned = devices.includes("AIRCONDITIONER");
      blackBoard = devices.includes("BLACKBOARD");
      desk = devices.includes("DESK");
      projector = devices.includes("PROJECTOR");
      power = devices.includes("POWER");
      wifi = devices.includes("WIFI");
      wireNetwork = devices.includes("WIRENETWORK");
      tv = devices.includes("TV");
    }

    let { roomId, date, startTime, endTime } = this.props.match.params;
    let recommendMessage = {
      date: date,
      startTime: startTime,
      endTime: endTime,
    }
    
    let { firstChosen, secondChosen } = this.state;
    let timeChosen = "";
    if (firstChosen && secondChosen){
      let start;
      let end;
      if (firstChosen[0] > secondChosen[0]){
        start = secondChosen[0];
        end = firstChosen[0];
      }
      else{
        end = secondChosen[0];
        start = firstChosen[0];
      }
      timeChosen = this.state.chosenDate + " " + idToTime(start) + " ~ " + idToTime(end+1);
    }
    else if (firstChosen && !secondChosen){
      timeChosen = this.state.chosenDate + " " + idToTime(firstChosen[0]) + " ~ " + idToTime(firstChosen[0]+1);
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                {
                  room ? 
                    <div>
                      <h2>{room.location}</h2>
                    </div>
                    : <h3>{roomId}</h3>
                }
              
              <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>devices</Icon>
                      </CardIcon>
                      <br/>
                      <h2 className={classes.cardCategory} style={{color: "black"}}>设备情况</h2>
                    </CardHeader>
                    <CardBody>
                      <table>
                        <tbody>
                        <tr>
                          <td>
                          {
                            airConditioned?<img width={"60%"} src={airConditionerIcon} alt="icon"/>:<img width={"60%"} src={airConditionerIcon0} alt="icon"/>
                          }
                          </td>
                          <td>
                          {
                            blackBoard?<img width={"60%"} src={blackBoardIcon} alt="icon"/>:<img width={"60%"} src={blackBoardIcon0} alt="icon"/>
                          }
                          </td>
                          <td>
                          {
                            desk?<img width={"60%"} src={deskIcon} alt="icon"/>:<img width={"60%"} src={deskIcon0} alt="icon"/>
                          }
                          </td>
                          <td>
                          {
                            projector?<img width={"60%"} src={projectorIcon} alt="icon"/>:<img width={"60%"} src={projectorIcon0} alt="icon"/>
                          }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            空调
                          </td>
                          <td>
                            黑板
                          </td>
                          <td>
                            桌子
                          </td>
                          <td>
                            投影仪
                          </td>
                        </tr>
                        <tr>
                          <td>
                          {
                            power?<img width={"60%"} src={powerIcon} alt="icon"/>:<img width={"60%"} src={powerIcon0} alt="icon"/>
                          }
                          </td>
                          <td>
                          {
                            wifi?<img width={"60%"} src={wifiIcon} alt="icon"/>:<img width={"60%"} src={wifiIcon0} alt="icon"/>
                          }
                          </td>
                          <td>
                          {
                            wireNetwork?<img width={"60%"} src={wireNetworkIcon} alt="icon"/>:<img width={"60%"} src={wireNetworkIcon0} alt="icon"/>
                          }
                          </td>
                          <td>
                          {
                            tv?<img width={"60%"} src={tvIcon} alt="icon"/>:<img width={"60%"} src={tvIcon0} alt="icon"/>
                          }
                          </td>
                        </tr>
                        <tr>
                          <td>
                            电源
                          </td>
                          <td>
                            WiFi
                          </td>
                          <td>
                            网线
                          </td>
                          <td>
                            电视
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </CardBody>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Update />
                        Just Updated
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info">
                        <Icon>content_copy</Icon>
                      </CardIcon>
                      <br/>
                      <h2 className={classes.cardCategory} style={{color: "black"}}>容量</h2>
                    </CardHeader>
                    <CardBody>
                      <h3>{room?roomCategory(room.size):"NULL"}</h3>
                    </CardBody>
                    <CardFooter stats>
                        <div className={classes.stats}>
                          <Update />
                          Just Updated
                        </div>
                    </CardFooter>
                  </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                  <br/>
                  <img src={meetingRoomImage} width={"110%"} alt="meetingroom"/>
                </GridItem>
                <Divider variant="middle"/>
                <GridItem xs={12} sm={12} md={12}>
                  <Card>
                    <CardHeader>
                      <table>
                        <tbody>
                          <tr>
                            <td width={220}>
                              <TextField
                                fullWidth
                                disabled
                                label="预约时间"
                                value={timeChosen}
                                margin="normal"
                                variant="outlined"
                              />
                            </td>
                            <td>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                            </td>
                            <td>
                              <Fab variant="extended" color="primary" onClick={this.handleSubmit}>
                                <Done/>
                                &nbsp;&nbsp;确定预约
                              </Fab>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </CardHeader>
                    <CardBody>
                      <Paper>
                        {
                          ! this.state.scheduleData ? null :
                          <RoomSchedule 
                            data={ScheduleDataToRows(this.state.scheduleData)} 
                            roomId={roomId} 
                            handleChange={this.handleChange}
                            recommendMessage={recommendMessage ? recommendMessage : null}
                          />

                        }
                      </Paper>
                    </CardBody>
                  </Card>
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
export default withStyles(dashboardStyle)(RoomProfile);