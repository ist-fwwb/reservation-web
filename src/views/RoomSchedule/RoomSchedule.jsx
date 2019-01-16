import React from "react";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { time } from 'variables/time.jsx';
import { Link } from "react-router-dom";

const data = [
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5c3dd232eb75240013cf20ee",
      null,
      null,
      null,
      null,
      "232eb75240013cf20ee",
      null,
      null,
      null,
      "2eb75240013cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "2753cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-16"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-17"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5c32eb75240013cf20ee",
      "5c32eb75240013cf20ee",
      "5c32eb75240013cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5c3dd3b752403cfee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "c3dd32eb5240013cf20e",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-18"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "c3dd232eb75240013cf20e",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5d2eb75240013cf0ee",
      "5d2eb75240013cf0ee",
      "5d2eb75240013cf0ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-19"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5240013cf20e",
      "5240013cf20e",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "0013cf20ee",
      "0013cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-20"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "cf20ee",
      "cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5ee",
      "5ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-21"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "7524001ee",
      "7524001ee",
      "7524001ee",
      "7524001ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": "2019-01-22"
  },
]

const colorList = ["#ff0000", "#ff8000", "#ffff00", "#40ff00", "#00ffff", "#0000ff", "#bf00ff"]
let colorMap = {};

function generateSchedule(start, end){
  let result = [];
  for (let i = start; i < end; i++){
    let t1 = i + ":00";
    let t2 = i + ":30";
    let t3 = (i+1) + ":00";
    result.push([t1 + "~" + t2]);
    result.push([t2 + "~" + t3]);
  }
  return result;
}

const schedule = generateSchedule(8, 18);

const button = <Button color="success">预定</Button>;

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function dataToRows(data){
  let re = [];
  for (let i in data){
    let ele = data[i];
    let day = (new Date(ele.date).getDay());
    if (day === 6 || day === 0)
      continue;
    let timeSlice = ele.timeSlice;
    for (let j in timeSlice){
      if (!re[j])
        re[j] = [0,0,0,0,0];
      if (!re[j][day-1])
        re[j][day-1] = {};
      if (timeSlice[j]===null){
        re[j][day-1]["occupied"] = false;
        re[j][day-1]["meetingid"] = null;
      }
      else {
        re[j][day-1]["occupied"] = true;
        re[j][day-1]["meetingid"] = timeSlice[j];
      }
      re[j][day-1]["date"] = ele.date;
    }
  }
  return re;
}

class RoomSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null,
      date: null
    };
  }

  handleClick = () => {
    alert('Click!');
  }

  render(){
    let colorCount = 0;
    let lastMeetingid = 0;
    const rows = dataToRows(data);
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader>
                <h3>{"会议室 " + this.props.match.params.roomid}</h3>
              </CardHeader>
              <CardBody>
                <Paper>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <CustomTableCell>时间</CustomTableCell>
                        <CustomTableCell align="right">{rows[0][0]["date"]}<br/>星期一</CustomTableCell>
                        <CustomTableCell align="right">{rows[0][1]["date"]}<br/>星期二</CustomTableCell>
                        <CustomTableCell align="right">{rows[0][2]["date"]}<br/>星期三</CustomTableCell>
                        <CustomTableCell align="right">{rows[0][3]["date"]}<br/>星期四</CustomTableCell>
                        <CustomTableCell align="right">{rows[0][4]["date"]}<br/>星期五</CustomTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, key) => {
                        // only display 8:00 ~ 18:00
                        if (key < 16 || key >= 36){
                          return null;
                        }

                        return(
                          <TableRow key={key}>
                            <CustomTableCell component="th" scope="row">
                              {time(key)+"~"+time(key+1)}
                            </CustomTableCell>
                            {
                              row.map((cell) => {
                                let bgcolor = null;
                                if (cell["occupied"]){
                                  let currentid = cell.meetingid;
                                  if (!colorMap[currentid]){
                                    colorMap[currentid] = colorList[colorCount];
                                    colorCount += 1;
                                    colorCount %= 7;
                                  }
                                  bgcolor = colorMap[currentid];
                                }
                                console.log(bgcolor)
                                return (
                                  <CustomTableCell align="right" bgcolor={bgcolor}>
                                  {
                                    cell["occupied"]?
                                      <Link to={"/meeting/"+cell["meetingid"]+"/profile"}>{cell["meetingid"].substring(0,5)+"..\n"}</Link>
                                      :
                                      <div onClick={this.handleClick}/>
                                  }
                                  </CustomTableCell>
                                )
                              })
                            }
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
export default RoomSchedule;