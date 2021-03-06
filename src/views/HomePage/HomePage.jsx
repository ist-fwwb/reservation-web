import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import Assignment from "@material-ui/icons/Assignment";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import FiberNew from "@material-ui/icons/FiberNew";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";
import DateRange from "@material-ui/icons/DateRange";

import Slider from "react-slick";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import Table from "components/Table/Table.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Calendar from "components/Calendar/Calendar";

import { meetingController, idToTime, today } from "variables/general.jsx";
import { Link, Redirect } from "react-router-dom";

const slidesSettings = {
  dots: true,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1
};

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dates: [],

      br: false,
      notificationMessage: "null",
      notificationType: null,

      error: false,
      
      redirect: false,
      redirect_url: '/',
    }
  }


  pasteFunction = (event) => {
    if(event.clipboardData){
      let text = event.clipboardData.getData('text/plain');
      this.setState({
        redirect: true,
        redirect_url: "/smart-reserve/"+text,
      })
    } 
  }

  JSONToArray = (jsonArray) => {
    let re = [];
    for (let i in jsonArray){
      let ele = jsonArray[i];
      if (!(ele.status === "Pending" || ele.status === "Running"))
        continue;

      let temp_ele = [];
  
      temp_ele.push(<Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading}</Link>)
      temp_ele.push(<Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link>);
      temp_ele.push(idToTime(ele.startTime) + "~" + idToTime(ele.endTime));
      temp_ele.push(ele.status);
      re.push(temp_ele);
    }
    return re;
  }
  
  componentDidMount(){
    window.addEventListener("paste", this.pasteFunction);

    let api = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Pending");
    fetch(api, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      let todayMeetings = [];
      let dates = [];
      for (let i in data){
        let date = data[i].date;
        if (date === today)
          todayMeetings.push(date);
        if (!dates.includes(date))
          dates.push(date);
      }

      this.setState({
        todayMeetings,
        dates,
      })
    })
    .catch(e => console.log(e))
  }

  componentWillUnmount() {
    window.removeEventListener("paste", this.pasteFunction);
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }

  showNotification = () => {
    this.setState({br: true});
    this.alertTimeout = setTimeout(
      function() {
        this.setState({br: false});
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
    })
    this.showNotification();
  }

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    })
    this.showNotification();
  }

  handleChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]:e.target.value});
  }

  handleAttend = () => {
    let api = meetingController.attendMeetingByAttendantNum(this.state.attendantNum, this.props.userId);
    fetch(api,{
      credentials: 'include',
      method: 'post'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error){
        this.warning("加入失败");
      }
      else {
        this.success("加入成功");
        if (data.date === today){
          let { todayMeetings } = this.state;
          todayMeetings.push(data);
          this.setState({
            todayMeetings,
            attendantNum: ""
          });
        }
        
      }
    })
  }

  render(){
    if (this.state.redirect){
      return <Redirect to={this.state.redirect_url}/>
    }
    
    if (this.state.error)
      return <h2>Network Error</h2>
    let { todayMeetings } = this.state;
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title={null}
              style={{background:"#000"}}
              headerColor="danger"
              tabs={[
                {
                  tabName: "公司新闻",
                  tabIcon: FiberNew,
                  tabContent: (
                    <div>
                      <Slider {...slidesSettings}>
                        <div style={{ 
                            maxWidth: '100%',
                            height: 0,
                            paddingBottom: '40%',
                            overflow: 'hidden',
                          }}>
                          <img width="100%" alt="img" src={"https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} />
                        </div>
                        <div style={{ 
                            maxWidth: '100%',
                            height: 0,
                            paddingBottom: '40%',
                            overflow: 'hidden',
                          }}
                        >
                          <img width="100%" alt="img" src={"https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} />
                        </div>
                      </Slider>
                      <br/>
                    </div>
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title={null}
              style={{background:"#000"}}
              headerColor="danger"
              tabs={[
                {
                  tabName: "会议日程",
                  tabIcon: DateRange,
                  tabContent: (
                    <div style={{backgroundColor: null}}>
                    <Calendar 
                      selected={this.state.dates} 
                      showHeader={false}
                      accentColor='#00C1A6'
                      accentColor2='#f48fb1'
                    />
                    </div>
                  )
                },
                {
                  tabName: "今日会议",
                  tabIcon: Assignment,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "时间", "状态"]}
                      tableData={todayMeetings ? this.JSONToArray(todayMeetings) : []}
                    />
                      
                  )
                },
                {
                  tabName: "快速加入",
                  tabIcon: LibraryAdd,
                  tabContent: (
                    <div>
                      
                      <TextField
                        fullWidth
                        label="四位数字"
                        name="attendantNum"
                        value={this.state.attendantNum}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                      />
                      <Button color="primary" onClick={this.handleAttend}>加入</Button>
                    </div>
                  )
                },
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
export default HomePage;