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

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import LoginPage from "views/LoginPage/LoginPage.jsx";

import { timeToId } from "variables/general.jsx";

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
      /*
      recommendMessage example: 
      {"date": "2019-02-01","startTime": "9:00","endTime": "10:00", "roomId": "5c4e9bdac9e77c00133acdd6", "heading":"whatever"}
      */
    };
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  pasteFunction = (event) => {
    if(event.clipboardData){
      let text = event.clipboardData.getData('text/plain');
      try {
        let jsonData = JSON.parse(text);
        if (jsonData.date && jsonData.startTime && jsonData.endTime && jsonData.roomId && jsonData.heading){
          jsonData.startTime = timeToId(jsonData.startTime);
          jsonData.endTime = timeToId(jsonData.endTime);
          window.location.href = "/room/"+jsonData.roomId+"/profile/"+jsonData.date+"/"+jsonData.startTime+"/"+jsonData.endTime+"/"+jsonData.heading;
        }
      }
      catch(e){
        console.log(e);
      }
    }
    
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeFunction);
    window.addEventListener("paste", this.pasteFunction);
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
    window.removeEventListener("paste", this.pasteFunction);
    if (navigator.platform.indexOf("Win") > -1 && ps){
      ps.destroy();
    }
  }

  render() {
    const { classes, ...rest } = this.props;
    const { userId, login, recommendMessage } = this.state;
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
            {...rest}
          />
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch>
                {
                  deepRoutes.map((prop, key) => {
                    if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                    return prop.path==="/room/:roomId/profile"?
                      <Route exact path={prop.path} key={key} render={ (props) => <prop.component userId={userId} {...props}/> } />
                      :
                      <Route exact path={prop.path} key={key} render={ (props) => <prop.component userId={userId} {...props}/> } />
                      ;
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
