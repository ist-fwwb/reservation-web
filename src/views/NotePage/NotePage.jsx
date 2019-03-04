import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Search from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Bookmark from '@material-ui/icons/Bookmark';
import GetApp from '@material-ui/icons/GetApp';
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

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

import { noteController } from 'variables/general.jsx';
import { Link, Redirect } from "react-router-dom";
import * as jsPDF from "jspdf";
import * as html2canvas from "html2canvas";

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
      redirect: false,
      redirect_url : '/',

      br: false,
      notificationMessage: "null",
      notificationType: null,

      notes_show: [],
      othersNotes_show: [],
      favoriteNotes_show: [],

      meetingHeading: '',
      noteHeading: '',
      name: '',

      othersMeetingHeading: '',
      othersNoteHeading: '',
      othersName: '',

      favoriteMeetingHeading: '',
      favoriteNoteHeading: '',
      favoriteName: '',

      notesPage: 0,
      notesRowsPerPage: 5,

      othersNotesPage: 0,
      othersNotesRowsPerPage: 5,

      favoriteNotesPage: 0,
      favoriteNotesRowsPerPage: 5,
    };
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
    let api = noteController.getNoteByOwnerId(this.props.userId, this.props.userId);
    fetch(api, {
      method: 'get',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(res => {
      if (res.error){
        console.log(res.error);
        return;
      }
      else{
        let notes = [];
        for (let i in res){
          let cur = res[i];
          let note = {
            favorite: cur.collected,
            id: cur.meetingNote.id,
            meetingId: cur.meetingNote.meetingId,
            meetingHeading: cur.meetingNote.meetingId,
            content: cur.meetingNote.note,
            ownerId: cur.meetingNote.ownerId,
            name: cur.meetingNote.ownerId,
            noteHeading: cur.meetingNote.title
          };
          notes.push(note);
        }
        this.setState({notes: notes, notes_show: notes});
      }
    })
    let othersNotes = [{
      id: "1112",
      meetingId: "5c6531e3c9e77c0013607eec",
      userId:"5c504daec9e77c0013ef1794",
      meetingHeading: "测试a",
      noteHeading:"测试b",
      name: "皮皮盼",
      favorite: false,
      time: "2019-02-10"
    }];
    let favoriteNotes = [{
      id: "m31a",
      meetingId: "5c6531e3c9e77c0013607eec",
      userId:"5c504daec9e77c0013ef1793",
      meetingHeading: "测试1",
      noteHeading:"测试2",
      name: "皮皮盘",
      favorite: true,
      time: "2019-02-10"
    }];
    this.setState({
      othersNotes,
      othersNotes_show: othersNotes,
      favoriteNotes,
      favoriteNotes_show: favoriteNotes,
    })
    // 获取自己的笔记
    // 获取他人的笔记
    // 获取收藏的笔记
  }

  handleFavoriteFavorite = (e, id) => {
    e.preventDefault();
    
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
    let api = noteController.handleFavorite(id);
    let { notes } = this.state;
    let favorite = false;
    for (let i in notes){
      if (notes[i].id === id){
        favorite = !notes[i].favorite;
        notes[i].favorite = favorite;
        break;
      }
    }
    let method = favorite ? 'post' : 'delete';

    this.setState({ notes });
    fetch(api, {
      method: method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: this.props.userId
    })
    .then(res => res.json())
    .then(res => {
      if (res.error){
        console.log(res.error);
        this.warning('收藏失败');
        return;
      }
      else {
        if (favorite)
          this.success('收藏成功');
        else
          this.success('取消收藏');
      }
    })
    .catch(e => {
      console.log(e);
      this.warning('收藏失败');
    })
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

  exportPDF = (e, content, id) => {
    e.preventDefault();
    var iframe=document.createElement('iframe');
    document.body.appendChild(iframe);
    var iframedoc = iframe.contentDocument||iframe.contentWindow.document;
    iframedoc.body.innerHTML = content;
    html2canvas(iframedoc.body)
    .then((canvas) => {
      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      //方向默认竖直，尺寸ponits，格式a4[595.28,841.89]
      var pdf = new jsPDF('', 'pt', 'a4');

      //addImage后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
      pdf.addImage(pageData, 'JPEG', 0, 0, 595.28, 592.28/canvas.width * canvas.height );
      pdf.save(id+'.pdf');
      this.success("开始下载");
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleSearch = (e, target) => {
    e.preventDefault();
    let meetingHeading;
    let noteHeading;
    let name;
    let source;
    let result = [];
    if (target === "notes_show"){
      meetingHeading = this.state.meetingHeading;
      noteHeading = this.state.noteHeading;
      name = this.state.name;
      source = this.state.notes;
    }
    else if (target === "othersNotes_show"){
      meetingHeading = this.state.othersMeetingHeading;
      noteHeading = this.state.othersNoteHeading;
      name = this.state.othersName;
      source = this.state.othersNotes;
    }
    else if (target === "favoriteNotes_show"){
      meetingHeading = this.state.favoriteMeetingHeading;
      noteHeading = this.state.favoriteMeetingHeading;
      name = this.state.favoriteName;
      source = this.state.favoriteNotes;
    }
    else {
      this.warning("Error");
      return;
    }
    for ( let i in source ){
      let cur = source[i];
      if (cur.meetingHeading.includes(meetingHeading) && cur.noteHeading.includes(noteHeading) && cur.name.includes(name)){
        result.push(cur);
      }
    }
    this.setState({[target]: result});
  }

  render(){
    if (this.state.redirect){
      return <Redirect to={this.state.redirect_url}/>
    }
    let { notes_show, othersNotes_show, favoriteNotes_show } = this.state;
    const { classes } = this.props;
    const { notesRowsPerPage, notesPage  } = this.state;
    const { othersNotesRowsPerPage, othersNotesPage  } = this.state;
    const { favoriteNotesRowsPerPage, favoriteNotesPage  } = this.state;
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
                              <Button color="primary" variant="contained" onClick={(e) => this.handleSearch(e, "notes_show")}>搜索</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <br></br>
                      <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
                        <Table className={classes.table} fixedHeader={false}>
                          <TableHead>
                            <TableRow>
                              <TableCell align="left">会议名称</TableCell>
                              <TableCell align="left">笔记标题</TableCell>
                              <TableCell align="left">作者</TableCell>
                              <TableCell align="left">操作</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            { ! notes_show ? null : notes_show.slice(notesPage * notesRowsPerPage, notesPage * notesRowsPerPage + notesRowsPerPage).map(ele => {
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.meetingId+"/profile"}>
                                    {ele.meetingHeading ? ele.meetingHeading : "null"}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Link to={"/note/"+ele.meetingId+"/"+ele.ownerId+"/profile"}>
                                    {ele.noteHeading ? ele.noteHeading : "null"}
                                    </Link>
                                  </TableCell>
                                  <TableCell>
                                    <Link to={"/user/"+ele.ownerId+"/profile"}>
                                    {ele.name}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                      <IconButton className={classes.iconButton} onClick={() => { this.setState({redirect: true, redirect_url: "/note/"+ele.meetingId+"/"+ele.ownerId+"/edit"});}}>
                                        <Edit/>
                                      </IconButton>
                                      <IconButton color={ele.favorite ? "secondary" : "default"} className={classes.iconButton} onClick={(e) => this.handleFavorite(e, ele.id)}>
                                        <FavoriteIcon/>
                                      </IconButton>
                                      <IconButton onClick={(e) => this.exportPDF(e, ele.content, ele.id)}>
                                        <GetApp/>
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
                                const notesEmptyRows = notesRowsPerPage - Math.min(notesRowsPerPage, notes_show.length - notesPage * notesRowsPerPage);
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
                                count={notes_show.length}
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
                              <Button color="primary" variant="contained" onClick={(e) => this.handleSearch(e, "othersNotes_show")}>搜索</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <br></br>
                    <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
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
                            { ! othersNotes_show ? null : othersNotes_show.slice(othersNotesPage * othersNotesRowsPerPage, othersNotesPage * othersNotesRowsPerPage + othersNotesRowsPerPage).map(ele => {
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.meetingId+"/profile"}>
                                    {ele.meetingHeading}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Link to={"/note/"+ele.meetingId+"/"+ele.ownerId+"/profile"}>
                                    {ele.noteHeading}
                                    </Link>
                                  </TableCell>
                                  <TableCell>
                                    {ele.name}
                                  </TableCell>
                                  <TableCell>
                                    {ele.time}
                                  </TableCell>
                                  <TableCell align="left">
                                      <IconButton className={classes.iconButton} onClick={() => { window.location.href="/note/"+ele.meetingId+"/"+ele.ownerId+"/profile";}}>
                                        <Search/>
                                      </IconButton>
                                      <IconButton color={ele.favorite ? "secondary" : "default"} className={classes.iconButton} onClick={(e) => this.handleOthersFavorite(e, ele.id)}>
                                        <FavoriteIcon/>
                                      </IconButton>
                                      <IconButton onClick={(e) => this.exportPDF(e, ele.content, ele.id)}>
                                        <GetApp/>
                                      </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const notesEmptyRows = notesRowsPerPage - Math.min(notesRowsPerPage, othersNotes_show.length - notesPage * notesRowsPerPage);
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
                                count={othersNotes_show.length}
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
                              <Button color="primary" variant="contained" onClick={(e) => this.handleSearch(e, "favoriteNotes_show")}>搜索</Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <br></br>
                    <Paper className={classes.root}>
                      <div className={classes.tableWrapper}>
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
                            { ! favoriteNotes_show ? null : favoriteNotes_show.slice(favoriteNotesPage * favoriteNotesRowsPerPage, favoriteNotesPage * favoriteNotesRowsPerPage + favoriteNotesRowsPerPage).map(ele => {
                              return (
                                <TableRow key={ele.id}>
                                  <TableCell align="left">
                                    <Link to={"/meeting/"+ele.meetingId+"/profile"}>
                                    {ele.meetingHeading}
                                    </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    <Link to={"/note/"+ele.meetingId+"/"+ele.ownerId+"/profile"}>
                                    {ele.noteHeading}
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
                                    <IconButton onClick={(e) => this.exportPDF(e, ele.content, ele.id)}>
                                      <GetApp/>
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                            {
                              () => {
                                const favoriteNotesEmptyRows = favoriteNotesRowsPerPage - Math.min(favoriteNotesRowsPerPage, favoriteNotes_show.length - favoriteNotesPage * favoriteNotesRowsPerPage);
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
                                count={favoriteNotes_show.length}
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
                      </div>
                    </Paper>
                    </div>
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
export default withStyles(styles)(NotePage);