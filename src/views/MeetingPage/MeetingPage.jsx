import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Button from "components/CustomButtons/Button.jsx";

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
});

class MeetingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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

  componentDidMount(){
    let api = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Pending");
    fetch(api, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        meetings: data,
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
      this.setState({
        attendMeetings: data
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


  exitButton = (meetingId, userId, host) => {
    if (host)
      return <Button color="danger" size="sm" onClick={ (e) => this.handleDismiss(e, meetingId, userId)}>解散会议 {meetingId}</Button>;
    else
      return <Button color="danger" size="sm" onClick={ (e) => this.handleExit(e, meetingId, userId)}>退出会议 {meetingId}</Button>;
  } 
  
  joinButton = (meetingId, userId, host) => {
    return <Button color="success" size="sm">加入会议</Button>
  }
  
  handleCheck = (e, meetingId, userId) => {
    e.preventDefault();
    window.location.href = "/meeting/" + meetingId + "/profile";
  }

  handleJoin = (e, meetingId, userId) => {
    e.preventDefault();
    let attendMeetings = this.state.attendMeetings;
    for (let i in attendMeetings){
      if (attendMeetings[i].id === meetingId){
        attendMeetings.splice(i,1);
        break;
      }
    }
    this.setState({attendMeetings})
    return;
  }

  handleExit = (e, meetingId, userId) => {
    e.preventDefault();
    let meetings = this.state.meetings;
    for (let i in meetings){
      if (meetings[i].id === meetingId){
        meetings.splice(i,1);
        break;
      }
    }
    this.setState({meetings})
    return;
  }
  
  handleDismiss = (e, meetingId, userId) => {
    e.preventDefault();
    let meetings = this.state.meetings;
    for (let i in meetings){
      if (meetings[i].id === meetingId){
        meetings.splice(i,1);
        break;
      }
    }
    this.setState({meetings})
    return;
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
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading?ele.heading: "null"}</Link>
                                  </TableCell>
                                  <TableCell align="left"><Link to={"/user/"+ele.hostId+"/profile"}>{ele.hostId}</Link></TableCell>
                                  <TableCell align="left"><Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{idToTime(ele.startTime) + "~" + idToTime(ele.endTime)}</TableCell>
                                  <TableCell align="left">
                                    <Button color="info" size="sm" onClick={ (e) => this.handleCheck(e, meetingId, userId)}>
                                      {host?"管理会议":"查看会议"}
                                    </Button>
                                    {
                                      host?<Button color="danger" size="sm" onClick={ (e) => this.handleDismiss(e, meetingId, userId)}>解散会议</Button>
                                      :<Button color="danger" size="sm" onClick={ (e) => this.handleExit(e, meetingId, userId)}>退出会议</Button>
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
                              let meetingId = ele.id;
                              if (host)
                                return null;
                              if (ele.status !== "Pending" )
                                return null;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading?ele.heading: "null"}</Link>
                                  </TableCell>
                                  <TableCell align="left"><Link to={"/user/"+ele.hostId+"/profile"}>{ele.hostId}</Link></TableCell>
                                  <TableCell align="left"><Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{idToTime(ele.startTime) + "~" + idToTime(ele.endTime)}</TableCell>
                                  <TableCell align="left">
                                    <Button color="success" size="sm" onClick={ (e) => this.handleJoin(e, meetingId, userId)}>
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
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
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
                                  <TableCell align="left"><Link to={"/user/"+ele.hostId+"/profile"}>{ele.hostId}</Link></TableCell>
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
      </div>
    )
  }
}
MeetingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MeetingPage);
