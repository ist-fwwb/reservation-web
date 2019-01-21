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

const historyMeetings = [{
  id: "0",
  attendantNum: "7",
  attendants: {},
  date: "2018-01-10",
  description: "whatever",
  endTime: "10:00",
  heading: "Meeting 1",
  hostId: "0",
  location: "508",
  needSignIn: false,
  roomId: "string",
  startTime: "10:30",
  status: "Pending",
  type: "COMMON"
  },
];
const attendMeetings = [
  {
    id: "4",
    attendantNum: "4",
    attendants: {},
    date: "2018-02-01",
    description: "whatever",
    endTime: "14:00",
    heading: "Meeting b",
    hostId: "1",
    location: "501",
    needSignIn: false,
    roomId: "string",
    startTime: "14:30",
    status: "Pending",
    type: "COMMON"
  },
  {
    id: "6",
    attendantNum: "3",
    attendants: {},
    date: "2018-02-03",
    description: "whatever description",
    endTime: "16:00",
    heading: "Meeting a",
    hostId: "2",
    location: "504",
    needSignIn: false,
    roomId: "string",
    startTime: "16:30",
    status: "Pending",
    type: "COMMON"
    }
];

const news = [
  ["温州皮革厂倒闭了", "2018-01-20"],
  ["温州皮革厂开业了", "2018-01-21"],
];

const notes = [
  ["Meeting a", "whatever"],
  ["Meeting b", "whatever"]
]

const joinButton = (id) => {
  return <Button color="success" size="sm">加入会议 {id}</Button>
}

function JSONToArray(jsonArray, type){
  let re = [];
  for (let i in jsonArray){
    let ele = jsonArray[i];
    if (type === "meeting" && ele.date !== today)
      continue
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
  
  componentDidMount(){
    fetch(meetingController.getMeetingByUserIdAndDate(this.props.userId, today),{
      credentials: 'include',
      method: 'get',
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({meetings: data})
    })
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
    let meetings = this.state.meetings;
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
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "时间", "状态"]}
                      tableData={meetings ? JSONToArray(meetings, "meeting") : []}
                    />
                  )
                },
                {
                  tabName: "加入会议",
                  tabIcon: LibraryAdd,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "日期", "时间", "操作"]}
                      tableData={JSONToArray(attendMeetings, "attend")}
                    />
                  )
                },
                {
                  tabName: "历史会议",
                  tabIcon: History,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["会议名称", "会议室", "日期", "时间"]}
                      tableData={JSONToArray(historyMeetings, "history")}
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