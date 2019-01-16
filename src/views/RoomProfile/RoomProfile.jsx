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
import Checkbox from '@material-ui/core/Checkbox';
import Icon from "@material-ui/core/Icon";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import airConditioner from "assets/icon/airConditioner.svg";
import airConditioner0 from "assets/icon/airConditioner0.svg";
import blackBoard from "assets/icon/blackBoard.svg";
import blackBoard0 from "assets/icon/blackBoard0.svg";
import desk from "assets/icon/desk.svg";
import desk0 from "assets/icon/desk0.svg";
import projector from "assets/icon/projector.svg";
import projector0 from "assets/icon/projector0.svg";
import power from "assets/icon/power.svg";
import power0 from "assets/icon/power0.svg";
import wifi from "assets/icon/wifi.svg";
import wifi0 from "assets/icon/wifi0.svg";
import wireNetwork from "assets/icon/wireNetwork.svg";
import wireNetwork0 from "assets/icon/wireNetwork0.svg";
import tv from "assets/icon/tv.svg";
import tv0 from "assets/icon/tv0.svg";

class RoomProfile extends React.Component {
  state = {
    airConditioned: true,
    blackBoard: true,
    desk: false,
    projector: true,
  }

  render(){
    const { classes } = this.props;
    const roomid = this.props.match.params.roomid
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
              <h3>{"会议室 " + roomid }</h3>
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
                        <tr>
                          <td>
                          {
                            this.state.airConditioned?<img width={"60%"} src={airConditioner}/>:<img width={"60%"} src={airConditioner0}/>
                          }
                          </td>
                          <td>
                          {
                            this.state.blackBoard?<img width={"60%"} src={blackBoard}/>:<img width={"60%"} src={blackBoard0}/>
                          }
                          </td>
                          <td>
                          {
                            this.state.desk?<img width={"60%"} src={desk}/>:<img width={"60%"} src={desk0}/>
                          }
                          </td>
                          <td>
                          {
                            this.state.projector?<img width={"60%"} src={projector}/>:<img width={"60%"} src={projector0}/>
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
                  <img src={meetingRoomImage} width={"100%"}/>
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