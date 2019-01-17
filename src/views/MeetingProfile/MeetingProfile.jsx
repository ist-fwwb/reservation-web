import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Stars from '@material-ui/icons/Stars';
import Add from '@material-ui/icons/Add';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import Button from "components/CustomButtons/Button.jsx";

class MeetingProfile extends React.Component {
  state = {
    host: true,
    id: "0",
    attendantNum: "7",
    date: "2018-01-10",
    description: "whatever",
    endTime: "10:00",
    heading: "Meeting 1",
    hostId: "0",
    location: "508",
    needSignIn: false,
    roomId: "string",
    startTime: "10:30",
    status: "Cancelled",
    type: "URGENT",
    attendants: [
      { name: "汪汪汪", host: true},
      { name: "是是是"},
      { name: "啊啊啊"}
    ]
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  render(){
    const { classes } = this.props;
    const meetingid = this.props.match.params.meetingid
    const disabled = !this.state.host
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader 
                style={{background:"#000"}}
                color="danger"
              >
                <h4 className={classes.cardTitleWhite}>{this.state.heading}</h4>
                <p className={classes.cardCategoryWhite}>{meetingid + "\n" + this.state.status}</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="发起人"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={this.state.hostId}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="状态"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={this.state.status}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      error={this.state.type==="URGENT"}
                      select
                      disabled={disabled}
                      fullWidth
                      name="type"
                      label="会议类型"
                      className={classes.textField}
                      value={this.state.type}
                      onChange={this.handleChange}
                      SelectProps={{
                        MenuProps: {
                          className: classes.menu,
                        },
                      }}
                      margin="normal"
                      variant="outlined"
                    >
                      <MenuItem key={"COMMON"} value={"COMMON"}>
                        普通
                      </MenuItem>
                      <MenuItem key={"URGENT"} value={"URGENT"}>
                        紧急
                      </MenuItem>
                    </TextField>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="会议室"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={this.state.location}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <TextField
                      label="日期"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={this.state.date}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <TextField
                      label="时间"
                      disabled
                      fullWidth
                      className={classes.textField}
                      value={this.state.startTime + " ~ " + this.state.endTime}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <Card>
                      <CardBody>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                          参会人员
                        </Typography>
                          {this.state.attendants.map((data, key) => {
                            let hostIcon = <Stars/>
                            return (
                                <Chip
                                  key={key}
                                  icon={data.host?hostIcon:null}
                                  label={data.name}
                                  className={classes.chip}
                                />
                            );
                          })}
                          {
                            disabled?null:
                            <IconButton color="primary" className={classes.button} component="span">
                              <Add/>
                            </IconButton>
                          }
                      </CardBody>
                    </Card>
                    
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={11}>
                    <TextField
                      label="会议简介"
                      multiline
                      fullWidth
                      rows="4"
                      value={this.state.description}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              {
                disabled ? null :
                  <CardFooter>
                    <Button color="primary">确认修改</Button>
                  </CardFooter>
              
              }
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
export default withStyles(dashboardStyle)(MeetingProfile);