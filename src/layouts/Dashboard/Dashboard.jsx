/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import { dashboardRoutes, deepRoutes } from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import { notificationController } from "variables/general.jsx";
import NotificationPage from "views/NotificationPage/NotificationPage.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import LoginPage from "views/LoginPage/LoginPage.jsx";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
let ps;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      login: cookies.get("login"),
      userId: cookies.get("userId"),

      notificationNumber : 0,
    };
  }

  componentDidMount(){
    window.addEventListener("resize", this.resizeFunction);
    let api = notificationController.getNotificationByUserId(this.state.userId);
    fetch(api, {
      method: 'get',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => {
      if (res.error){
        console.log(res.error);
        return;
      }
      else {
        let notificationNumber = 0;
        for (let i in res){
          if (res[i].messageStatus==="NEW")
            notificationNumber++;
        }
        this.setState({notificationNumber});
      }
    })
  }

  updateNotificationNumber = () => {
    let { notificationNumber } = this.state;
    notificationNumber--;
    this.setState({ notificationNumber });
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  setPsRef = (element) => {
    this.psRef = element;
    if (navigator.platform.indexOf("Win") > -1  && element){
     ps = new PerfectScrollbar( element, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
    if (navigator.platform.indexOf("Win") > -1 && ps){
      ps.destroy();
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const { userId, login, notificationNumber } = this.state;
    if (!login){
      return <LoginPage handleLogin={this.handleLogin}/>;
    }
    return (
      <div className={classes.wrapper} ref={this.setPsRef}>
        <Sidebar
          userId={userId}
          routes={dashboardRoutes}
          logoText={"智能会议室"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel}>
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            userId={userId}
            notificationNumber={this.state.notificationNumber}
            {...rest}
          />
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>
                {
                  deepRoutes.map((prop, key) => {
                    if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                    else
                      return <Route 
                        exact path={prop.path} 
                        key={key} 
                        render={ (props) => {
                          if (prop.component === NotificationPage){
                            return (
                              <prop.component userId={userId} updateNotificationNumber={this.updateNotificationNumber} {...props}/>
                            )
                          }
                          else
                            return (
                              <prop.component userId={userId} {...props}/>
                            )
                        }} 
                      />

                  })
                }
                </Switch>
              </div>
            </div>
          <Footer /> 
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
