import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import { userController } from 'variables/general.jsx';
import Cookies from 'universal-cookie';
import { ossClient, faceFileDir } from 'variables/oss.jsx';
import Snackbar from 'components/Snackbar/Snackbar.jsx';

const cookies = new Cookies();

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  tabcontainer: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  userAvatar: {
    width: 100,
    height: 100,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  input: {
    display: 'none',
  },
});

class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tel: "",
      password: "",

      bc: false,
      notificationMessage: "null",
      notificationType: null,

      selectedFile: null,
      preview: null,
      // tab value
      value: 0,
    };
  }
  handleTabChange = (event, value) => {
    this.setState({ value });
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleLogin = (e) => {
    e.preventDefault();
    let api = userController.login(this.state.tel, this.state.password);
    fetch(api, {
      method: 'post',
      credentials: 'include'
    })
    .then( res => res.json())
    .then((data) => {
      if (data.error)
        this.warning(data.error);
      else if (!data.id)
        this.warning("登录失败");
      else{
        this.success("登陆成功");
        cookies.set('login', true, { path: '/' });
        cookies.set('userId', data.id, { path: '/' });
        window.location.href = "/";
      }
    })
    .catch(error => {
      console.log(error);
      this.warning("登录失败");
    })
  }

  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  showNotification = () => {
    this.setState({bc: true});
    this.alertTimeout = setTimeout(
      function() {
        this.setState({bc: false});
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
    this.showNotification();
  }

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification();
  }

  handleRegister = (e) => {
    e.preventDefault();
    let { selectedFile, enterpriseId, name, re_tel, re_password } = this.state;
    if (! enterpriseId || ! name || ! re_tel || ! re_password){
      this.warning("请完整填写信息");
      return;
    }
    if (!selectedFile){
      this.warning("请上传头像");
      return;
    }
    let extensions;
    if (selectedFile.type === "image/jpeg"){
      extensions = ".jpg";
    }
    else if (selectedFile.type === "image/png"){
      extensions = ".png";
    }
    else{
      this.warning("仅支持 JPG 和 PNG 格式图片");
      return
    }
    let fileName = enterpriseId + re_tel;
    let path =  faceFileDir + "/" + fileName;
    
    let faceFile = path + extensions;
    let featureFile = path;

    ossClient.multipartUpload(faceFile, selectedFile)
    .then((result) => {
      console.log("oss result:"+result);
      let api = userController.register(enterpriseId, re_tel, re_password, name, faceFile, featureFile);
			fetch(api, {
        method:'post'
      })
      .then(res => res.json())
      .then((data) => {
        if (data.error){
          console.log("register error:"+data.error);
          this.warning("注册失败");
          return;
        }
        else if (data.id){
          this.success("注册成功");
          cookies.set('login', true, { path: '/' });
          cookies.set('userId', data.id, { path: '/' });
          window.location.href = "/";
          return;
        }
        else{
          this.warning("未知错误")
          console.log(data)
        }
      })
    })
    .catch((err) => {
      console.log("oss error: "+err);
			this.warning("注册失败");
		});
  }

  handleAvatar = (e) => {
    let selectedFile = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend =  () => {
        this.setState({ preview: reader.result, selectedFile });
    }
  }
  
  render(){
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <main className={classes.main}>
        <br/>
        <br/>
        <br/>
        <CssBaseline />
        <Paper>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleTabChange} centered>
            <Tab label="登录" />
            <Tab label="注册" />
          </Tabs>
        </AppBar>
        {value === 0 && 
          <TabContainer className={classes.tabcontainer}>
              <Typography component="h1" variant="h5">
                智能会议室
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="tel">手机</InputLabel>
                  <Input id="tel" name="tel" autoComplete="tel-local" autoFocus onChange={this.handleChange}/>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password">密码</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleLogin}
                >
                  登录
                </Button>
              </form>
          </TabContainer>
        }
        {value === 1 && 
        <TabContainer className={classes.tabcontainer}>
        <Typography component="h1" variant="h5">
          智能会议室
        </Typography>
        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel >企业</InputLabel>
            <Input id="enterpriseId" name="enterpriseId" autoFocus onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">姓名</InputLabel>
            <Input id="name" name="name" autoFocus onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleAvatar}
            />
            
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" className={classes.button}>
                      <div>
                      上传头像
                      </div>
                    </Button>
                    </label>
                    
                  </TableCell>
                  <TableCell>
                    {
                      this.state.preview ? <img className={classes.userAvatar} src={this.state.preview} alt="preview"/>:null
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="tel">手机</InputLabel>
            <Input id="re_tel" name="re_tel" autoComplete="tel-local" autoFocus onChange={this.handleChange}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel>密码</InputLabel>
            <Input name="re_password" type="password" id="re_password" onChange={this.handleChange}/>
          </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleRegister}
          >
            注册
          </Button>
        </form>
    </TabContainer>
        }
        </Paper>
        <Snackbar
          place="bc"
          color={this.state.notificationType}
          icon={this.typeToIcon(this.state.notificationType)}
          message={this.state.notificationMessage}
          open={this.state.bc}
          closeNotification={() => this.setState({ bc: false })}
          close
        />
      </main>
    )
  };
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);