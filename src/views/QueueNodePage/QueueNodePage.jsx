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
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link } from "react-router-dom";
import { queueNodeController, idToTime } from 'variables/general.jsx';

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

class queueNodePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // warning / success message
      br: false,
      notificationMessage: "null",
      notificationType: null,
    
      loaded: false,

      queueNode: null,

      queueNodePage: 0,
      queueNodeRowsPerPage: 5,
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
    
    let api = queueNodeController.getQueueNodeByUserIdAndRoomIdAndDate(this.props.userId);
    fetch(api, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        queueNode: data,
        loaded: true,
      })
    })
    .catch(e => console.log(e))
  }

  handleChangequeueNodePage = (event, page) => {
    this.setState({ queueNodePage: page });
  };

  handleChangequeueNodeRowsPerPage = event => {
    this.setState({ queueNodeRowsPerPage: event.target.value });
  };
  
  handleCheck = (e, queueNodeId) => {
    e.preventDefault();
    window.location.href = "/queue/" + queueNodeId + "/profile";
  }
  
  handleCancel = (e, queueNodeId) => {
      /*
    e.preventDefault();
    let api = meetingController.cancelMeetingByMeetingId(meetingId);
    fetch(api,{
      credentials: 'include',
      method: 'put'
    })
    .then((res) => {
      if (res.ok){
        let queueNode = this.state.queueNode;
        for (let i in queueNode){
          if (queueNode[i].id === meetingId){
            queueNode.splice(i,1);
            break;
          }
        }
        this.setState({queueNode})
        this.success("解散成功");
      }
      else
        this.warning("解散失败");
    })    
    */
  }

  render() {
    let { queueNode } = this.state;

    const { classes } = this.props;
    const { queueNodeRowsPerPage, queueNodePage } = this.state;
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
                  tabName: "排队情况",
                  tabIcon: Assignment,
                  tabContent: (
                    <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                      {! queueNode ? null : 
                        <Table className={classes.table} fixedHeader={false} style={{ width: "auto", tableLayout: "auto" }}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">会议名称</TableCell>
                              <TableCell align="left">日期</TableCell>
                              <TableCell align="left">时间</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            { !queueNode ? null : queueNode.slice(queueNodePage * queueNodeRowsPerPage, queueNodePage * queueNodeRowsPerPage + queueNodeRowsPerPage).map(ele => {
                              let queueNodeId = ele.id;
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/queue/"+ele.id+"/profile"}>
                                    <span>
                                    {ele.heading?ele.heading: "null"}
                                    </span>
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">{ele.date}</TableCell>
                                  <TableCell align="left">{idToTime(ele.timeRange.start) + "~" + idToTime(ele.timeRange.end)}</TableCell>
                                  <TableCell align="left">
                                    {
                                      <Button color="danger" size="sm" onClick={ (e) => this.handleCancel(e, queueNodeId)}>取消排队</Button>
                                    }
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const queueNodeEmptyRows = queueNodeRowsPerPage - Math.min(queueNodeRowsPerPage, queueNode.length - queueNodePage * queueNodeRowsPerPage);
                                return queueNodeEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * queueNodeEmptyRows }}>
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
                                count={queueNode.length}
                                rowsPerPage={queueNodeRowsPerPage}
                                page={queueNodePage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangequeueNodePage}
                                onChangeRowsPerPage={this.handleChangequeueNodeRowsPerPage}
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
queueNodePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(queueNodePage);
