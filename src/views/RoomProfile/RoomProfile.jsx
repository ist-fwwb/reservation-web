import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import meetingRoomImage from "assets/img/meetingroom.jpeg";

import Update from "@material-ui/icons/Update";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import airConditionerIcon from "assets/icon/airConditioner.svg";
import airConditionerIcon0 from "assets/icon/airConditioner0.svg";
import blackBoardIcon from "assets/icon/blackBoard.svg";
import blackBoardIcon0 from "assets/icon/blackBoard0.svg";
import deskIcon from "assets/icon/desk.svg";
import deskIcon0 from "assets/icon/desk0.svg";
import projectorIcon from "assets/icon/projector.svg";
import projectorIcon0 from "assets/icon/projector0.svg";
import powerIcon from "assets/icon/power.svg";
import powerIcon0 from "assets/icon/power0.svg";
import wifiIcon from "assets/icon/wifi.svg";
import wifiIcon0 from "assets/icon/wifi0.svg";
import wireNetworkIcon from "assets/icon/wireNetwork.svg";
import wireNetworkIcon0 from "assets/icon/wireNetwork0.svg";
import tvIcon from "assets/icon/tv.svg";
import tvIcon0 from "assets/icon/tv0.svg";
import { roomController } from "variables/general.jsx";

function roomCategory(eng){
  if (eng === "SMALL")
    return "小会议室";
  else if (eng === "BIG")
    return "大会议室";
  return "中会议室";
}

class RoomProfile extends React.Component {
  state = {
    airConditioned: true,
    blackBoard: true,
    desk: false,
    projector: true,
    power: true,
    wifi: false,
    wireNetwork: false,
    tv: true,
  }

  componentDidMount(){
    let roomId = this.props.match.params.roomId
    fetch(roomController.getRoomByRoomId(roomId), {
      credentials: 'include',
      method:'get'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({room: data})
    })
  }

  render(){
    const { classes } = this.props;
    //const roomId = this.props.match.params.roomId
    const room = this.state.room;
    if (!room)
      return null;

    const devices = this.state.room.utils;
    const airConditioned = devices.includes("AIRCONDITIONER");
    const blackBoard = devices.includes("BLACKBOARD");
    const desk = devices.includes("DESK");
    const projector = devices.includes("PROJECTOR");
    const power = devices.includes("POWER");
    const wifi = devices.includes("WIFI");
    const wireNetwork = devices.includes("WIRENETWORK");
    const tv = devices.includes("TV");
    
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
              <h3>{room.location }</h3>
              <small>{roomCategory(room.size)}</small>
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
                      <h3>10 人</h3>
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
              </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
export default withStyles(dashboardStyle)(RoomProfile);