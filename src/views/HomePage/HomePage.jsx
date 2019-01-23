import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";

import Assignment from "@material-ui/icons/Assignment";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import FiberNew from "@material-ui/icons/FiberNew";
import History from "@material-ui/icons/History";
import Note from "@material-ui/icons/Note";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Done from "@material-ui/icons/Done";

import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import { meetingController, today } from "variables/general.jsx";
import { Link } from "react-router-dom";
import { idToTime } from "variables/general.jsx";

const news = [
  ["温州皮革厂倒闭了", "2018-01-20"],
  ["温州皮革厂开业了", "2018-01-21"],
];

const notes = [
  ["Meeting a", "whatever"],
  ["Meeting b", "whatever"]
]

const joinButton = (id) => {
  return <Button color="success" size="sm">加入会议</Button>
}

class HomePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      br: false,
      notificationMessage: "null",
      notificationType: null,

      meetings: null,
    }
  }

  JSONToArray = (jsonArray, type) => {
    let re = [];
    for (let i in jsonArray){
      let ele = jsonArray[i];
      if (type === "meeting" && ele.date !== today)
        continue;
      if (type === "meeting" && !(ele.status === "Pending" || ele.status === "Running"))
        continue;
      if (type === "attend" && (ele.status !== "Pending" || ele.hostId === this.props.userId))
        continue;
      let temp_ele = [];
  
      temp_ele.push(<Link to={"/meeting/"+ele.id+"/profile"}>{ele.heading}</Link>)
      temp_ele.push(<Link to={"/room/"+ele.id+"/profile"}>{ele.location}</Link>);
      if (type !== "meeting")
        temp_ele.push(ele.date);
      temp_ele.push(idToTime(ele.startTime) + "~" + idToTime(ele.endTime));
      if (type === "meeting")
        temp_ele.push(ele.status);
      else if (type === "attend")
        temp_ele.push([joinButton(ele.id)])
      re.push(temp_ele);
    }
    return re;
  }
  
  componentDidMount(){
    let api = meetingController.getMeetingByUserIdAndDate(this.props.userId, today);
    fetch(api,{
      credentials: 'include',
      method: 'get',
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({meetings: data})
    })
    .catch(e => {console.log(e); this.setState({error: true}); this.warning(e);})

    let api2 = meetingController.getMeetingByDateAndRoomIdAndStatus(null, null, "Pending");
    fetch(api2, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error){
        this.setState({error: true});
        this.warning(data.error);
      }
      else
        this.setState({
          attendMeetings: data
        });
    })
    .catch(e => {console.log(e); this.setState({error: true}); this.warning(e);})

    let api3 = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Cancelled");
    fetch(api3, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error){
        this.setState({error: true});
        this.warning(data.error);
      }
      else
        this.setState({
          historyCancelledMeetings: data
        });
    })
    .catch(e => {console.log(e); this.setState({error: true}); this.warning(e);})

    let api4 = meetingController.getMeetingByUserIdAndStatus(this.props.userId, "Stopped");
    fetch(api4, {
      credentials: 'include',
      method: 'get'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error){
        this.setState({error: true});
        this.warning(data.error);
      }
      else
        this.setState({
          historyStoppedMeetings: data
        });
    })
    .catch(e => {console.log(e); this.setState({error: true}); this.warning(e);})
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

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    })
    this.showNotification("br");
  }

  render(){
    if (this.state.error)
      return <h2>Network Error</h2>
    let { meetings, attendMeetings, historyCancelledMeetings, historyStoppedMeetings } = this.state;
    let historyMeetings = historyCancelledMeetings; 
    console.log(historyMeetings)
    let historyLoaded = false;
    if ( historyCancelledMeetings && historyStoppedMeetings){
      historyLoaded = true;
      historyMeetings = historyMeetings.concat(historyStoppedMeetings);
    }
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
                    <Table
                    tableHeaderColor="primary"
                    tableHead={["标题", "日期"]}
                    tableData={news}
                  />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title={null}
              style={{background:"#000"}}
              headerColor="danger"
              tabs={[
                {
                  tabName: "今日会议",
                  tabIcon: Assignment,
                  tabContent: (
                    ! meetings ? null : 
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "时间", "状态"]}
                      tableData={meetings ? this.JSONToArray(meetings, "meeting") : []}
                    />
                  )
                },
                {
                  tabName: "加入会议",
                  tabIcon: LibraryAdd,
                  tabContent: (
                    ! attendMeetings ? null :
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "日期", "时间", "操作"]}
                      tableData={this.JSONToArray(attendMeetings, "attend")}
                    />
                  )
                },
                {
                  tabName: "历史会议",
                  tabIcon: History,
                  tabContent: (
                    ! historyLoaded ? null :
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "日期", "时间"]}
                      tableData={this.JSONToArray(historyMeetings, "history")}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
                title={null}
                style={{background:"#000"}}
                headerColor="danger"
                tabs={[
                  {
                    tabName: "会议笔记",
                    tabIcon: Note,
                    tabContent: (
                      <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "笔记内容"]}
                      tableData={notes}
                    />
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
export default HomePage;