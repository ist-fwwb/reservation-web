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
      "5c3dd232eb75240013cf20ee",
      null,
      null,
      null,
      "5c3dd232eb75240013cf20ee",
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
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
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
      "5c3dd232eb75240013cf20ee",
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
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
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
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
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
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
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
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
      "5c3dd232eb75240013cf20ee",
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
        re[j] = {};
      if (!re[j][day])
        re[j][day] = {};
      if (timeSlice[j]===null){
        re[j][day]["occupied"] = false;
        re[j][day]["meetingid"] = null;
      }
      else {
        re[j][day]["occupied"] = true;
        re[j][day]["meetingid"] = timeSlice[j];
      }
      re[j][day]["date"] = ele.date;
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

  render(){
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
                        <CustomTableCell align="right">星期一</CustomTableCell>
                        <CustomTableCell align="right">星期二</CustomTableCell>
                        <CustomTableCell align="right">星期三</CustomTableCell>
                        <CustomTableCell align="right">星期四</CustomTableCell>
                        <CustomTableCell align="right">星期五</CustomTableCell>
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
                            <CustomTableCell align="right" bgcolor={row[1]["occupied"]?"#FF0000":null}>
                            {
                              row[1]["occupied"]?<Link to={"/meeting/"+row[1]["meetingid"]+"/profile"}>{row[1]["meetingid"].substring(0,5)+"..\n"}</Link>:null
                            }
                            </CustomTableCell>
                            <CustomTableCell align="right" bgcolor={row[2]["occupied"]?"#FF0000":null}>
                            {
                              row[2]["occupied"]?<Link to={"/meeting/"+row[2]["meetingid"]+"/profile"}>{row[2]["meetingid"].substring(0,5)+"..\n"}</Link>:null
                            }
                            </CustomTableCell>
                            <CustomTableCell align="right" bgcolor={row[3]["occupied"]?"#FF0000":null}>
                            {
                              row[3]["occupied"]?<Link to={"/meeting/"+row[3]["meetingid"]+"/profile"}>{row[3]["meetingid"].substring(0,5)+"..\n"}</Link>:null
                            }
                            </CustomTableCell>
                            <CustomTableCell align="right" bgcolor={row[4]["occupied"]?"#FF0000":null}>
                            {
                              row[4]["occupied"]?<Link to={"/meeting/"+row[4]["meetingid"]+"/profile"}>{row[4]["meetingid"].substring(0,5)+"..\n"}</Link>:null
                            }
                            </CustomTableCell>
                            <CustomTableCell align="right" bgcolor={row[5]["occupied"]?"#FF0000":null}>
                            {
                              row[5]["occupied"]?<Link to={"/meeting/"+row[5]["meetingid"]+"/profile"}>{row[5]["meetingid"].substring(0,5)+"..\n"}</Link>:null
                            }
                            </CustomTableCell>
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