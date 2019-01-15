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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const data = [
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
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
      null,
      null,
      null,
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
      null,
      null,
      null,
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
      null,
      null,
      null,
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
    "date": "2019-01-18"
  },
  {
    "id": "5c38b1cc4fc69d001339a7f2",
    "roomId": "5c38b1cc4fc69d001339a7ec",
    "timeSlice": [
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
      null,
      null,
      null,
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
      null,
      null,
      null,
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
      null,
      null,
      null,
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
      null,
      null,
      null,
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

function dataToRows(data){
  let re = [];
  for (let i in data){
    let ele = data[i];
    let day = (new Date(ele.date).getDay());
    if (day === 6 || day === 0)
      continue
    let timeSlice = ele.timeSlice;
    for (let j in timeSlice){
      if (!re[j])
        re[j] = {}
      if (timeSlice[j]===null)
        re[j][day] = "False"
      else 
        re[j][day] = "True"
    }
  }
  return re
}

class RoomSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    const rows = dataToRows(data);
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4>{"会议室 " + this.props.match.params.roomid}</h4>
                <p>
                  预约情况
                </p>
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
                      {rows.map((row, key) => (
                        <TableRow key={key}>
                          <CustomTableCell component="th" scope="row">
                            {key}
                          </CustomTableCell>
                          <CustomTableCell align="right">{row[1]}</CustomTableCell>
                          <CustomTableCell align="right">{row[2]}</CustomTableCell>
                          <CustomTableCell align="right">{row[3]}</CustomTableCell>
                          <CustomTableCell align="right">{row[4]}</CustomTableCell>
                          <CustomTableCell align="right">{row[5]}</CustomTableCell>
                        </TableRow>
                      ))}
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