import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Bookmark from '@material-ui/icons/Bookmark';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
        meetingId: "5c6531e3c9e77c0013607eec",
        userId:"5c504daec9e77c0013ef1793",
        meetingHeading: "测试1",
        heading:"测试2",
        name: "皮皮盘",
        favorite: true,
        time: "2019-02-10"
      }],
      othersNotification:[{
        id: "1112",
        meetingId: "5c6531e3c9e77c0013607eec",
        userId:"5c504daec9e77c0013ef1794",
        meetingHeading: "测试a",
        heading:"测试b",
        name: "皮皮盼",
        favorite: false,
        time: "2019-02-10"
      }],
      favoriteNotification:[{
        id: "1111",
        meetingId: "5c6531e3c9e77c0013607eec",
        userId:"5c504daec9e77c0013ef1793",
        meetingHeading: "测试1",
        heading:"测试2",
        name: "皮皮盘",
        favorite: true,
        time: "2019-02-10"
      }]
    })
    // 获取自己的笔记
    // 获取他人的笔记
    // 获取收藏的笔记
  }

  handleFavoriteFavorite = (e, id) => {
    e.preventDefault();
    let { favoriteNotification } = this.state;
    for (let i in favoriteNotification){
      if (favoriteNotification[i].id === id){
        favoriteNotification[i].favorite = !favoriteNotification[i].favorite;
        this.setState({ favoriteNotification });
        break;
      }
    }
  }

  handleOthersFavorite = (e, id) => {
    e.preventDefault();
    let { othersNotification, favoriteNotification } = this.state;
    for (let i in othersNotification){
      if (othersNotification[i].id === id){
        othersNotification[i].favorite = !othersNotification[i].favorite;
        this.setState({ othersNotification, favoriteNotification });
        break;
      }
    }
  }

  handleOthersDelete = (e, id) => {
    e.preventDefault();
    let { othersNotification } = this.state;
    for (let i in othersNotification){
      if (othersNotification[i].id === id){
        othersNotification.splice(i, 1);
        this.setState({ othersNotification });
        break;
      }
    }
  }

  handleFavorite = (e, id) => {
    e.preventDefault();
    let { Notification } = this.state;
    for (let i in Notification){
      if (Notification[i].id === id){
        Notification[i].favorite = !Notification[i].favorite;
        this.setState({ Notification });
        break;
      }
    }
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

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    let { Notification, othersNotification, favoriteNotification } = this.state;
    const { classes } = this.props;
    const { NotificationRowsPerPage, NotificationPage  } = this.state;
    const { othersNotificationRowsPerPage, othersNotificationPage  } = this.state;
    const { favoriteNotificationRowsPerPage, favoriteNotificationPage  } = this.state;
    return (
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title={null}
              style={{background:"#000"}}
              headerColor="danger"
              tabs={[
                {
                  tabName: "我的笔记",
                  tabIcon: FormatListNumbered,
                  tabContent: (
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                            <TextField
                              label="会议名称"
                              name="meetingHeading"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.meetingHeading}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                            <TextField
                              label="笔记名称"
                              name="noteHeading"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.noteHeading}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                            <TextField
                              label="作者"
                              name="name"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.name}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                              <Button color="primary" variant="contained">搜索</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <br></br>
                      <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                      {! Notification ? null : 
                        <Table className={classes.table} fixedHeader={false}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">会议名称</TableCell>
                              <TableCell align="left">笔记标题</TableCell>
                              <TableCell align="left">作者</TableCell>
                              <TableCell align="left">更新时间</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            { Notification.slice(NotificationPage * NotificationRowsPerPage, NotificationPage * NotificationRowsPerPage + NotificationRowsPerPage).map(ele => {
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.meetingId+"/profile"}>
                                    {ele.meetingHeading}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Link to={"/note/"+ele.meetingId+"/"+ele.userId+"/profile"}>
                                    {ele.heading}
                                    </Link>
                                  </TableCell>
                                  <TableCell>
                                    {ele.name}
                                  </TableCell>
                                  <TableCell>
                                    {ele.time}
                                  </TableCell>
                                  <TableCell align="left">
                                      <IconButton className={classes.iconButton} onClick={() => { window.location.href="/note/"+ele.meetingId+"/"+ele.userId+"/edit";}}>
                                        <Edit/>
                                      </IconButton>
                                      <IconButton color={ele.favorite ? "secondary" : "default"} className={classes.iconButton} onClick={(e) => this.handleFavorite(e, ele.id)}>
                                        <FavoriteIcon/>
                                      </IconButton>
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