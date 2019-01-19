import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Button from "components/CustomButtons/Button.jsx";
import RoomLink from "components/RoomLink/RoomLink.jsx";

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
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Link } from "react-router-dom";

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

let counter = 0;
function createData(name, calories, fat) {
  counter += 1;
  return { id: counter, name, calories, fat };
}

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


const historyMeetingsData = [{
  id: "0",
  attendantNum: "7",
  attendants: {},
  date: "2018-01-10",
  description: "whatever",
  endTime: "10:00",
  heading: "Meeting 1",
  hostId: "0",
  location: "508",
  needSignIn: false,
  roomId: "string",
  startTime: "10:30",
  status: "Cancelled",
  type: "COMMON"
  },
];
const attendMeetingsData = [
  {
    id: "4",
    attendantNum: "4",
    attendants: {},
    date: "2018-02-01",
    description: "whatever",
    endTime: "14:00",
    heading: "Meeting b",
    hostId: "1",
    location: "501",
    needSignIn: false,
    roomId: "string",
    startTime: "14:30",
    status: "Pending",
    type: "COMMON"
  },
  {
    id: "6",
    attendantNum: "3",
    attendants: {},
    date: "2018-02-03",
    description: "whatever description",
    endTime: "16:00",
    heading: "Meeting a",
    hostId: "2",
    location: "504",
    needSignIn: false,
    roomId: "string",
    startTime: "16:30",
    status: "Pending",
    type: "COMMON"
    }
];
const meetingsData = [
  {
    id: "7",
    attendantNum: "5",
    attendants: {},
    date: "2018-02-01",
    description: "whatever",
    endTime: "10:00",
    heading: "Meeting 1",
    hostId: "1",
    location: "501",
    needSignIn: false,
    roomId: "string",
    startTime: "10:30",
    status: "Pending",
    type: "COMMON"
  },
  {
    id: "8",
    attendantNum: "6",
    attendants: {},
    date: "2018-02-02",
    description: "whatever description",
    endTime: "11:30",
    heading: "Meeting 2",
    hostId: "2",
    location: "502",
    needSignIn: false,
    roomId: "string",
    startTime: "12:30",
    status: "Pending",
    type: "COMMON"
    }
];

class MeetingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      meetings: meetingsData,
      attendMeetings: attendMeetingsData,
      historyMeetings: historyMeetingsData,
      userId: 1,
      rows: [
        createData('Cupcake', 305, 3.7),
        createData('Donut', 452, 25.0),
        createData('Eclair', 262, 16.0),
        createData('Frozen yoghurt', 159, 6.0),
        createData('Gingerbread', 356, 16.0),
        createData('Honeycomb', 408, 3.2),
        createData('Ice cream sandwich', 237, 9.0),
        createData('Jelly Bean', 375, 0.0),
        createData('KitKat', 518, 26.0),
        createData('Lollipop', 392, 0.2),
        createData('Marshmallow', 318, 0),
        createData('Nougat', 360, 19.0),
        createData('Oreo', 437, 18.0),
      ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
      page: 0,
      rowsPerPage: 5,
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  exitButton = (meetingId, userId, host) => {
    if (host)
      return <Button color="danger" size="sm" onClick={ (e) => this.handleDismiss(e, meetingId, userId)}>解散会议 {meetingId}</Button>;
    else
      return <Button color="danger" size="sm" onClick={ (e) => this.handleExit(e, meetingId, userId)}>退出会议 {meetingId}</Button>;
  } 
  
  checkButton = (meetingId, userId, host) => {
    return <Button color="success" size="sm" onClick={ (e) => this.handleCheck(e, meetingId, userId)}>
            {host ? ("管理会议 " + meetingId) : ("查看会议" + meetingId)}
          </Button>;
  }
  
  joinButton = (meetingId, userId, host) => {
    return <Button color="success" size="sm">加入会议 {meetingId}</Button>
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

  JSONToArray = (jsonArray, type, userId) => {
    let re = [];
    for (let i in jsonArray){
      let ele = jsonArray[i];
      let temp_ele = [];
      temp_ele.push(<Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading}</Link>);
      temp_ele.push(ele.hostId);
      temp_ele.push(<RoomLink location={ele.location} roomId={ele.roomId}/>);
      temp_ele.push(ele.date);
      temp_ele.push(ele.startTime + "~" + ele.endTime);
      if (type === "history")
        temp_ele.push(ele.status);
      if (type === "meeting")
        temp_ele.push([this.checkButton(ele.id, userId, userId===ele.hostId), "\t", this.exitButton(ele.id, userId, userId===ele.hostId)]);
      else if (type === "history")
        temp_ele.push([this.checkButtons(ele.id, userId, userId===ele.hostId)])
      else if (type === "attend")
        temp_ele.push([this.checkButtons(ele.id, userId, userId===ele.hostId), "\t", this.joinButton(ele.id, userId, userId===ele.hostId)]);
      re.push(temp_ele);
    }
    return re;
  }

  render() {
    let userId = this.state.userId;
    let meetings = this.state.meetings;
    let attendMeetings = this.state.attendMeetings;
    let historyMeetings = this.state.historyMeetings;

    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
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
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" style={{minWidth:"70px"}}>会议名称</TableCell>
                              <TableCell align="left" style={{minWidth:"50px"}}>发起人</TableCell>
                              <TableCell align="left" style={{minWidth:"50px"}}>会议室</TableCell>
                              <TableCell align="left" style={{minWidth:"80px"}}>日期</TableCell>
                              <TableCell align="left" style={{minWidth:"80px"}}>时间</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {meetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(ele => {
                              let host = (userId === ele.hostId);
                              let meetingId = ele.id;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading}</Link>
                                  </TableCell>
                                  <TableCell align="left">{ele.hostId}</TableCell>
                                  <TableCell align="left"><RoomLink location={ele.location}/></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{ele.startTime + "~" + ele.endTime}</TableCell>
                                  <TableCell align="left">
                                    <Button color="info" size="sm" onClick={ (e) => this.handleCheck(e, meetingId, userId)}>
                                      {host?"管理会议":"查看会议"}
                                    </Button>
                                    &nbsp;
                                    {
                                      host?<Button color="danger" size="sm" onClick={ (e) => this.handleDismiss(e, meetingId, userId)}>解散会议</Button>
                                      :<Button color="danger" size="sm" onClick={ (e) => this.handleExit(e, meetingId, userId)}>退出会议</Button>
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={meetings.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
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
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" style={{minWidth:"70px"}}>会议名称</TableCell>
                              <TableCell align="left" style={{minWidth:"50px"}}>发起人</TableCell>
                              <TableCell align="left" style={{minWidth:"50px"}}>会议室</TableCell>
                              <TableCell align="left" style={{minWidth:"80px"}}>日期</TableCell>
                              <TableCell align="left" style={{minWidth:"80px"}}>时间</TableCell>
                              <TableCell align="left" >操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {attendMeetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(ele => {
                              let host = (userId === ele.hostId);
                              let meetingId = ele.id;
                              if (host)
                                return null;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading}</Link>
                                  </TableCell>
                                  <TableCell align="left">{ele.hostId}</TableCell>
                                  <TableCell align="left"><RoomLink location={ele.location}/></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{ele.startTime + "~" + ele.endTime}</TableCell>
                                  <TableCell align="left">
                                    <Button color="info" size="sm" onClick={ (e) => this.handleCheck(e, meetingId, userId)}>
                                      查看会议
                                    </Button>
                                    &nbsp;
                                    <Button color="success" size="sm" onClick={ (e) => this.handleJoin(e, meetingId, userId)}>
                                      加入会议
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={attendMeetings.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
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
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left" style={{minWidth:"70px"}}>会议名称</TableCell>
                              <TableCell align="left" style={{minWidth:"50px"}}>发起人</TableCell>
                              <TableCell align="left" style={{minWidth:"50px"}}>会议室</TableCell>
                              <TableCell align="left" style={{minWidth:"80px"}}>日期</TableCell>
                              <TableCell align="left" style={{minWidth:"80px"}}>时间</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {historyMeetings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(ele => {
                              let meetingId = ele.id;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading}</Link>
                                  </TableCell>
                                  <TableCell align="left">{ele.hostId}</TableCell>
                                  <TableCell align="left"><RoomLink location={ele.location}/></TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{ele.startTime + "~" + ele.endTime}</TableCell>
                                  <TableCell align="left">
                                    <Button color="info" size="sm" onClick={ (e) => this.handleCheck(e, meetingId, userId)}>
                                      查看会议
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={historyMeetings.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
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
