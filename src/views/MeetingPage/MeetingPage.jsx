import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import Assignment from "@material-ui/icons/Assignment";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import History from "@material-ui/icons/History";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Warning from '@material-ui/icons/Warning';

import { Link } from "react-router-dom";
import { meetingController, idToTime } from 'variables/general.jsx';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  icon: {
    verticalAlign: 'middle'
  }
});

class MeetingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // warning / success message
      br: false,
      notificationMessage: "null",
      notificationType: null,


      meetings: null,
      attendMeetings: null,
      historyCancelledMeetings: null,
      historyStoppedMeetings: null,


      meetingsPage: 0,
      meetingsRowsPerPage: 5,

      attendMeetingsPage: 0,
      attendMeetingsRowsPerPage: 5,

      historyMeetingsPage: 0,
      historyMeetingsRowsPerPage: 5,
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

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  }

  componentDidMount(){
    let api = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Pending");
    fetch(api, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      // delete the meetings that he has joined
      let { attendMeetings } = this.state;
      if (this.state.loaded2){
        for (let i in data){
          for (let j=0; j < attendMeetings.length; j++){
            if (data[i].id === attendMeetings[j].id){
              attendMeetings.splice(j, 1);
              j--;
            }
          }
        }
      }
      this.setState({
        meetings: data,
        loaded1: true,
        attendMeetings
      })
    })
    .catch(e => console.log(e))

    let api2 = meetingController.getMeetingByDateAndRoomIdAndStatus(null, null, "Pending");
    fetch(api2, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      // delete the meetings that he has joined
      if (data.error){
        this.warning(data.error);
        return;
      }
      if (this.state.loaded1){
        let {meetings} = this.state;
        for (let i in meetings){
          for (let j=0; j < data.length; j++){
            if (meetings[i].id === data[j].id){
              data.splice(j, 1);
              j--;
            }
          }
        }
      }
      this.setState({
        attendMeetings: data,
        loaded2: true,
      })
    })
    .catch(e => console.log(e))

    let api3 = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Cancelled");
    fetch(api3, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        historyCancelledMeetings: data
      })
    })
    .catch(e => console.log(e))

    let api4 = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Stopped");
    fetch(api4, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        historyStoppedMeetings: data
      })
    })
    .catch(e => console.log(e))
  }

  handleChangeMeetingsPage = (event, page) => {
    this.setState({ meetingsPage: page });
  };

  handleChangeMeetingsRowsPerPage = event => {
    this.setState({ meetingsRowsPerPage: event.target.value });
  };

  handleChangeAttendMeetingsPage = (event, page) => {
    this.setState({ attendMeetingsPage: page });
  };

  handleChangeAttendMeetingsRowsPerPage = event => {
    this.setState({ attendMeetingsRowsPerPage: event.target.value });
  };

  handleChangeHistoryMeetingsPage = (event, page) => {
    this.setState({ historyMeetingsPage: page });
  };

  handleChangeHistoryMeetingsRowsPerPage = event => {
    this.setState({ historyMeetingsRowsPerPage: event.target.value });
  };
  
  handleCheck = (e, meetingId) => {
    e.preventDefault();
    window.location.href = "/meeting/" + meetingId + "/profile";
  }

  handleJoin = (e, attendantNum) => {
    e.preventDefault();
    let api = meetingController.attendMeetingByAttendantNum(attendantNum, this.props.userId);
    console.log(api)
    fetch(api,{
      credentials: 'include',
      method: 'post'
    })
    .then((res) => {
      if (res.ok){
        let { meetings, attendMeetings } = this.state;
        for (let i in attendMeetings){
          if (attendMeetings[i].attendantNum === attendantNum){
            meetings.push(attendMeetings[i]);
            attendMeetings.splice(i,1);
            break;
          }
        }
        this.setState({meetings, attendMeetings});
        this.success("加入成功");
      }
      else{
        this.warning("加入失败");
      }
    })
  }

  handleExit = (e, meetingId) => {
    e.preventDefault();
    let api = meetingController.exitMeetingByMeetingId(meetingId, this.props.userId);
    fetch(api,{
      credentials: 'include',
      method: 'delete'
    })
    .then((res) => {
      if (res.ok){
        let { meetings, attendMeetings } = this.state;
        for (let i in meetings){
          if (meetings[i].id === meetingId){
            attendMeetings.push(meetings[i]);
            meetings.splice(i,1);
            break;
          }
        }
        this.setState({ meetings, attendMeetings })
        this.success("退出成功");
      }
      else{
        this.warning("退出失败");
      }
    })
  }
  
  handleDismiss = (e, meetingId) => {
    e.preventDefault();
    let api = meetingController.cancelMeetingByMeetingId(meetingId);
    fetch(api,{
      credentials: 'include',
      method: 'put'
    })
    .then((res) => {
      if (res.ok){
        let meetings = this.state.meetings;
        for (let i in meetings){
          if (meetings[i].id === meetingId){
            meetings.splice(i,1);
            break;
          }
        }
        this.setState({meetings})
        this.success("解散成功");
      }
      else
        this.warning("解散失败");
    })    
  }

  render() {
    let userId = this.props.userId;
    let { meetings, attendMeetings, historyCancelledMeetings, historyStoppedMeetings } = this.state;
    let historyLoaded = false;
    let historyMeetings = historyCancelledMeetings; 
    if ( historyCancelledMeetings && historyStoppedMeetings){
      historyLoaded = true;
      historyMeetings = historyMeetings.concat(historyStoppedMeetings);
    }
    const { classes } = this.props;
    const { meetingsRowsPerPage, meetingsPage, attendMeetingsRowsPerPage, attendMeetingsPage, historyMeetingsRowsPerPage, historyMeetingsPage } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title={null}
              style={{background:"#000"}}
              headerColor="danger"
              tabs={[
                {
                  tabName: "待办会议",
                  tabIcon: Assignment,
                  tabContent: (
                    <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                      {! meetings ? null : 
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">会议名称</TableCell>
                              <TableCell align="left">发起人</TableCell>
                              <TableCell align="left">会议室</TableCell>
                              <TableCell align="left">日期</TableCell>
                              <TableCell align="left">时间</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            { meetings.slice(meetingsPage * meetingsRowsPerPage, meetingsPage * meetingsRowsPerPage + meetingsRowsPerPage).map(ele => {
                              let host = (userId === ele.hostId);
                              let meetingId = ele.id;
                              if (!(ele.status === "Pending" || ele.status === "Running"))
                                return null;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>
                                    <span>
                                    {ele.heading?ele.heading: "null"}
                                    {
                                      ele.type === "URGENCY" ? <Warning color="secondary" className={classes.icon}/> : null
                                    }
                                    </span>
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left"><Link to={"/user/"+ele.hostId+"/profile"}>{ele.host.name}</Link></TableCell>
                                  <TableCell align="left"><Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{idToTime(ele.startTime) + "~" + idToTime(ele.endTime)}</TableCell>
                                  <TableCell align="left">
                                    {
                                      host?<Button color="danger" size="sm" onClick={ (e) => this.handleDismiss(e, meetingId)}>解散会议</Button>
                                      :<Button color="danger" size="sm" onClick={ (e) => this.handleExit(e, meetingId)}>退出会议</Button>
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const meetingsEmptyRows = meetingsRowsPerPage - Math.min(meetingsRowsPerPage, meetings.length - meetingsPage * meetingsRowsPerPage);
                                return meetingsEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * meetingsEmptyRows }}>
                                    <TableCell colSpan={6} />
                                  </TableRow>
                                )
                              }
                            }
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={meetings.length}
                                rowsPerPage={meetingsRowsPerPage}
                                page={meetingsPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangeMeetingsPage}
                                onChangeRowsPerPage={this.handleChangeMeetingsRowsPerPage}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      }
                      </div>
                    </Paper>
                  )
                },
                {
                  tabName: "加入会议",
                  tabIcon: LibraryAdd,
                  tabContent: (
                    <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                      {! attendMeetings ? null : 
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">会议名称</TableCell>
                              <TableCell align="left">发起人</TableCell>
                              <TableCell align="left">会议室</TableCell>
                              <TableCell align="left">日期</TableCell>
                              <TableCell align="left">时间</TableCell>
                              <TableCell align="left" >操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {attendMeetings.slice(attendMeetingsPage * attendMeetingsRowsPerPage, attendMeetingsPage * attendMeetingsRowsPerPage + attendMeetingsRowsPerPage).map(ele => {
                              let host = (userId === ele.hostId);
                              if (host)
                                return null;
                              if (ele.status !== "Pending" )
                                return null;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading?ele.heading: "null"}</Link>
                                  </TableCell>
                                  <TableCell align="left"><Link to={"/user/"+ele.hostId+"/profile"}>{ele.host.name}</Link></TableCell>
                                  <TableCell align="left"><Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{idToTime(ele.startTime) + "~" + idToTime(ele.endTime)}</TableCell>
                                  <TableCell align="left">
                                    <Button color="success" size="sm" onClick={ (e) => this.handleJoin(e, ele.attendantNum)}>
                                      加入会议
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const attendMeetingsEmptyRows = attendMeetingsRowsPerPage - Math.min(attendMeetingsRowsPerPage, attendMeetings.length - attendMeetingsPage * attendMeetingsRowsPerPage);
                                return attendMeetingsEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * attendMeetingsEmptyRows }}>
                                    <TableCell colSpan={6} />
                                  </TableRow>
                              )
                            }}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                pname={"attendMeetingsPage"}
                                rppname={"attendMeetingsRowsPerPage"}
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={attendMeetings.length}
                                rowsPerPage={attendMeetingsRowsPerPage}
                                page={attendMeetingsPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangeAttendMeetingsPage}
                                onChangeRowsPerPage={this.handleChangeAttendMeetingsRowsPerPage}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      }
                      </div>
                    </Paper>
                  )
                },
                {
                  tabName: "历史会议",
                  tabIcon: History,
                  tabContent: (
                    <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                      {! historyLoaded ? null : 
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">会议名称</TableCell>
                              <TableCell align="left">发起人</TableCell>
                              <TableCell align="left">会议室</TableCell>
                              <TableCell align="left">日期</TableCell>
                              <TableCell align="left">时间</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {historyMeetings.slice(historyMeetingsPage * historyMeetingsRowsPerPage, historyMeetingsPage * historyMeetingsRowsPerPage + historyMeetingsRowsPerPage).map(ele => {
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading ? ele.heading: "null"}</Link>
                                  </TableCell>
                                  <TableCell align="left"><Link to={"/user/"+ele.hostId+"/profile"}>{ele.host.name}</Link></TableCell>
                                  <TableCell align="left"><Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{idToTime(ele.startTime) + "~" + idToTime(ele.endTime)}</TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const historyMeetingsEmptyRows = historyMeetingsRowsPerPage - Math.min(historyMeetingsRowsPerPage, historyMeetings.length - historyMeetingsPage * historyMeetingsRowsPerPage);
                                return historyMeetingsEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * historyMeetingsEmptyRows }}>
                                    <TableCell colSpan={6} />
                                  </TableRow>
                              )
                            }}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                pname={"historyMeetingsPage"}
                                rppname={"historyMeetingsRowsPerPage"}
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={historyMeetings.length}
                                rowsPerPage={historyMeetingsRowsPerPage}
                                page={historyMeetingsPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangeHistoryMeetingsPage}
                                onChangeRowsPerPage={this.handleChangeHistoryMeetingsRowsPerPage}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      }
                      </div>
                    </Paper>
                  )
                }
              ]}
            />
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
MeetingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetingPage);
