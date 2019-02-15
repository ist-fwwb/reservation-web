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
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";

import Snackbar from "components/Snackbar/Snackbar.jsx";
import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";
import { meetingController, utils_list, lexerController, idToTime, today, ScheduleDataToRows, emptyTimeSlice } from "variables/general.jsx";

const styles = theme => ({
  root: {
    backgroundColor: "transparent"
  },
  paper: {
    width: 300,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class SmartReservationPage extends React.Component{
  constructor(props){
    super(props);
    this.roomSchedule = React.createRef();
    this.state={
      loading: this.props.match.params.text ? true : false,
      heading: "智能预定会议",
      type: "COMMON",
      date: null,
      startTime: null,
      endTime: null,
      needSignIn: false,
      description: "无",

      confirmTimeChangeOpen: false,
      utils: [],
    };
  }
  
  componentDidMount(){
    let text = this.props.match.params.text;
    if (!this.state.loading){
      return;
    }
    let api = lexerController.lexer(text);
    fetch(api, {
      method:'get',
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      this.setState({loading: false});
      if(data.error){
        console.log(data.error);
        this.warning("解析错误");
        return;
      }

      if (data.startTime=== -1){
        data.startTime = null;
      }
      if (data.endTime===-1){
        data.endTime = null;
      }
      if (data.date===-1){
        data.date = null;
      }

      this.setState({
        ...data
      });
      this.success("解析成功");
    })
    .catch((error) => {
      this.setState({loading: false})
      this.warning("解析错误")
      console.log(error);
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

  handleChangeCheckBox = event => {
    event.preventDefault();
    let { utils } = this.state;
    if (event.target.checked){
      utils.push(event.target.name);
    }
    else{
      utils.splice(utils.indexOf(event.target.name), 1);
    }
    this.setState({ utils });
  }; 

  handleClose = () => {
    this.setState({loading: false});
  }

  handleSmartReserve = () => {
    let message = {
      "attendantNum": "string",
      "attendants": {},
      "date": this.state.date,
      "description": this.state.description,
      "endTime": this.state.endTime,
      "heading": this.state.heading,
      "hostId": this.props.userId,
      "id": "string",
      "location": "string",
      "needSignIn": this.state.needSignIn,
      "roomId": "string",
      "startTime": this.state.startTime,
      "status": "Pending",
      "tags": [],
      "timestamp": 0,
      "type": this.state.type
    }
    let api = meetingController.smartReserve(this.state.utils);
    fetch(api, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
    .then(res => res.json())
    .then(data => {
      if (!data || data.error){
        this.warning("预定失败")
        return
      }
      else {
        this.success("预订成功")
        window.location.href = "/meeting/" + data.id + "/profile"
      }
    })
  }

  render(){
    const { classes } = this.props;
    const { loading, utils, heading, type, date, startTime, endTime, needSignIn, description } = this.state;
    return(
      <div>
      <Dialog
        className={classes.dialog}
        open={loading}
        onClose={this.handleClose}
        PaperProps ={{
          classes: {
          root: classes.paper
          }
        }}
      >
      <DialogTitle>
        <CircularProgress size={25} className={classes.progress} /> 正在智能分析...
      </DialogTitle>
    </Dialog>
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
                      value={date?date: "null"}
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
                      {
                        this.state.date ? 
                        <RoomSchedule 
                          ref={this.roomSchedule}
                          data={ScheduleDataToRows(emptyTimeSlice)} 
                          originalDate={this.state.date} 
                          originalStartTime={this.state.startTime} 
                          originalEndTime={this.state.endTime} 
                          roomId={this.state.roomId} 
                          handleChange={this.handleTimeChange} 
                          urgency={this.state.status==="URGENCY"}
                        /> :
                        <RoomSchedule 
                          ref={this.roomSchedule}
                          data={ScheduleDataToRows(emptyTimeSlice)} 
                          roomId={this.state.roomId} 
                          handleChange={this.handleTimeChange} 
                          urgency={this.state.status==="URGENCY"}
                        />
                      }
                      
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
                                      name={utils_list.airconditioner}
                                      checked={utils.includes(utils_list.airconditioner)}
                                      onChange={this.handleChangeCheckBox}
                                      color="primary"
                                    />
                                  }
                                  label="空调"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={utils_list.blackboard}
                                      checked={utils.includes(utils_list.blackboard)}
                                      onChange={this.handleChangeCheckBox}
                                      color="primary"
                                    />
                                  }
                                  label="黑板"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={utils_list.table}
                                      checked={utils.includes(utils_list.table)}
                                      onChange={this.handleChangeCheckBox}
                                      color="primary"
                                    />
                                  }
                                  label="桌子"
                                />
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={utils_list.projector}
                                      checked={utils.includes(utils_list.projector)}
                                      onChange={this.handleChangeCheckBox}
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
                                      name={utils_list.power}
                                      checked={utils.includes(utils_list.power)}
                                      onChange={this.handleChangeCheckBox}
                                      color="primary"
                                    />
                                  }
                                  label="电源"
                                />
                            <FormControlLabel
                                control={
                                  <Checkbox
                                    name={utils_list.wifi}
                                    checked={utils.includes(utils_list.wifi)}
                                    onChange={this.handleChangeCheckBox}
                                    color="primary"
                                  />
                                }
                                label="无线网络"
                              />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={utils_list.network}
                                  checked={utils.includes(utils_list.network)}
                                  onChange={this.handleChangeCheckBox}
                                  color="primary"
                                />
                              }
                              label="有线网络"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name={utils_list.tv}
                                  checked={utils.includes(utils_list.tv)}
                                  onChange={this.handleChangeCheckBox}
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
          <GridItem xs={12} sm={12} md={2}>
            <Button variant="contained" color="primary" onClick={this.handleSmartReserve}>确认预订</Button>
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
export default withStyles(styles)(SmartReservationPage);