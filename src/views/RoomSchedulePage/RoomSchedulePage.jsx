import React from "react";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";
import { ScheduleDataToRows, timeSliceController, meetingController, idToTime } from "variables/general.jsx";

const timeChosenMessage = "请先选择时间";
const reservationSuccessMessage = "预约成功";

class RoomSchedulePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scheduleData: null,

      br: false,
      notificationMessage: "null",
      notificationType: null,

      firstChosen: null,
      secondChosen: null
    };
  }

  componentDidMount() {
    let timeApi = timeSliceController.getTimeSilceByRoomId(this.props.match.params.roomId);
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

  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
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

  handleSubmit = (e) => {
    e.preventDefault();
    let firstChosen = this.state.firstChosen;
    let secondChosen = this.state.secondChosen;
    if (!(this.state.firstChosen && this.state.secondChosen)){
      this.warning(timeChosenMessage);
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
    
    let meeting = {
      "attendantNum": null,
      "attendants": null,
      "date": chosenDate,
      "description": "无",
      "endTime": end,
      "heading": "Meeting-" + chosenDate + "-" + start + "-" + end ,
      "hostId": this.props.userId,
      "location": null,
      "needSignIn": false,
      "roomId": this.props.match.params.roomId,
      "startTime": start,
      "type": "COMMON"
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
        this.success(reservationSuccessMessage);
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
    let { roomId, roomLocation} = this.props.match.params;
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
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h2>{roomLocation}</h2>
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
                    />

                  }
                  <Snackbar
                    place="br"
                    color={this.state.notificationType}
                    icon={this.typeToIcon(this.state.notificationType)}
                    message={this.state.notificationMessage}
                    open={this.state.br}
                    closeNotification={() => this.setState({ br: false })}
                    close
                  />
                </Paper>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default RoomSchedulePage;