import React from "react";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

import Update from "@material-ui/icons/Update";
//import SentimentVeryDissatisfied from "@material-ui/icons/SentimentVeryDissatisfied";
//import SentimentDissatisfied from "@material-ui/icons/SentimentDissatisfied";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import Info from "@material-ui/icons/Info";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import { Link } from "react-router-dom";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import SearchBar from "components/SearchBar/SearchBar.jsx";

import { roomController } from "variables/general.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

function roomCategory(eng){
  if (eng === "SMALL")
    return "小会议室";
  else if (eng === "BIG")
    return "大会议室";
  return "中会议室";
}

/*
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
    return <SentimentVerySatisfied/>;
  else if (status === 1)
    return <SentimentDissatisfied/>;
  else if (status === 2)
    return <SentimentVeryDissatisfied/>;
}*/

class RoomPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      br: false,
      notificationMessage: "null",
      notificationType: null,

      rooms: null
    }
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
    })
    this.showNotification("br");
  }

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  componentDidMount(){
    fetch(roomController.getRoom()+"/",{
        credentials: 'include',
        method:'get'
      })
      .then(res => res.json())
      .then((data) => {
        if (data.error)
          this.warning(data.error);
        else
          this.setState({rooms: data})
      });
  }

  handleSearchChange = (data) => {
    this.setState({rooms: data});
    this.success("搜索成功");
  }

  render() {
    const { classes } = this.props;
    const rooms = this.state.rooms;
    if (!rooms)
      return null;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <SearchBar handleSearchChange={this.handleSearchChange} handleError={this.warning}/>
          </GridItem>
          {
            rooms.map((room) => {
              return (
                <GridItem xs={12} sm={6} md={4} key={room.id}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        {<SentimentVerySatisfied/>}
                      </CardIcon>
                      <h3 className={classes.cardTitle}>
                      {room.location}
                      <br/> 
                      <small>{roomCategory(room.size)}</small>
                      <br/>
                      </h3>
                    </CardHeader>
                    <CardBody>
                      <table>
                        <tbody>
                          <tr>
                            <td><Info/>&nbsp;&nbsp;<Link aligh="right" to={"/room/"+room.id+"/profile"}>基本信息</Link></td>
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
              )
            })
          }
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
    );
  }
}

RoomPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(RoomPage);
