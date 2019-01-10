import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Assignment from "@material-ui/icons/Assignment";
import History from "@material-ui/icons/History";
import Table from "components/Table/Table.jsx";
import Button from '@material-ui/core/Button';

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
},]
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
},]

const exitButton = <Button variant="contained" color="secondary">退出会议</Button>;

function JSONToArray(jsonArray){
  let re = [];
  for (let i in jsonArray){
    let ele = jsonArray[i];
    let temp_ele = [];
    temp_ele.push(ele.id);
    temp_ele.push(ele.leader);
    temp_ele.push(ele.location);
    temp_ele.push(ele.date);
    temp_ele.push(ele.start + "~" + ele.end);
    re.push(temp_ele);
  }
  return re;
}

function JSONToArrayWithButton(jsonArray){
  let re = [];
  for (let i in jsonArray){
    let ele = jsonArray[i];
    let temp_ele = [];
    temp_ele.push(ele.id);
    temp_ele.push(ele.leader);
    temp_ele.push(ele.location);
    temp_ele.push(ele.date);
    temp_ele.push(ele.start + "~" + ele.end);
    temp_ele.push(exitButton);
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
                      tableData={JSONToArrayWithButton(meetings)}
                    />
                  )
                },
                {
                  tabName: "历史会议",
                  tabIcon: History,
                  tabContent: (
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["ID", "发起人", "会议室", "日期", "时间"]}
                      tableData={JSONToArray(historyMeetings)}
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