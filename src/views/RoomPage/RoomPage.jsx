import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

import Update from "@material-ui/icons/Update";
import { Link } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

let rooms = [{location: '410',capacity: 10, status: 0},
{location: '411',capacity: 15, status: 1},
{location: '412',capacity: 5, status: 2},
{location: '501',capacity: 5, status: 0}]

function roomCategory(capacity){
  if (capacity <= 5)
    return "小会议室";
  else if (capacity > 10)
    return "大会议室";
  return "中会议室";
}

function roomStatus(status){
  if (status === 0)
    return "空闲";
  else if (status === 1)
    return "已预定";
  else if (status === 2)
    return "开会中";
}

function roomCardColor(status){
  if (status === 0)
    return "success";
  else if (status === 1)
    return "warning";
  else if (status === 2)
    return "danger";
}

function roomCardIcon(status){
  if (status === 0)
    return "sentiment_very_satisfied";
  else if (status === 1)
    return "sentiment_dissatisfied";
  else if (status === 2)
    return "sentiment_very_dissatisfied";
}

class Dashboard extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          {
            rooms.map((room, key) => {
              return (
                <GridItem xs={12} sm={6} md={4}>
                  <Card>
                    <CardHeader color={roomCardColor(room.status)} stats icon>
                      <CardIcon color={roomCardColor(room.status)}>
                        <Icon>{roomCardIcon(room.status)}</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>{roomStatus(room.status)}</p>
                      <h3 className={classes.cardTitle}>
                      <Link to={"/room/"+room.location+"/schedule"}>{roomCategory(room.capacity) + " " + room.location}</Link> <br/> <small>{"容量:"+room.capacity}</small>
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                        <Update />
                        Just Updated
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              )
            })
          }
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
