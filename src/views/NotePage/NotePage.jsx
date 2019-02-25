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

class NotePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      meetingHeading: '',
      noteHeading: '',

      notesPage: 0,
      notesRowsPerPage: 5,

      othersNotesPage: 0,
      othersNotesRowsPerPage: 5,

      favoriteNotesPage: 0,
      favoriteNotesRowsPerPage: 5,
    };
  }

  handleChangeNotesPage = (event, page) => {
    this.setState({ notesPage: page });
  };

  handleChangeNotesRowsPerPage = event => {
    this.setState({ notesRowsPerPage: event.target.value });
  };

  handleChangeOthersNotesPage = (event, page) => {
    this.setState({ othersNotesPage: page });
  };

  handleChangeOthersNotesRowsPerPage = event => {
    this.setState({ othersNotesRowsPerPage: event.target.value });
  };

  handleChangeFavoriteNotesPage = (event, page) => {
    this.setState({ favoriteNotesPage: page });
  };

  handleChangeFavoriteNotesRowsPerPage = event => {
    this.setState({ favoriteNotesRowsPerPage: event.target.value });
  };

  componentDidMount(){
    this.setState({
      notes:[{
        id: "1111",
        meetingId: "5c6531e3c9e77c0013607eec",
        userId:"5c504daec9e77c0013ef1793",
        meetingHeading: "测试1",
        heading:"测试2",
        name: "皮皮盘",
        favorite: true,
        time: "2019-02-10"
      }],
      othersNotes:[{
        id: "1112",
        meetingId: "5c6531e3c9e77c0013607eec",
        userId:"5c504daec9e77c0013ef1794",
        meetingHeading: "测试a",
        heading:"测试b",
        name: "皮皮盼",
        favorite: false,
        time: "2019-02-10"
      }],
      favoriteNotes:[{
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
    let { favoriteNotes } = this.state;
    for (let i in favoriteNotes){
      if (favoriteNotes[i].id === id){
        favoriteNotes[i].favorite = !favoriteNotes[i].favorite;
        this.setState({ favoriteNotes });
        break;
      }
    }
  }

  handleOthersFavorite = (e, id) => {
    e.preventDefault();
    let { othersNotes, favoriteNotes } = this.state;
    for (let i in othersNotes){
      if (othersNotes[i].id === id){
        othersNotes[i].favorite = !othersNotes[i].favorite;
        this.setState({ othersNotes, favoriteNotes });
        break;
      }
    }
  }

  handleOthersDelete = (e, id) => {
    e.preventDefault();
    let { othersNotes } = this.state;
    for (let i in othersNotes){
      if (othersNotes[i].id === id){
        othersNotes.splice(i, 1);
        this.setState({ othersNotes });
        break;
      }
    }
  }

  handleFavorite = (e, id) => {
    e.preventDefault();
    let { notes } = this.state;
    for (let i in notes){
      if (notes[i].id === id){
        notes[i].favorite = !notes[i].favorite;
        this.setState({ notes });
        break;
      }
    }
  }

  handleDelete = (e, id) => {
    e.preventDefault();
    let { notes } = this.state;
    for (let i in notes){
      if (notes[i].id === id){
        notes.splice(i, 1);
        this.setState({ notes });
        break;
      }
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    let { notes, othersNotes, favoriteNotes } = this.state;
    const { classes } = this.props;
    const { notesRowsPerPage, notesPage  } = this.state;
    const { othersNotesRowsPerPage, othersNotesPage  } = this.state;
    const { favoriteNotesRowsPerPage, favoriteNotesPage  } = this.state;
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
                      {! notes ? null : 
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
                            { notes.slice(notesPage * notesRowsPerPage, notesPage * notesRowsPerPage + notesRowsPerPage).map(ele => {
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
                                const notesEmptyRows = notesRowsPerPage - Math.min(notesRowsPerPage, notes.length - notesPage * notesRowsPerPage);
                                return notesEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * notesEmptyRows }}>
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
                                count={notes.length}
                                rowsPerPage={notesRowsPerPage}
                                page={notesPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangenotesPage}
                                onChangeRowsPerPage={this.handleChangenotesRowsPerPage}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      }
                      </div>
                    </Paper>
                    </div>
                  )
                },
                {
                  tabName: "他人笔记",
                  tabIcon: InsertDriveFile,
                  tabContent: (
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                            <TextField
                              label="会议名称"
                              name="othersMeetingHeading"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.othersMeetingHeading}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                            <TextField
                              label="笔记名称"
                              name="othersNoteHeading"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.othersNoteHeading}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                            <TextField
                              label="作者"
                              name="othersName"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.othersName}
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
                      {! notes ? null : 
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
                            { othersNotes.slice(othersNotesPage * othersNotesRowsPerPage, othersNotesPage * othersNotesRowsPerPage + othersNotesRowsPerPage).map(ele => {
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
                                      <IconButton className={classes.iconButton} onClick={() => { window.location.href="/note/"+ele.meetingId+"/"+ele.userId+"/profile";}}>
                                        <Search/>
                                      </IconButton>
                                      <IconButton color={ele.favorite ? "secondary" : "default"} className={classes.iconButton} onClick={(e) => this.handleOthersFavorite(e, ele.id)}>
                                        <FavoriteIcon/>
                                      </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                          <TableFooter>
                            <TableRow>
                              <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={othersNotes.length}
                                rowsPerPage={othersNotesRowsPerPage}
                                page={othersNotesPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangeOthersNotesPage}
                                onChangeRowsPerPage={this.handleChangeOthersNotesRowsPerPage}
                              />
                            </TableRow>
                          </TableFooter>
                        </Table>
                      }
                      </div>
                    </Paper>
                    </div>
                  )
                },
                {
                  tabName: "收藏笔记",
                  tabIcon: Bookmark,
                  tabContent: (
                    <div>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                            <TextField
                              label="会议名称"
                              name="favoriteMeetingHeading"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.favoriteMeetingHeading}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                            <TextField
                              label="笔记名称"
                              name="favoriteNoteHeading"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.favoriteNoteHeading}
                              margin="normal"
                              variant="outlined"
                            />
                            </td>
                            <td>&nbsp;&nbsp;</td>
                            <td>
                            <TextField
                              label="作者"
                              name="favoriteName"
                              fullWidth
                              onChange={this.handleChange}
                              className={classes.textField}
                              value={this.state.favoriteName}
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
                      {! notes ? null : 
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
                            { favoriteNotes.slice(favoriteNotesPage * favoriteNotesRowsPerPage, favoriteNotesPage * favoriteNotesRowsPerPage + favoriteNotesRowsPerPage).map(ele => {
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
                                    <IconButton color={ele.favorite ? "secondary" : "default"} className={classes.iconButton} onClick={(e) => this.handleFavoriteFavorite(e, ele.id)}>
                                      <FavoriteIcon/>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const favoriteNotesEmptyRows = favoriteNotesRowsPerPage - Math.min(favoriteNotesRowsPerPage, favoriteNotes.length - favoriteNotesPage * favoriteNotesRowsPerPage);
                                return favoriteNotesEmptyRows > 0 && (
                                  <TableRow style={{ height: 48 * favoriteNotesEmptyRows }}>
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
                                count={favoriteNotes.length}
                                rowsPerPage={favoriteNotesRowsPerPage}
                                page={favoriteNotesPage}
                                SelectProps={{
                                  native: true,
                                }}
                                onChangePage={this.handleChangeOthersNotesPage}
                                onChangeRowsPerPage={this.handleChangeOthersNotesRowsPerPage}
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
export default withStyles(styles)(NotePage);