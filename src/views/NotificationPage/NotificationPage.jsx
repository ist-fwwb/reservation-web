import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import New from '@material-ui/icons/MailOutlined';
import Read from '@material-ui/icons/DraftsOutlined';
import Search from '@material-ui/icons/Search';
import Done from '@material-ui/icons/Done';
import ErrorOutline from "@material-ui/icons/ErrorOutline";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

import { notificationController } from 'variables/general.jsx';
import { Redirect } from "react-router-dom";

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    width: '100%',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  icon: {
    verticalAlign: 'middle'
  },
  iconButton: {
    margin: theme.spacing.unit,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function NotificationSort(notification){
  notification.sort((a, b) => {
    if (a.messageStatus === "NEW")
      return -1;
    else
      return 1;
  })
  return notification;
}

class NotificationPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loaded: false,
      deleteOpen: false,

      br: false,
      notificationMessage: "null",
      notificationType: null,

      redirect: false,
      redirect_url: "/",

      NotificationPage: 0,
      NotificationRowsPerPage: 5,

    };
  }

  setRead = (id) => {
    let {Notification} = this.state;
    for (let i in Notification){
      if (Notification[i].id === id){
        Notification[i].messageStatus = "READ";
        Notification = NotificationSort(Notification);
        break;
      }
    }

    this.setState({ Notification });
  }

  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
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

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  }

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  handleChangeNotificationPage = (event, page) => {
    this.setState({ NotificationPage: page });
  };

  handleChangeNotificationRowsPerPage = event => {
    this.setState({ NotificationRowsPerPage: event.target.value });
  };


  componentDidMount(){
    let api = notificationController.getNotificationByUserId(this.props.userId);
    fetch(api, {
      method:'get',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if (res.error){
        this.warning(res.error);
        return;
      }
      else{
        this.setState({
          loaded: true,
          Notification: NotificationSort(res)
        })
      }
    })
  }

  handleDelete = (e) => {
    e.preventDefault();
    let notificationId = this.state.deleteId;
    let api2 = notificationController.deleteNotifiaction(notificationId);
    fetch(api2, {
      method: 'put',
      credentials: 'include'
    })
    
    let { Notification } = this.state;
    for (let i in Notification){
      if (Notification[i].id === notificationId){
        Notification.splice(i, 1);
        break;
      }
    }
    this.setState({ Notification, deleteOpen: false });
    this.success("删除成功");
  }

  setDeleteId = (e, deleteId) => {
    e.preventDefault();
    this.setState({ deleteId, deleteOpen: true })
  }


  render(){
    if (this.state.redirect){
      return <Redirect to={this.state.redirect_url}/>
    }
    let { Notification } = this.state;
    const { classes } = this.props;
    const { NotificationRowsPerPage, NotificationPage  } = this.state;
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
                  tabName: "消息列表",
                  tabIcon: FormatListNumbered,
                  tabContent: (
                    <div>
                      <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                      {! Notification ? null : 
                        <Table className={classes.table}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">消息标题</TableCell>
                              <TableCell align="left">更新时间</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            { Notification.slice(NotificationPage * NotificationRowsPerPage, NotificationPage * NotificationRowsPerPage + NotificationRowsPerPage).map(ele => {
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <span>
                                    {
                                      ele.messageStatus === "READ" ? <Read className={classes.icon}/> 
                                      : <New className={classes.icon}/>
                                    }
                                    &nbsp;
                                    <span 
                                      className={classes.icon} 
                                      onClick={() => {
                                          this.setState({ redirect: true, redirect_url: "/notification/"+ele.id+"/profile" });
                                          this.props.updateNotificationNumber();
                                        }
                                      }>
                                    {ele.title}
                                    </span>
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    {ele.time}
                                  </TableCell>
                                  <TableCell align="left">
                                    <IconButton 
                                      className={classes.iconButton} 
                                      onClick={() => { 
                                        this.setRead(ele.id);
                                        this.setState({redirect: true, redirect_url:"/notification/"+ele.id+"/profile"});
                                        ele.messageStatus === "NEW" && this.props.updateNotificationNumber();
                                      }}
                                    >
                                      <Search/>
                                    </IconButton>
                                    <IconButton className={classes.iconButton} onClick={(e) => this.setDeleteId(e, ele.id)}>
                                      <DeleteIcon/>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const NotificationEmptyRows = NotificationRowsPerPage - Math.min(NotificationRowsPerPage, Notification.length - NotificationPage * NotificationRowsPerPage);
                                return NotificationEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * NotificationEmptyRows }}>
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
                                count={Notification.length}
                                rowsPerPage={NotificationRowsPerPage}
                                page={NotificationPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangeNotificationPage}
                                onChangeRowsPerPage={this.handleChangeNotificationRowsPerPage}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      }
                      </div>
                    </Paper>
                    </div>
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
        <Dialog
          open={this.state.deleteOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => { this.setState({ deleteOpen: false});}}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"确认删除?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={() => { this.setState({ deleteOpen: false});}} color="primary">
              取消
            </Button>
            <Button onClick={this.handleDelete} color="primary">
              确定
            </Button>
          </DialogActions>
        </Dialog>
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
export default withStyles(styles)(NotificationPage);