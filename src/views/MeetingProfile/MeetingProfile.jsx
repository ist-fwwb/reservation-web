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
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import blue from '@material-ui/core/colors/blue';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';

import Stars from '@material-ui/icons/Stars';
import Add from '@material-ui/icons/Add';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { meetingController, idToTime, userController } from "variables/general.jsx";

const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};


class AttendantsDialog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addattendants: this.props.addattendants,
      checked: [],
      users: []
    };
  }
  
  handleSuccess = () => {
    this.props.onSuccess(this.state.checked);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleToggle = value => () => {
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

  handleSubmit = (e) => {
    e.preventDefault();

    this.handleSuccess();
  }

  handleSuccess = () => {
    this.props.handlesuccess(this.state.checked);
    this.setState({ checked: [] });
  }

  render() {
    const { classes, onClose, open, ...other } = this.props;
    const { addattendants } = this.state;
    return (
      <Dialog onClose={this.props.onClose} aria-labelledby="simple-dialog-title" open={open} {...other}>
        <DialogTitle id="simple-dialog-title">邀请用户加入会议</DialogTitle>
        <div>
          <List className={classes.root}>
            {addattendants.map(value => (
              <ListItem key={value.id} role={undefined} dense button onClick={this.handleToggle(value)}>
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={value.name} />
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" onClick={(e)=>this.handleSubmit(e)}>确认</Button>
          <Button variant="outlined" color="secondary" onClick={this.props.onClose}>取消</Button>
        </div>
      </Dialog>
    );
  }
}
AttendantsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  addattendants: PropTypes.array.isRequired,
  onSuccess: PropTypes.func,
};
const AttendantsDialogWrapped = withStyles(styles)(AttendantsDialog);

const editSuccessMessage = "修改成功";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MeetingProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,

      // warning / success message
      br: false,
      notificationMessage: "null",
      notificationType: null,

      // confirm exit dialog
      confirmExitOpen: false,
      // confirm attend dialog
      confirmAttendOpen: false,
      // confirm dissmiss dialog
      confirmDismissOpen: false,

      // addAttendants menu
      open: false,
  
      host: false,
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
            ...data1,
            host: data1.hostId === this.props.userId,
            addAttendants: re,
            loaded1: true,
          });
        })

        let userApi2 = userController.getUserByIds(attendantsArray);
        fetch(userApi2,{
          credentials: 'include',
          method: 'get',
        })
        .then(res => res.json())
        .then((data2) => {
          this.setState({
            attendantsWithName: data2,
            loaded2: true
          })
        })
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({error: true});
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
    });
    this.showNotification("br");
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let msg = JSON.stringify(this.state);
    let api = meetingController.editMeetingByMeetingId(this.props.match.params.meetingId);
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
      if (data.error)
        this.warning(data.error);
      else
        this.success(editSuccessMessage);
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
    let api = meetingController.deleteMeetingByMeetingId(this.props.match.params.meetingId);
    console.log(api);
    fetch(api,{
      credentials: 'include',
      method: 'delete'
    })
    .then((res) => {
      if (res.ok){
        this.success("解散成功");
        //window.location.href = "/";
      }
      else
        this.warning("解散失败");
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
        this.confirmAttendClose();
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

  // add attendants
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  }

  handleSuccess = (value) => {
    let { addAttendants, attendantsWithName }= this.state;
    for (let i in value){
      for (let j in addAttendants){
        if (addAttendants[j].id === value[i].id){
          addAttendants.splice(j, 1);
          break;
        }
      }
    }
    attendantsWithName = attendantsWithName.concat(value);
    this.setState({ attendantsWithName, addAttendants });
    this.handleClose();
  };

  render(){
    if (this.state.error){
      return <h2>404 Not Found</h2>
    }
    const { classes } = this.props;
    const { addAttendants, loaded1, loaded2, attendantsWithName, host, location, startTime, endTime, type, status, hostId, date, description, heading }= this.state;
    const disabled = !host;
    const loaded = loaded1 && loaded2;
    let inMeeting = false;
    if (!host){
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
                <p className={classes.cardCategoryWhite}>{this.props.match.params.meetingId}</p>
                <p>{"状态: " + status}</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="发起人"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={loaded?hostId:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
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
                      error={this.state.type==="URGENT"}
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
                      <MenuItem key={"URGENT"} value={"URGENT"}>
                        紧急
                      </MenuItem>
                    </TextField>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="会议室"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={loaded?location:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
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
                    />
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
                            return (
                                <Chip
                                  key={key}
                                  icon={data.id===this.state.hostId ? hostIcon:null}
                                  label={data.name}
                                  className={classes.chip}
                                />
                            );
                          })}
                          {
                            disabled?null:
                              <IconButton color="primary" className={classes.button} component="span" onClick={this.handleOpen}>
                                <Add/>
                              </IconButton>
                          }
                          {
                            disabled?null:
                              <AttendantsDialogWrapped
                                addattendants={addAttendants}
                                open={this.state.open}
                                handlesuccess={this.handleSuccess}
                                onClose={this.handleClose}
                              />
                          }
                      </CardBody>
                    </Card>
                    
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <TextField
                      label="会议简介"
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
                !loaded ? null :
                ( host ? 
                    <CardFooter>
                      <Button variant="outlined">确认修改</Button>
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