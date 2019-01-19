import React from "react";
import PropTypes from 'prop-types';
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';

import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';

import { Link } from "react-router-dom";
import { timeSliceController, meetingController, idToTime } from "variables/general.jsx";

const occupiedMessage = "会议室被占用";
const timeChosenMessage = "请先选择时间";
const reservationSuccessMessage = "预约成功";

const colorList = [purple[200], pink[200], orange[300], cyan[200], teal[300]]
let colorMap = {};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function dataToRows(data){
  let re = [];
  if (data.length)
  for (let i in data){
    let ele = data[i];
    let day = (new Date(ele.date).getDay());
    if (day === 6 || day === 0)
      continue;
    let timeSlice = ele.timeSlice;
    for (let j in timeSlice){
      if (!re[j])
        re[j] = [0,0,0,0,0];
      if (!re[j][day-1])
        re[j][day-1] = {};
      if (timeSlice[j]===null){
        re[j][day-1]["occupied"] = false;
        re[j][day-1]["meetingid"] = null;
      }
      else {
        re[j][day-1]["occupied"] = true;
        re[j][day-1]["meetingid"] = timeSlice[j];
      }
      re[j][day-1]["date"] = ele.date;
      re[j][day-1]["click"] = false;
      re[j][day-1]["between"] = false;
    }
  }
  return re;
}

class RoomSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      br: false,
      notificationMessage: "null",
      notificationType: null,

      scheduleData: null,

      date: null,
      firstChosen: null,
      secondChosen: null,
    };
  }

  componentWillUnmount() {
    let id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  
  componentDidMount() {
    fetch(timeSliceController.getTimeSilceByRoomId(this.props.roomId), {
      credentials: 'include',
      method: 'get',
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error)
        this.warning(data.error);
      else
        this.setState({scheduleData: dataToRows(data)})
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

  clearBetween = (firstChosen, secondChosen, scheduleData) => {
    scheduleData[firstChosen[0]][firstChosen[1]]["click"] = false;
    scheduleData[secondChosen[0]][secondChosen[1]]["click"] = false;
    let start;
    let end;
    if (firstChosen[0] > secondChosen[0]) {
      start = secondChosen[0];
      end = firstChosen[0];
    }
    else{
      start = firstChosen[0];
      end = secondChosen[0];
    }
    let tempDay = secondChosen[1];
    for (let i = start + 1; i < end; i ++){
      scheduleData[i][tempDay]["between"] = false;
    }
    return scheduleData;
  }

  // x stands for the 8:00/8:30/...
  // y stand for Monday/Tuesday/...

  handleClick = (e, date, x, y) => {
    e.preventDefault();
    let firstChosen = this.state.firstChosen;
    let secondChosen = this.state.secondChosen;
    let scheduleData = this.state.scheduleData;
    let currentCell = scheduleData[x][y];
    // The user click for the third time, after he has chosen the start and the end
    if (firstChosen && secondChosen){
      // state 2 -> state 0
      if (currentCell["click"] || currentCell["between"]){
        scheduleData = this.clearBetween(firstChosen, secondChosen, scheduleData);
        this.setState({
          scheduleData: scheduleData,
          firstChosen: null,
          secondChosen: null,
          date: null
        })
        return;
      }
      else {
        if (scheduleData[x][y]["occupied"]){
          this.warning(occupiedMessage);
          return;
        }
        // state 2 -> state 1
        scheduleData[x][y]["click"] = true;
        
        scheduleData = this.clearBetween(firstChosen, secondChosen, scheduleData);
        this.setState({
          scheduleData: scheduleData,
          firstChosen: [x,y],
          date: date,
          secondChosen: null,
        })
        return;
      }
    }
    // The user click for the first time
    // The following situaiton is impossible:
    //    firstChosen is null but secondChosen isn't

    else if (!firstChosen){
      if (scheduleData[x][y]["occupied"]){
        this.warning(occupiedMessage);
        return;
      }
      // state 0 -> state 1
      scheduleData[x][y]["click"] = true;
      this.setState({
        scheduleData: scheduleData,
        date: date,
        firstChosen: [x,y]
      })
      return;
    }
    // The user click for the second time
    else if (firstChosen === [x,y]){ 
      // state 1 -> state 0
      scheduleData[x][y]["click"] = false;
      this.setState({
        scheduleData: scheduleData,
        firstChosen: null,
      })
      return;
    }
    else if (firstChosen[1] === y){
      // state 1 -> state 2
      if (scheduleData[x][y]["occupied"]){
        this.warning(occupiedMessage);
        return;
      }
      // check whether there're timeslice been occupied between them
      let start;
      let end;
      if (firstChosen[0] > x) {
        start = x;
        end = firstChosen[0];
      }
      else{
        start = firstChosen[0];
        end = x;
      }
      for (let i = start + 1; i <= end; i ++){
        if (scheduleData[i][y]["occupied"]){
          this.warning(occupiedMessage);
          return;
        }
      }
      scheduleData[x][y]["click"] = true;
      for (let i = start + 1; i < end; i ++){
        scheduleData[i][y]["between"] = true;
      }
      this.setState({
        scheduleData: scheduleData,
        secondChosen: [x,y],
        notificationType: "success",
        notificationMessage: date + " " + idToTime(start) + " ~ " + idToTime(end+1)
      })
      this.showNotification("br");
      return;
    }
    else{
      if (scheduleData[x][y]["occupied"]){
        this.warning(occupiedMessage);
        return;
      }
      // state 1 -> state 1
      scheduleData[firstChosen[0]][firstChosen[1]]["click"] = false;
      scheduleData[x][y]["click"] = true;

      this.setState({
        scheduleData: scheduleData,
        date: date,
        firstChosen: [x,y],
      })
      return;
    }
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
    let date = this.state.date;
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
      "date": date,
      "description": "无",
      "endTime": end,
      "heading": "Meeting-" + date + "-" + start + "-" + end ,
      "hostId": this.props.userId,
      "location": null,
      "needSignIn": false,
      "roomId": this.props.roomId,
      "startTime": start,
      "type": "COMMON"
    }
    meeting = JSON.stringify(meeting);
    fetch(meetingController.createMeeting(), {
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
        //window.location.href = "/meeting";
      }
    })
  }

  render(){
    let scheduleData = this.state.scheduleData;
    let { roomLocation } = this.props;
    let colorCount = 0;
    let timeChosen = "";
    let firstChosen = this.state.firstChosen;
    let secondChosen = this.state.secondChosen;
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
      timeChosen = this.state.date + " " + idToTime(start) + " ~ " + idToTime(end+1);
    }
    else if (firstChosen && !secondChosen){
      timeChosen = this.state.date + " " + idToTime(firstChosen[0]) + " ~ " + idToTime(firstChosen[0]+1);
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
                  <Table>
                    <TableHead>
                      {
                        ! scheduleData ? 
                        <TableRow>
                          <CustomTableCell>时间</CustomTableCell>
                          <CustomTableCell align="left">星期一</CustomTableCell>
                          <CustomTableCell align="left">星期二</CustomTableCell>
                          <CustomTableCell align="left">星期三</CustomTableCell>
                          <CustomTableCell align="left">星期四</CustomTableCell>
                          <CustomTableCell align="left">星期五</CustomTableCell>
                        </TableRow>
                        :
                        <TableRow>
                          <CustomTableCell>时间</CustomTableCell>
                          <CustomTableCell align="left">{scheduleData[0][0]["date"]}<br/>星期一</CustomTableCell>
                          <CustomTableCell align="left">{scheduleData[0][1]["date"]}<br/>星期二</CustomTableCell>
                          <CustomTableCell align="left">{scheduleData[0][2]["date"]}<br/>星期三</CustomTableCell>
                          <CustomTableCell align="left">{scheduleData[0][3]["date"]}<br/>星期四</CustomTableCell>
                          <CustomTableCell align="left">{scheduleData[0][4]["date"]}<br/>星期五</CustomTableCell>
                        </TableRow>
                      }                        
                    </TableHead>
                    <TableBody>
                      {! scheduleData ? null : scheduleData.map((row, x) => {
                        // only display 8:00 ~ 18:00
                        if (x < 16 || x >= 36){
                          return null;
                        }

                        return(
                          <TableRow key={x}>
                            <CustomTableCell component="th" scope="row">
                              {idToTime(x)+"~"+idToTime(x+1)}
                            </CustomTableCell>
                            {
                              row.map((cell, y) => {
                                let bgcolor = null;
                                if (cell["occupied"]){
                                  let currentid = cell.meetingid;
                                  if (!colorMap[currentid]){
                                    colorMap[currentid] = colorList[colorCount];
                                    colorCount += 1;
                                    colorCount %= colorList.length;
                                  }
                                  bgcolor = colorMap[currentid];
                                }
                                else {
                                  if (cell["click"] || cell["between"]){
                                    bgcolor = green[400];
                                  }
                                }
                                return (
                                  <CustomTableCell style={{padding:0}} key={y} align="left" onClick={(e) => {this.handleClick(e, cell["date"], x, y)}}>
                                  {
                                    cell["occupied"]?
                                      <div style={{background:bgcolor ,borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                                        <Link to={"/meeting/"+cell["meetingid"]+"/profile"}>
                                                  {cell["meetingid"].substring(0,5)+"..\n"}
                                        </Link>
                                      </div>
                                      :
                                      <div style={{background:bgcolor ,borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                                      </div>
                                  }
                                  </CustomTableCell>
                                )
                              })
                            }
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
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

RoomSchedule.propTypes = {
  roomId: PropTypes.string.isRequired,
  roomLocation: PropTypes.string.isRequired,
};

export default RoomSchedule;