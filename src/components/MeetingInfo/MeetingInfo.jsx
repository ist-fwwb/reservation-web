import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from "@material-ui/core/TextField";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const CustomTableCell = withStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}))(TableCell);

class MeetingInfo extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      rows:[],
    }
  }

  render(){
    const { classes } = this.props;
    let foreignGuest;
    if(this.props.foreignGuestList === null)
      foreignGuest = (
          <div>
            <br />
            <span style={{fontSize:"16px", marginLeft:"2%"}}>无外宾参加</span>
          </div>
      )
    else
      foreignGuest = (
          <Card>
            <CardHeader style={{fontSize:"16px", color:"#616161"}}>
              外宾信息
            </CardHeader>
            <CardBody>
              <Table>
                <TableHead>
                  <TableRow>
                    <CustomTableCell  style={{width:"30%", fontSize:"20px", fontWeight:"700", color:"#8d6e63", textAlign:"center"}}>姓名</CustomTableCell>
                    <CustomTableCell  style={{width:"30%", fontSize:"20px", fontWeight:"700", color:"#8d6e63", textAlign:"center"}}>联系电话</CustomTableCell>
                    <CustomTableCell  style={{width:"30%", fontSize:"20px", fontWeight:"700", color:"#8d6e63", textAlign:"center"}}>进入码</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.foreignGuestList.map(row => {
                    return (
                        <TableRow>
                          <CustomTableCell style={{width:"30%", fontSize:"18px", textAlign:"center"}}>{row.name}</CustomTableCell>
                          <CustomTableCell style={{width:"30%", fontSize:"18px", textAlign:"center"}}>{row.phone}</CustomTableCell>
                          <CustomTableCell style={{width:"30%", fontSize:"18px", textAlign:"center"}}>{row.uuid}</CustomTableCell>
                        </TableRow>
                    )})}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
      )
    return (
        <div>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议标题"
                  name="heading"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.heading}
                  margin="normal"
                  variant="outlined"

              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <TextField
                  label="会议描述"
                  name="description"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.description}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议时间"
                  name="time"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.time}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="场所"
                  name="location"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.location}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="发起人"
                  name="hostname"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.hostname}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议类型"
                  name="type"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.type}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议状态"
                  name="type"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.status}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="是否签到"
                  name="needSignIn"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.needSignIn}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <TextField
                  label="与会人员"
                  name="attendants"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.attendants}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              {foreignGuest}
            </GridItem>
          </GridContainer>
        </div>
    )
  }
}

export default withStyles(styles)(MeetingInfo);