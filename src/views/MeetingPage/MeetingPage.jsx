import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Assignment from "@material-ui/icons/Assignment";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import History from "@material-ui/icons/History";
import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import { Link } from "react-router-dom";


const historyMeetings = [{
  id: 0,
  leader: "Sth else",
  location: "501",
  date: "2019-01-01",
  start: "10:00",
  end: "12:00"
},{
  id: 1,
  leader: "Whoever",
  location: "501",
  date: "2019-01-02",
  start: "13:00",
  end: "14:00"
},];
const attendMeetings = [{
  id: 4,
  leader: "Wha",
  location: "501",
  date: "2019-02-02",
  start: "10:00",
  end: "12:00"
},{
  id: 5,
  leader: "Som",
  location: "502",
  date: "2019-02-03",
  start: "13:00",
  end: "14:00"
},];
const meetings = [{
  id: 2,
  leader: "Whatever",
  location: "501",
  date: "2019-02-01",
  start: "10:00",
  end: "12:00"
},{
  id: 3,
  leader: "Somebody",
  location: "501",
  date: "2019-02-02",
  start: "13:00",
  end: "14:00"
},];

const exitButton = (id) => {
  return <Button color="danger" size="sm">退出会议 {id}</Button>;
} 

const manageButton = (id) => {
  return <Button color="success" size="sm">管理会议 {id}</Button>
}

const checkButtons = (id) => {
  return <Button color="info" size="sm">查看会议 {id}</Button>
}

const joinButton = (id) => {
  return <Button color="success" size="sm">加入会议 {id}</Button>
}

function handleExit(id) {
  return;
}

function JSONToArray(jsonArray, type){
  let re = [];
  for (let i in jsonArray){
    let ele = jsonArray[i];
    let temp_ele = [];
    temp_ele.push(ele.id);
    temp_ele.push(ele.leader);
    temp_ele.push(<Link to={"/room/"+ele.location+"/profile"}>{ele.location}</Link>);
    temp_ele.push(ele.date);
    temp_ele.push(ele.start + "~" + ele.end);
    if (type === "meeting")
      temp_ele.push([manageButton(ele.id), "\t", exitButton(ele.id)]);
    else if (type === "history")
      temp_ele.push([checkButtons(ele.id)])
    else if (type === "attend")
      temp_ele.push([checkButtons(ele.id), "\t", joinButton(ele.id)])
    re.push(temp_ele);
  }
  return re;
}

class MeetingPage extends React.Component {
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Tasks:"
              headerColor="rose"
              tabs={[
                {
                  tabName: "待办会议",
                  tabIcon: Assignment,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["ID", "发起人", "会议室", "日期", "时间", "操作"]}
                      tableData={JSONToArray(meetings, "meeting")}
                    />
                  )
                },
                {
                  tabName: "加入会议",
                  tabIcon: LibraryAdd,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["ID", "发起人", "会议室", "日期", "时间", "操作"]}
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
                      tableHead={["ID", "发起人", "会议室", "日期", "时间", "操作"]}
                      tableData={JSONToArray(historyMeetings, "history")}
                    />
                  )
                }
              ]}
            />
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default MeetingPage;