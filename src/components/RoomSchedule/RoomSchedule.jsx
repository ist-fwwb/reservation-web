import React from "react";
import PropTypes from 'prop-types';
// core components

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import purple from '@material-ui/core/colors/purple';
import cyan from '@material-ui/core/colors/cyan';
import brown from '@material-ui/core/colors/brown';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';

import { Link } from "react-router-dom";
import { idToTime, today } from "variables/general.jsx";

const occupiedMessage = "会议室被占用";

const maxLenghtToShow = 10;

const colorList = [purple[200], pink[200], orange[300], brown[400], teal[300]]
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

class RoomSchedule extends React.Component{
  constructor(props) {
    super(props);
    let preChosen = Boolean(this.props.recommendMessage);
    let tempState = preChosen ? this.preChosenState() : {};
    this.state = {
      scheduleData: tempState.scheduleData ? tempState.scheduleData : this.props.data,

      chosenDate: tempState.chosenDate ? tempState.chosenDate : null,
      firstChosen: tempState.firstChosen ? tempState.firstChosen : null,
      secondChosen: tempState.secondChosen ? tempState.secondChosen : null,

    };
  }

  preChosenState = () => {
    let date = this.props.recommendMessage.date;
    let tempDay = -1;
    let scheduleData = this.props.data;
    for (let i = 0; i < 5; i++){
      if (scheduleData[0][i]["date"] === date){
        tempDay = i;
        break;
      }
    }
    if (tempDay === -1)
      return -1;
    let startTime = Number(this.props.recommendMessage.startTime);
    let endTime = Number(this.props.recommendMessage.endTime);
    let success = true;

    for (let i = startTime; i <= endTime; i ++){
      if (scheduleData[i][tempDay]["occupied"] === true){
        success = false;
        break;
      }
    }
    let state = {}
    if (success){
      scheduleData[startTime][tempDay]["click"] = true;
      scheduleData[endTime][tempDay]["click"] = true;
      for (let i = startTime + 1; i < endTime; i ++){
        scheduleData[i][tempDay]["between"] = true;
      }
      state.firstChosen = [startTime, tempDay];
      state.secondChosen = [endTime, tempDay];
      state.chosenDate = date;
      this.props.handleChange(state);
    }
    state.scheduleData = scheduleData;
    return state;
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
    this.handleChosen(date, x, y);
  }
  handleChosen = (date, x, y) => {
    let firstChosen = this.state.firstChosen;
    let secondChosen = this.state.secondChosen;
    let scheduleData = this.state.scheduleData;
    let currentCell = scheduleData[x][y];
    // The user click for the third time, after he has chosen the start and the end
    if (firstChosen && secondChosen){
      // state 2 -> state 0 
      // 点击两次后，再点一次，重新选择
      if ( scheduleData[x][y].expired){
        let state = {
          notificationType: "danger",
          notificationMessage: "时间已过"
        }
        this.props.handleChange(state);
        return;
      }
      else if (currentCell["click"] || currentCell["between"]){
        scheduleData = this.clearBetween(firstChosen, secondChosen, scheduleData);
        let state = {
          firstChosen: null,
          secondChosen: null,
          chosenDate: null
        };
        this.props.handleChange(state);
        state.scheduleData = scheduleData;
        this.setState(state);
        return;
      }
      else {
        if (scheduleData[x][y]["occupied"]){
          let state = {
            notificationType: "danger",
            notificationMessage: occupiedMessage
          };
          this.props.handleChange(state);
          return;
        }
        // state 2 -> state 1
        scheduleData[x][y]["click"] = true;
        
        scheduleData = this.clearBetween(firstChosen, secondChosen, scheduleData);
        let state = {
          firstChosen: [x,y],
          chosenDate: date,
          secondChosen: null,
        };
        this.props.handleChange(state);
        state.scheduleData = scheduleData;
        this.setState(state);
        return;
      }
    }
    // The user click for the first time
    // The following situaiton is impossible:
    //  firstChosen is null but secondChosen isn't

    else if (!firstChosen){
      if ( scheduleData[x][y].expired){
        let state = {
          notificationType: "danger",
          notificationMessage: "时间已过"
        }
        this.props.handleChange(state);
        return;
      }
      else if (scheduleData[x][y]["occupied"]){
        let state = {
          notificationType: "danger",
          notificationMessage: occupiedMessage
        };
        this.props.handleChange(state);
        return;
      }
      else if (scheduleData[x][y].date === today ){

      }
      // state 0 -> state 1
      scheduleData[x][y]["click"] = true;
      let state = {
        chosenDate: date,
        firstChosen: [x,y]
      };
      this.props.handleChange(state);
      state.scheduleData = scheduleData;
      this.setState(state);
      return;
    }
    // The user click for the second time
    else if (firstChosen === [x,y]){ 
      // state 1 -> state 0
      scheduleData[x][y]["click"] = false;
      let state = {
        firstChosen: null,
      };
      this.props.handleChange(state);
      state.scheduleData = scheduleData;
      this.setState(state);
      return;
    }
    else if (firstChosen[1] === y){
      if ( scheduleData[x][y].expired){
        let state = {
          notificationType: "danger",
          notificationMessage: "时间已过"
        }
        this.props.handleChange(state);
        return;
      }
      // state 1 -> state 2
      else if (scheduleData[x][y]["occupied"]){
        let state = {
          notificationType: "danger",
          notificationMessage: occupiedMessage
        };
        this.props.handleChange(state);
        return;
      }
      // check whether there's timeslice been occupied between them
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
      // there is timeslice between them
      for (let i = start + 1; i <= end; i ++){
        if (scheduleData[i][y]["occupied"]){
          let firstChosen = this.state.firstChosen;
          scheduleData[firstChosen[0]][firstChosen[1]]["click"] = false;
          scheduleData[x][y]["click"] = true;
          let state = {
            firstChosen: [x,y],
          };
          this.props.handleChange(state);
          state.scheduleData = scheduleData;
          this.setState(state);
          return;
        }
      }
      // state 1
      scheduleData[x][y]["click"] = true;
      for (let i = start + 1; i < end; i ++){
        scheduleData[i][y]["between"] = true;
      }
      let state = {
        secondChosen: [x,y],
        notificationType: "success",
        notificationMessage: date + " " + idToTime(start) + " ~ " + idToTime(end+1)
      }
      this.props.handleChange(state);
      state.scheduleData = scheduleData;
      this.setState(state);
      return;
    }
    else{
      if ( scheduleData[x][y].expired){
        let state = {
          notificationType: "danger",
          notificationMessage: "时间已过"
        }
        this.props.handleChange(state);
        return;
      }

      if (scheduleData[x][y]["occupied"]){
        let state = {
          notificationType: "danger",
          notificationMessage: occupiedMessage
        };
        this.props.handleChange(state);
        return;
      }
      // state 1 -> state 1
      scheduleData[firstChosen[0]][firstChosen[1]]["click"] = false;
      scheduleData[x][y]["click"] = true;

      let state = {
        chosenDate: date,
        firstChosen: [x,y],
      };
      this.props.handleChange(state);
      state.scheduleData = scheduleData;
      this.setState(state);
      return;
    }
  }

  clearOriginalBetween = (date, startTime, endTime) => {
    let scheduleData = this.state.scheduleData;
    let tempDay = -1;
    for (let i = 0; i < 5; i++){
      if (scheduleData[0][i]["date"] === date){
        tempDay = i;
        break;
      }
    }
    if (tempDay === -1)
      return -1;
    for (let i = startTime; i < endTime; i ++){
      scheduleData[i][tempDay]["original"] = false;
    }
    return scheduleData;
  }

  markOriginalData = (scheduleData, originalDate, originalStartTime, originalEndTime) => {
    let tempDay = -1;
    for (let i = 0; i < 5; i++){
      console.log("originalDate: "+ originalDate)
      console.log("tempDate: "+ scheduleData[0][i]["date"])
      if (scheduleData[0][i]["date"] === originalDate){
        tempDay = i;
        break;
      }
    }
    if (tempDay === -1)
      return scheduleData;
    for (let i = originalStartTime; i < originalEndTime; i++){
      scheduleData[i][tempDay]["original"] = true;
      scheduleData[i][tempDay]["occupied"] = false;
    }
    return scheduleData;
  }

  render(){
    let scheduleData = this.state.scheduleData;
    let colorCount = 0;
    let { originalDate, originalStartTime, originalEndTime } = this.props;
    // change the time of an existing meeting instead of creating one
    if (scheduleData){
      if (Boolean(originalDate) && Boolean(originalStartTime) && Boolean(originalEndTime)){
        scheduleData = this.markOriginalData(scheduleData, originalDate, originalStartTime, originalEndTime);
      }
    }
    console.log(scheduleData)
    return(
      <Table>
        <TableHead>
          {
            ! scheduleData || scheduleData.length === 0 ? 
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
                      if (cell["expired"]){
                        bgcolor = grey[200];
                      }
                      else if (cell["click"] || cell["between"]){
                        bgcolor = green[400];
                      }
                      else {
                        bgcolor = cyan[50];
                      }
                    }
                    return (
                      <CustomTableCell style={{padding:0}} key={y} align="left" onClick={(e) => {this.handleClick(e, cell["date"], x, y)}}>
                      {
                        cell["original"]? ( 
                          cell["click"] || cell["between"] ?
                            <div style={{background:bgcolor, borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                              当前会议
                            </div> 
                          :
                            <div style={{ background:green[50], borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                              当前会议
                            </div>
                        )
                        : cell["occupied"] ? (
                            <div style={{background:bgcolor ,borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
                              <Link to={"/meeting/"+cell["meetingid"]+"/profile"}>
                                        {!cell["name"] ? "null" : (cell["name"].length > maxLenghtToShow ? cell["name"].substring(0,maxLenghtToShow)+".." : cell["name"])}
                              </Link>
                            </div>
                          )
                          : cell["expired"] ?
                            <div style={{background:bgcolor ,borderRadius:"15px", lineHeight:"45px" ,height:"45px", width:"92%", textAlign:"center"}}>
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
    )
  }
}

RoomSchedule.propTypes = {
  data: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  originalDate: PropTypes.string,
  originalStartTime: PropTypes.number,
  originalEndTime: PropTypes.number,
  recommendMessage: PropTypes.object,
  urgency: PropTypes.bool,
};

export default RoomSchedule;