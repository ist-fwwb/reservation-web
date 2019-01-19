import React from "react";

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

import Stars from '@material-ui/icons/Stars';
import Add from '@material-ui/icons/Add';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { meetingController, idToTime } from "variables/general.jsx";

const editSuccessMessage = "修改成功";

class MeetingProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,

      br: false,
      notificationMessage: "null",
      notificationType: null,
  
      host: false,
    }
  }

  componentDidMount() {
    let api = meetingController.getMeetingByMeetingId(this.props.match.params.meetingId);
    fetch(api,{
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error)
        this.warning(data.error);
      else
        this.setState({
          ...data,
          host: data.hostId === this.props.userId,
          loaded: true
        })
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
    console.log(msg);
    console.log(api);
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
    let re = [];
    for (let i in dic){
      let ele = [];
      ele[0] = i;
      ele[1] = dic[i];
      re.push(ele);
    }
    return re;
  }

  render(){
    const { classes } = this.props;
    const { loaded, host, location, startTime, endTime, type, status, hostId, date, description, heading }= this.state;
    const disabled = !host;
    const attendants = this.dicToArray(this.state.attendants);
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
                          attendants.map((data, key) => {
                            let hostIcon = <Stars/>
                            return (
                                <Chip
                                  key={key}
                                  icon={data[0]===this.state.hostId ? hostIcon:null}
                                  label={data[0]}
                                  className={classes.chip}
                                />
                            );
                          })}
                          {
                            disabled?null:
                            <IconButton color="primary" className={classes.button} component="span">
                              <Add/>
                            </IconButton>
                          }
                      </CardBody>
                    </Card>
                    
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <TextField
                      label="会议简介"
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
                !loaded || disabled ? null :
                  <CardFooter>
                    <Button color="primary">确认修改</Button>
                  </CardFooter>
              
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