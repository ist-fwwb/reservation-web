import React from "react";
import PropTypes from 'prop-types';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';

import Stars from '@material-ui/icons/Stars';
import Add from '@material-ui/icons/Add';
import Done from '@material-ui/icons/Done';
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import PersonIcon from '@material-ui/icons/Person';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";
import { Link } from "react-router-dom";

import { ScheduleDataToRows, timeSliceController, meetingController, idToTime, userController } from "variables/general.jsx";

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    minWidth: 230,
    backgroundColor: theme.palette.background.paper,
  },
});

function convertToZhStatus(status){
  if (status === "Pending")
    return "等待中"
  else if ( status === "Running")
    return "开会中"
  else if ( status === "Cancelled")
    return "已取消"
  else if ( status === "Stopped")
    return "已结束"
}

class AttendantsDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addattendants: this.props.addattendants,
      checked: [],
      users: []
    };
  }

  handleChange = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  handleSubmitAddAttendants = (e) => {
    e.preventDefault();
    this.props.handleAttendantsSuccess(this.state.checked);
    this.setState({ checked: [] });
  }

  render() {
    const { classes, onClose, open, ...other } = this.props;
    const { addattendants } = this.state;
    return (
      <Dialog onClose={this.props.onClose} scroll={"paper"} aria-labelledby="simple-dialog-title" open={open} {...other}>
        <DialogTitle id="simple-dialog-title">邀请用户加入会议</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <List dense className={classes.root}>
            {addattendants.map(value => (
              <ListItem key={value.id}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={value.name}/>
                <ListItemSecondaryAction>
                  <Checkbox
                    checked={this.state.checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    onChange={this.handleChange(value)}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
            ))}
            </List>
          </FormControl>
        </DialogContent>
        <DialogActions> 
          <Button color="primary" onClick={this.props.onClose}>取消</Button>
          <Button color="primary" onClick={(e)=>this.handleSubmitAddAttendants(e)}>确认</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
AttendantsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  addattendants: PropTypes.array.isRequired,
  handleAttendantsSuccess: PropTypes.func,
};
const AttendantsDialogWrapped = withStyles(styles)(AttendantsDialog);

const editSuccessMessage = "修改成功";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MeetingProfile extends React.Component {
  constructor(props){
    super(props);
    this.roomSchedule = React.createRef();
    this.state = {
      // edit schedule
      lastDate: "",
      lastStartTime: -1,
      lastEndTime: -1,

      loaded: false,

      scheduleData: null,

      // warning / success message
      br: false,
      notificationMessage: "null",
      notificationType: null,

      // confirm exit dialog
      confirmExitOpen: false,
      // confirm attend dialog
      confirmAttendOpen: false,
      // confirm dismiss dialog
      confirmDismissOpen: false,
      // confirm time change dialog
      confirmTimeChangeOpen: false,
      // confirm profile hange dialog
      confirmProfileChangeOpen: false,
      // add tag
      newTag: false,
      newTagValue: "",

      // addAttendants menu
      openAttendants: false,
  
      hostFlag: false,
    }
  }

  componentDidMount() {
    let meetingApi = meetingController.getMeetingByMeetingId(this.props.match.params.meetingId);
    fetch(meetingApi,{
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data1) => {
      if (data1.error){
        this.warning(data1.error);
      }
      else{
        this.setState({...data1})
        console.log(data1)
        // get all user could be invited to this meeting
        let userApi = userController.getUser();
        let attendantsArray = this.dicToArray(data1.attendants);
        fetch(userApi, {
          method:'get',
          credentials:'include'
        })
        .then(res => res.json())
        .then((data2) => {
          let re = [];
          for (let i in data2){
            let ele = {};
            if (attendantsArray.includes(data2[i].id))
              continue;
            ele.id = data2[i].id;
            ele.name = data2[i].name; 
            re.push(ele);
          }
          delete data1.attendants;
          this.setState({
            hostFlag: data1.hostId === this.props.userId,
            addAttendants: re,
            loaded1: true,
          });
        })

        // get all users' name
        let userApi2 = userController.getUserByIds(attendantsArray);
        fetch(userApi2,{
          credentials: 'include',
          method: 'get',
        })
        .then(res => res.json())
        .then((data2) => {
          let hostname;
          for (let i in data2){
            if (data2[i] === null)
              data2[i] = {id: attendantsArray[i], name: "null"}
            if (attendantsArray[i] === data1.hostId){
              hostname = data2[i].name;
            }
          }
          this.setState({
            attendantsWithName: data2,
            loaded2: true,
            hostname
          })
        })

        // get room timeslice
        let timeApi = timeSliceController.getTimeSilceByRoomId(data1.roomId);
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
    })
    .catch(error => {
      console.log(error);
      this.setState({error: true});
    })
  }

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
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

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  dicToArray = (dic) => {
    let re = Object.keys(dic);
    return re;
  }

  // confirm dismiss dialog
  confirmDismissClickOpen = () => {
    this.setState({ confirmDismissOpen: true });
  };

  confirmDismissClose = () => {
    this.setState({ confirmDismissOpen: false });
  };

  handleDismiss = () => {
    let api = meetingController.cancelMeetingByMeetingId(this.props.match.params.meetingId);
    fetch(api,{
      credentials: 'include',
      method: 'put'
    })
    .then((res) => {
      if (res.ok){
        this.success("解散成功");
        window.location.reload();
      }
      else
        this.warning("解散失败");
        this.confirmDismissClose();
    })
  }

  // confirm exit dialog
  confirmExitClickOpen = () => {
    this.setState({ confirmExitOpen: true });
  };

  confirmExitClose = () => {
    this.setState({ confirmExitOpen: false });
  };

  handleExit = () => {
    let api = meetingController.exitMeetingByMeetingId(this.props.match.params.meetingId, this.props.userId);
    fetch(api,{
      credentials: 'include',
      method: 'delete'
    })
    .then((res) => {
      if (res.ok){
        this.success("退出成功");
        window.location.reload();
      }
      else{
        this.warning("退出失败");
        this.confirmExitClose();
      }
    })
  }

  // confirm attend dialog
  confirmAttendClickOpen = () => {
    this.setState({ confirmAttendOpen: true });
  };

  confirmAttendClose = () => {
    this.setState({ confirmAttendOpen: false });
  };

  handleAttend = () => {
    let api = meetingController.attendMeetingByAttendantNum(this.state.attendantNum, this.props.userId);
    fetch(api,{
      credentials: 'include',
      method: 'post'
    })
    .then((res) => {
      if (res.ok){
        this.success("加入成功");
        window.location.reload();
      }
      else{
        this.warning("加入失败");
        this.confirmAttendClose();
      }
    })
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

  // confirm profile change dialog
  confirmProfileChangeClickOpen = () => {
    this.setState({ confirmProfileChangeOpen: true });
  };

  confirmProfileChangeClose = () => {
    this.setState({ confirmProfileChangeOpen: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ confirmProfileChangeOpen: false })
    let msg = {};
    msg.attendantNum = this.state.attendantNum;
    msg.attendants = this.state.attendants;
    msg.date = this.state.date;
    msg.description = this.state.description;
    msg.endTime = this.state.endTime;
    msg.startTime = this.state.startTime;
    msg.heading = this.state.heading;
    msg.hostId = this.state.hostId;
    msg.id = this.props.match.params.meetingId;
    msg.location = this.state.location;
    msg.needSignIn = this.state.needSignIn;
    msg.roomId = this.state.roomId;
    msg.status = this.state.status;
    msg.type = this.state.type;
    msg.tags = this.state.tags;
    msg.timestamp = this.state.timestamp;
    let api = meetingController.editMeetingByMeetingId(this.props.match.params.meetingId);
    msg = JSON.stringify(msg);

    fetch(api, {
      credentials: 'include',
      method:'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: msg,
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error){
        this.warning(data.error);
      }
      else{
        this.success(editSuccessMessage);
      }
    })
  }

  // add tags
  handleAddTag = () => {
    let { newTagValue, tags } = this.state;
    if (newTagValue === ""){
      this.setState({ tags, newTagValue: "", newTag: false });
      return;
    }
    if (tags.includes(newTagValue)){
      this.warning("标签已存在");
      return;
    }
    tags.push(newTagValue);

    this.setState({ tags, newTagValue: "", newTag: false });
  };

  handleNewTag = () => {
    this.setState({ newTag: true, newTagValue: "" });
    //this.setState({ openTag: true });
  };

  handleCloseTag = () => {
    this.setState({ openTag: false });
  }

  handleDeleteTag = (e, tag) => {
    e.preventDefault();
    let { tags } = this.state;
    let index = tags.indexOf(tag);
    if (index !== -1){
      tags.splice(index, 1);
      this.setState({ tags });
    }
    else
      this.warning("不存在的标签")
  }

  // add attendants
  handleOpenAttendants = () => {
    this.setState({
      openAttendants: true,
    });
  };

  handleCloseAttendants = () => {
    this.setState({ openAttendants: false });
  }

  handleAttendantsSuccess = (value) => {
    let { addAttendants, attendantsWithName } = this.state;
    for (let i in value){
      for (let j in addAttendants){
        if (addAttendants[j].id === value[i].id){
          addAttendants.splice(j, 1);
          break;
        }
      }
    }
    attendantsWithName = attendantsWithName.concat(value);
    let attendants = {};
    for (let i in attendantsWithName){
      attendants[attendantsWithName[i].id] = "null";
    }
    this.setState({ attendantsWithName, addAttendants, attendants });
    this.handleCloseAttendants();
  };

  handleDeleteAttendant = (e, id) => {
    e.preventDefault();
    let {addAttendants, attendantsWithName} = this.state;
    for (let i in attendantsWithName){
      if (attendantsWithName[i].id === id){
        addAttendants.push({id: attendantsWithName[i].id, name: attendantsWithName[i].name});
        attendantsWithName.splice(i, 1);
      }
    }
    let attendants = {};
    for (let i in attendantsWithName){
      attendants[attendantsWithName[i].id] = "null";
    }
    //console.log(addAttendants);
    //addAttendants = quickSort(addAttendants, "name");
    //console.log(addAttendants);
    this.setState({ attendantsWithName, addAttendants, attendants });
  }

  handleChangeSwitch = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };  

  render(){
    if (this.state.error){
      return <h2>404 Not Found</h2>
    }
    const { classes } = this.props;
    const { 
      addAttendants, 
      loaded1, 
      loaded2, 
      attendantsWithName, 
      hostFlag, 
      location,
      roomId,
      startTime, 
      endTime, 
      type, 
      status, 
      hostId, 
      hostname,
      date, 
      description, 
      heading,
      tags,
    } = this.state;
    const pending = (status === "Pending");
    const disabled = !hostFlag || !pending;
    const loaded = loaded1 && loaded2;
    let inMeeting = false;
    if (!hostFlag){
      for(let i in attendantsWithName){
        if (attendantsWithName[i].id === this.props.userId){
          inMeeting = true;
          break;
        }
      }
    }
    else
      inMeeting = true;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>{this.state.heading}</h4>
                <p className={"内容: " + classes.cardCategoryWhite}>{this.state.description}</p>
                <p>{"状态: " + convertToZhStatus(status)}</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Link to={"/user/"+hostId+"/profile"}>
                      <TextField
                        label="发起人"
                        disabled
                        fullWidth
                        className={classes.textField}
                        value={loaded?hostname:"NULL"}
                        margin="normal"
                        variant="outlined"
                      />
                    </Link>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="会议名称"
                      name="heading"
                      disabled={disabled}
                      fullWidth
                      onChange={this.handleChange}
                      className={classes.textField}
                      value={loaded?heading:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      error={this.state.type==="URGENCY"}
                      select
                      disabled={disabled}
                      fullWidth
                      name="type"
                      label="会议类型"
                      className={classes.textField}
                      value={loaded?type:"COMMON"}
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
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <Link to={"/room/"+roomId+"/profile"}>
                      <TextField
                        label="会议室"
                        disabled
                        fullWidth
                        className={classes.textField}
                        value={loaded?location:"NULL"}
                        margin="normal"
                        variant="outlined"
                      />
                    </Link>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="日期"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={loaded?date:"NULL"}
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
                      value={loaded?(idToTime(startTime) + "~" + idToTime(endTime)):"NULL"}
                      margin="normal"
                      variant="outlined"
                      onClick={this.confirmTimeChangeClickOpen}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                      <Card>
                        <CardBody>
                          <Typography className={classes.title} color="textSecondary" gutterBottom>
                            签到
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={loaded ? this.state.needSignIn : false}
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
                  <GridItem xs={12} sm={12} md={9}>
                    <Card>
                      <CardBody>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          标签分类
                        </Typography>
                          {!loaded || !tags? null :
                          tags.map((data, key) => {
                            if (!data)
                              return null;
                            let local_disabled = !(this.props.userId ===this.state.hostId) || disabled;
                            if (local_disabled)
                              return (
                                <Chip
                                  key={key}
                                  label={data}
                                  className={classes.chip}
                                />
                              )
                            else
                              return (
                                  <Chip
                                    key={key}
                                    label={data}
                                    className={classes.chip}
                                    onDelete={(e) => this.handleDeleteTag(e, data)}
                                  />
                              );
                          })
                          }
                          {
                            !this.state.newTag ? null :
                              <Chip
                                label={
                                  <TextField
                                  name="newTagValue"
                                  className={classes.textField}
                                  value={this.state.newTagValue}
                                  onChange={this.handleChange}
                                  margin="normal"
                                  />
                                }
                                className={classes.chip}
                              />
                          }
                          {
                            disabled ? null : (! this.state.newTag ? 
                              <IconButton color="primary" className={classes.button} component="span" onClick={this.handleNewTag}>
                                <Add/>
                              </IconButton> :
                              <IconButton color="primary" className={classes.button} component="span" onClick={this.handleAddTag}>
                                <Done/>
                              </IconButton>
                              )
                          }
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <Card>
                      <CardBody>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          参会人员
                        </Typography>
                          {!loaded? null :
                          attendantsWithName.map((data, key) => {
                            if (!data)
                              return null;
                            let hostIcon = <Stars/>
                            let local_hostFlag = data.id===this.state.hostId;
                            let local_disabled = !(this.state.hostId === this.props.userId) || disabled;
                            if (local_hostFlag)
                              return (
                                <Chip
                                    key={key}
                                    icon={ hostIcon }
                                    label={data.name}
                                    className={classes.chip}
                                  />
                              )
                            else{
                              if (local_disabled)
                                return (
                                  <Chip
                                    key={key}
                                    label={data.name}
                                    className={classes.chip}
                                  />
                                )
                              else
                                return (
                                  <Chip
                                    key={key}
                                    label={data.name}
                                    className={classes.chip}
                                    onDelete={(e) => this.handleDeleteAttendant(e, data.id)}
                                  />
                            );
                            }
                          })
                          }
                          {
                            disabled?null:
                              <IconButton color="primary" className={classes.button} component="span" onClick={this.handleOpenAttendants}>
                                <Add/>
                              </IconButton>
                          }
                          {
                            disabled?null:
                              <AttendantsDialogWrapped
                                key
                                addattendants={addAttendants}
                                open={this.state.openAttendants}
                                handleAttendantsSuccess={this.handleAttendantsSuccess}
                                onClose={this.handleCloseAttendants}
                              />
                          }
                      </CardBody>
                    </Card>
                    
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <TextField
                      label="会议内容"
                      disabled={disabled}
                      multiline
                      fullWidth
                      rows="4"
                      name="description"
                      onChange={this.handleChange}
                      value={loaded?description:"NULL"}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              {
                !loaded || !pending ? null :
                ( hostFlag ? 
                    <CardFooter>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={4}>
                          <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={this.confirmTimeChangeClickOpen}
                          >修改时间</Button>
                          {
                            ! this.state.scheduleData ? null:
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
                                  data={ScheduleDataToRows(this.state.scheduleData)} 
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
                          }
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Button variant="outlined" onClick={this.confirmProfileChangeClickOpen}>确认修改</Button>
                          <Dialog
                            open={this.state.confirmProfileChangeOpen}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.confirmProfileChangeClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle id="alert-dialog-slide-title">
                              {"确认修改会议?"}
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={this.confirmProfileChangeClose} color="primary">
                                取消
                              </Button>
                              <Button onClick={this.handleSubmit} color="primary">
                                确定
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={4}>
                          <Button variant="outlined" onClick={this.confirmDismissClickOpen} color="secondary">解散会议</Button>
                          <Dialog
                            open={this.state.confirmDismissOpen}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={this.confirmDismissClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                          >
                            <DialogTitle id="alert-dialog-slide-title">
                              {"确认解散会议?"}
                            </DialogTitle>
                            <DialogActions>
                              <Button onClick={this.confirmDismissClose} color="primary">
                                取消
                              </Button>
                              <Button onClick={this.handleDismiss} color="secondary">
                                解散
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </GridItem>
                      </GridContainer>
                    </CardFooter>
                  : ( inMeeting ? 
                    <CardFooter>
                      <Button variant="outlined" color="secondary" onClick={this.confirmExitClickOpen}>退出会议</Button>
                      <Dialog
                        open={this.state.confirmExitOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.confirmExitClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle id="alert-dialog-slide-title">
                          {"确认退出会议？"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={this.confirmExitClose} color="primary">
                            取消
                          </Button>
                          <Button onClick={this.handleExit} color="secondary">
                            退出
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </CardFooter>
                    : 
                    <CardFooter>
                      <Button variant="outlined" onClick={this.confirmAttendClickOpen}>加入会议</Button>
                      <Dialog
                        open={this.state.confirmAttendOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={this.confirmAttendClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle id="alert-dialog-slide-title">
                          {"确认加入会议？"}
                        </DialogTitle>
                        <DialogActions>
                          <Button onClick={this.confirmAttendClose} color="primary">
                            取消
                          </Button>
                          <Button color="primary" onClick={this.handleAttend}>
                            加入
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </CardFooter>
                    )
                    )
              
              }
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
export default withStyles(dashboardStyle)(MeetingProfile);