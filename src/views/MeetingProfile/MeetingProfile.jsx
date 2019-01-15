import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Stars from '@material-ui/icons/Stars';
import Add from '@material-ui/icons/Add';

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

function meetingCardColor(status){
  if (status === "Pending")
    return "success"
  if (status === "Running")
    return "warning"
  if (status === "Cancelled")
    return "rose"
  if (status === "Stopped")
    return "info"
}

class MeetingProfile extends React.Component {
  state = {
    host: false,
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
    type: "COMMON",
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
    //const meetingid = this.props.match.params.meetingid
    const disabled = !this.state.host
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color={meetingCardColor(this.state.status)}>
                <h4 className={classes.cardTitleWhite}>{this.state.heading}</h4>
                <p className={classes.cardCategoryWhite}>{this.state.status}</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="发起人"
                      id="company-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: disabled,
                        value: this.state.hostId
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="日期"
                      id="username-disabled"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: disabled,
                        value: this.state.date
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="时间"
                      id="time"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "time",
                        disabled: disabled,
                        value: this.state.startTime + " ~ " + this.state.endTime
                      }}
                    /> 
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="会议室"
                      id="location"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "location",
                        disabled: disabled,
                        value: this.state.location
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="类型"
                      id="type"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "type",
                        disabled: disabled,
                        value: this.state.type
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="状态"
                      id="position"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "position",
                        disabled: disabled,
                        value: this.state.status
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
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
                  <GridItem xs={12} sm={12} md={12}>
                    <InputLabel style={{ color: "#AAAAAA" }}>会议简介</InputLabel>
                    <CustomInput
                      id="description"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: disabled,
                        name: "description",
                        value: this.state.description,
                        multiline: true,
                        rows: 5
                      }}
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