import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import MailOutlined from '@material-ui/icons/MailOutlined';
import DraftsOutlined from '@material-ui/icons/DraftsOutlined';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Link } from "react-router-dom";

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

class NotificationPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {

      NotificationPage: 0,
      NotificationRowsPerPage: 5,

    };
  }

  handleChangeNotificationPage = (event, page) => {
    this.setState({ NotificationPage: page });
  };

  handleChangeNotificationRowsPerPage = event => {
    this.setState({ NotificationRowsPerPage: event.target.value });
  };


  componentDidMount(){
    this.setState({
      Notification:[{
        id: "1111",
        heading: "系统消息",
        sender: "系统",
        read: false,
        time: "2019-02-10",
      },{
        id: "1112",
        heading: "已读消息",
        sender: "系统",
        read: true,
        time: "2019-02-12",
      }]
    });
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    let { Notification } = this.state;
    for (let i in Notification){
      if (Notification[i].id === id){
        Notification.splice(i, 1);
        this.setState({ Notification });
        break;
      }
    }
  }


  render(){
    let { Notification } = this.state;
    const { classes } = this.props;
    const { NotificationRowsPerPage, NotificationPage  } = this.state;
    return (
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
                              <TableCell align="left">发送者</TableCell>
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
                                      ele.read ? <DraftsOutlined className={classes.icon}/> 
                                      : <MailOutlined className={classes.icon}/>
                                    }
                                    &nbsp;
                                    <Link className={classes.icon} to={"/notification/"+ele.id+"/profile"}>
                                    {ele.heading}
                                    </Link>
                                    </span>
                                  </TableCell>
                                  <TableCell align="left">
                                    {ele.sender}
                                  </TableCell>
                                  <TableCell>
                                    {ele.time}
                                  </TableCell>
                                  <TableCell align="left">
                                      <IconButton className={classes.iconButton} onClick={(e) => this.handleDelete(e, ele.id)}>
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
    )
  }
}
export default withStyles(styles)(NotificationPage);