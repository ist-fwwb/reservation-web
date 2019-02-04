import React from "react";
import PropTypes from 'prop-types';

import Done from '@material-ui/icons/Done';
import ErrorOutline from "@material-ui/icons/ErrorOutline";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';

import Snackbar from "components/Snackbar/Snackbar.jsx";
import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";
import { meetingController, idToTime, today, nextDay, ScheduleDataToRows } from "variables/general.jsx";
import { Button } from "@material-ui/core";

const style = theme => {};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const emptyTimeSlice = [
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": today,
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(today),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(today)),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(today))),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(nextDay(today)))),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(nextDay(nextDay(today))))),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(nextDay(nextDay(nextDay(today)))))),
  }
]
class SmartReservationPage extends React.Component{
  constructor(props){
    super(props);
    this.roomSchedule = React.createRef();
    let p_heading = this.props.match.params.heading;
    let p_date = this.props.match.params.date;
    let p_startTime = this.props.match.params.startTime;
    let p_endTime = this.props.match.params.endTime;
    let p_description = this.props.match.params.description;
    this.state={

      heading: p_heading ? p_heading : "",
      type: "COMMON",
      date: p_date ? p_date : today,
      startTime: p_startTime ? p_startTime : null,
      endTime: p_endTime ? p_endTime : null,
      needSignIn: false,
      description: p_description ? p_description : "",

      utils: [],
    };
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

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
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

  // confirm time change dialog
  confirmTimeChangeClickOpen = () => {
    this.setState({ confirmTimeChangeOpen: true });
  };

  confirmTimeChangeClose = () => {
    this.setState({ confirmTimeChangeOpen: false });
  };

  handleTimeChange = (state) => {
    this.setState(state);
    if (state.notificationType)
      this.showNotification("br");
  }

  ConfirmTimeChange = () => {
    let { date, startTime, endTime } = this.state;
    this.roomSchedule.current.clearOriginalBetween(date, startTime, endTime);
    let { firstChosen, secondChosen } = this.state;
    let newStartTime;
    let newEndTime;
    if (firstChosen && secondChosen){
      if (firstChosen[0] > secondChosen[0]){
        newStartTime = secondChosen[0];
        newEndTime = firstChosen[0]+1;
      }
      else{
        newEndTime = secondChosen[0]+1;
        newStartTime = firstChosen[0];
      }
    }
    else if (firstChosen && !secondChosen){
      newStartTime = firstChosen[0];
      newEndTime = startTime + 1;
    }

    this.setState({
      lastStartTime: this.state.startTime,
      lastEndTime: this.state.lastEndTime,
      lastDate: this.state.date,
      startTime: newStartTime, 
      endTime: newEndTime, 
      date: this.state.chosenDate
    });
    this.confirmTimeChangeClose();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleChangeSwitch = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.checked });
  }; 

  render(){
    const { classes } = this.props;
    const { heading, type, date, startTime, endTime, needSignIn, description } = this.state;
    return(
      <div>
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>{"智能预定"}</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="会议名称"
                      name="heading"
                      fullWidth
                      onChange={this.handleChange}
                      className={classes.textField}
                      value={heading}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      error={type==="URGENCY"}
                      select
                      fullWidth
                      name="type"
                      label="会议类型"
                      className={classes.textField}
                      value={type}
                      onChange={this.handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key={"COMMON"} value={"COMMON"}>
                        普通
                      </MenuItem>
                      <MenuItem key={"URGENCY"} value={"URGENCY"}>
                        紧急
                      </MenuItem>
                    </TextField>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="日期"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={date}
                      margin="normal"
                      variant="outlined"
                      onClick={this.confirmTimeChangeClickOpen}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="时间"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={idToTime(startTime) + "~" + idToTime(endTime)}
                      margin="normal"
                      variant="outlined"
                      onClick={this.confirmTimeChangeClickOpen}
                    />
                  </GridItem>
                  <Dialog
                    fullScreen
                    open={this.state.confirmTimeChangeOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.confirmTimeChangeClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle id="alert-dialog-slide-title">
                      {"修改时间"}
                    </DialogTitle>
                    <DialogContent>
                      <RoomSchedule 
                        ref={this.roomSchedule}
                        data={ScheduleDataToRows(emptyTimeSlice)} 
                        originalDate={this.state.date} 
                        originalStartTime={this.state.startTime} 
                        originalEndTime={this.state.endTime} 
                        roomId={this.state.roomId} 
                        handleChange={this.handleTimeChange} 
                        urgency={this.state.status==="URGENCY"}
                      />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.confirmTimeChangeClose} color="primary">
                      取消
                    </Button>
                    <Button onClick={this.ConfirmTimeChange} color="secondary">
                      确定
                    </Button>
                  </DialogActions>
                  </Dialog>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <Card>
                        <CardBody>
                          <Typography>
                            设备要求
                          </Typography>
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup row>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={"AIRCONDITIONER"}
                                      checked={this.state.AIRCONDITIONER}
                                      onChange={this.handleChangeSwitch}
                                      color="primary"
                                    />
                                  }
                                  label="空调"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={"BLACKBOARD"}
                                      checked={this.state.BLACKBOARD}
                                      onChange={this.handleChangeSwitch}
                                      color="primary"
                                    />
                                  }
                                  label="黑板"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={"TABLE"}
                                      checked={this.state.TABLE}
                                      onChange={this.handleChangeSwitch}
                                      color="primary"
                                    />
                                  }
                                  label="桌子"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={"PROJECTOR"}
                                      checked={this.state.PROJECTOR}
                                      onChange={this.handleChangeSwitch}
                                      color="primary"
                                    />
                                  }
                                  label="投影仪"
                                />
                              </FormGroup>
                          </FormControl>
                          <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup row>
                            <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={"POWER"}
                                      checked={this.state.POWER}
                                      onChange={this.handleChangeSwitch}
                                      color="primary"
                                    />
                                  }
                                  label="电源"
                                />
                            <FormControlLabel
                                control={
                                  <Checkbox
                                    name={"WIFI"}
                                    checked={this.state.airConditioned}
                                    onChange={this.handleChangeSwitch}
                                    color="primary"
                                  />
                                }
                                label="无线网络"
                              />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={"NETWORK"}
                                  checked={this.state.NETWORK}
                                  onChange={this.handleChangeSwitch}
                                  color="primary"
                                />
                              }
                              label="有线网络"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={"TV"}
                                  checked={this.state.TV}
                                  onChange={this.handleChangeSwitch}
                                  color="primary"
                                />
                              }
                              label="电视"
                            />
                          </FormGroup>
                          </FormControl>
                        </CardBody>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={2}>
                      <Card>
                        <CardBody>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            签到
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={needSignIn}
                                onChange={this.handleChangeSwitch}
                                name="needSignIn"
                                value="needSignIn"
                                color="primary"
                              />
                            }
                          />
                        </CardBody>
                      </Card>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <TextField
                      label="会议内容"
                      multiline
                      fullWidth
                      rows="4"
                      name="description"
                      onChange={this.handleChange}
                      value={description}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
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
    );
  }
}
export default withStyles(style)(SmartReservationPage);