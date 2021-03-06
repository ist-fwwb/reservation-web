import React from "react";
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";

import { userController } from "variables/general.jsx";
import { filepath } from 'variables/oss.jsx';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
};

const editSuccessMessage = "修改成功";

let _users_cache = {};
class UserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state={
      userId: this.props.userId,
      loaded: false,

      br: false,
      notificationMessage: "null",
      notificationType: null,
    };
  }

  _loadData = () => {
    let _user = _users_cache[this.props.userId];
    if (_user){
      this.setState({..._user, loaded: true});
      return;
    }

    let api = userController.getUserByUserId(this.props.userId);
    fetch(api,{
      credentials: 'include',
      method: 'get'
    })
    .then( res => res.json())
    .then((data) => {
      if (data.error)
        this.warning(data.error);
      else{
        _users_cache[this.props.userId] = data;
        this.setState({
          ...data,
          loaded: true
        });
      }
    })
    .catch(error => {
      console.log(error);
      this.setState({error: true});
    })
  }

  componentDidUpdate(prevProps){
    if (prevProps.userId !== this.props.userId) {
      this._loadData();
    }
  }

  componentDidMount(){
    this._loadData();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let msg = JSON.stringify(this.state);    
    let api = userController.editUser(this.state.userId);
    fetch(api, {
      credentials: 'include',
      method:'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: msg,
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error)
        this.warning(data.error);
      else
        this.success(editSuccessMessage);
    })
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

  render(){
    const { classes, disabled } = this.props;
    const { loaded, enterpriceId, phone, name, type } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader style={{background:"#000"}} color="primary">
                <h3 className={classes.cardTitleWhite}>个人信息</h3>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="公司"
                      disabled
                      fullWidth
                      value={loaded?enterpriceId:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="手机号"
                      disabled
                      fullWidth
                      name="phone"
                      value={loaded?phone:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="姓名"
                      disabled={disabled}
                      fullWidth
                      name="name"
                      onChange={this.handleChange}
                      value={loaded?name:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <TextField
                      label="type"
                      disabled
                      fullWidth
                      value={loaded?type:"NULL"}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <Avatar alt="avatar" src={filepath + '/' + this.state.faceFile} className={classes.bigAvatar} />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label="个人简介"
                      disabled={disabled}
                      multiline
                      fullWidth
                      rows="4"
                      value="这个人很懒，什么都没留下"
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                {
                  !loaded ? null :(
                    disabled ? null :
                    <Button color="success" onClick={this.handleSubmit}>确认修改</Button>
                  )
                }
              </CardFooter>
            </Card>
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
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(UserProfile);
