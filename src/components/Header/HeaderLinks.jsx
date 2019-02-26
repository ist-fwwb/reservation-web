import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";
import Notifications from "@material-ui/icons/Notifications";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

import Cookies from 'universal-cookie';

const cookies = new Cookies();

class HeaderLinks extends React.Component {
  state = {
    open: false,
    notificationNumber: 0
  };

  componentDidMount(){
    let Notification = [{
      id: "1112",
      heading: "已读消息",
      sender: "系统",
      read: true,
      time: "2019-02-12",
    }];
    this.setState({notificationNumber: Notification.length});
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  logout = () => {
    cookies.remove("login", {path: "/"});
    cookies.remove("userId", {path: "/"});
    window.location.href="/";
  }

  render() {
    const { classes, userId } = this.props;
    const { open } = this.state;
    return (
      <div>
        <div className={classes.searchWrapper}>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search
            }}
            inputProps={{
              placeholder: "Search",
              inputProps: {
                "aria-label": "Search"
              }
            }}
          />
          <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
        </div>

        <div className={classes.manager}>
          <Link to="/notification">
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.buttonLink}
            >
              <Notifications className={classes.icons} />
              <span className={classes.notifications}>{this.state.notificationNumber}</span>
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>
                  通知
                </p>
              </Hidden>
            </Button>
          </Link>
        </div>
        <Link to={"/user/"+userId+"/profile"}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Person"
            className={classes.buttonLink}
          >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>个人信息</p>
            </Hidden>
          </Button>
        </Link>

        <Link to="/logout" onClick={this.logout}>
          <Button
            color={window.innerWidth > 959 ? "transparent" : "white"}
            justIcon={window.innerWidth > 959}
            simple={!(window.innerWidth > 959)}
            aria-label="Logout"
            className={classes.buttonLink}
          >
            <ExitToApp className={classes.icons} />
            <Hidden mdUp implementation="css">
              <p className={classes.linkText}>注销</p>
            </Hidden>
          </Button>
        </Link>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(HeaderLinks);
