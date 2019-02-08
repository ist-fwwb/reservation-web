import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";

import CardActions from '@material-ui/core/CardActions';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import { utils_list, roomController } from 'variables/general.jsx';

import Search from "@material-ui/icons/Search";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      minWidth: 100,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      minWidth: 100,
    },

    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    cardTitle: {
      color: "#3C4858",
      marginRight: "100px"
    },
  });

class SearchBar extends Component{
  constructor(props){
    super(props);

    this.state={
      location: null,
      size: "null",

      utils: [],
      expanded: false,
    }
    this.handleError = this.props.handleError;
    this.handleSuccess = this.props.handleSuccess;
    this.handleSearchChange = this.props.handleSearchChange;
  }

  handleSearch = (e) => {
    e.preventDefault();
    let { location, size, utils } = this.state;
    size = size==="null" ? null : size;
    
    let api = roomController.searchRoomByLocationAndSizeAndUtils(location, size, utils);
    console.log(api);
    fetch(api, {
      method: 'get',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      if (data.error){
        this.handleError("搜索失败");
        console.log(data.error);
        return;
      }
      this.handleSearchChange(data);
    })
    .catch(e => console.log(e))
  }

  handleChange = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }

  handleChangeCheckBox = event => {
    event.preventDefault();
    let { utils } = this.state;
    if (event.target.checked){
      utils.push(event.target.name);
    }
    else{
      utils.splice(utils.indexOf(event.target.name), 1);
    }
    this.setState({ utils });
  }; 

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render = () => {
    const { classes } = this.props;
    const { utils } = this.state;
    return(
      <div className="SearchBar-container">
      <Card>
        <CardHeader 
          color="info" stats icon
        >
          <CardIcon color="info">
            {<Search/>}
          </CardIcon>
        </CardHeader>
        <CardBody>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
            <div>展开搜索栏</div>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
              <form className={classes.container} noValidate autoComplete="off">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <TextField
                          label="地点"
                          name="location"
                          fullWidth
                          onChange={this.handleChange}
                          className={classes.textField}
                          value={this.state.location}
                          margin="normal"
                          variant="outlined"
                        />
                      </td>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </td>
                      <td>
                        <TextField
                          select
                          fullWidth
                          name="size"
                          label="大小"
                          className={classes.textField}
                          value={this.state.size}
                          onChange={this.handleChange}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                          margin="normal"
                          variant="outlined"
                        >
                          <MenuItem key={"BIG"} value={"BIG"}>
                            大
                          </MenuItem>
                          <MenuItem key={"MIDDLE"} value={"MIDDLE"}>
                            中
                          </MenuItem>
                          <MenuItem key={"SMALL"} value={"SMALL"}>
                            小
                          </MenuItem>
                          <MenuItem key={"null"} value={"null"}>
                            无
                          </MenuItem>
                        </TextField>
                      </td>
                      <td>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                      </td>
                      <td>
                        <Button onClick={this.handleSearch} color="primary" variant="contained">搜索</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card>
                  <CardBody>
                    <Typography>
                      设备要求
                    </Typography>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormGroup row>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={utils_list.airconditioner}
                                checked={utils.includes(utils_list.airconditioner)}
                                onChange={this.handleChangeCheckBox}
                                color="primary"
                              />
                            }
                            label="空调"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={utils_list.blackboard}
                                checked={utils.includes(utils_list.blackboard)}
                                onChange={this.handleChangeCheckBox}
                                color="primary"
                              />
                            }
                            label="黑板"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={utils_list.table}
                                checked={utils.includes(utils_list.table)}
                                onChange={this.handleChangeCheckBox}
                                color="primary"
                              />
                            }
                            label="桌子"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={utils_list.projector}
                                checked={utils.includes(utils_list.projector)}
                                onChange={this.handleChangeCheckBox}
                                color="primary"
                              />
                            }
                            label="投影仪"
                          />
                        </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormGroup row>
                      <FormControlLabel
                            control={
                              <Checkbox
                                name={utils_list.power}
                                checked={utils.includes(utils_list.power)}
                                onChange={this.handleChangeCheckBox}
                                color="primary"
                              />
                            }
                            label="电源"
                          />
                      <FormControlLabel
                          control={
                            <Checkbox
                              name={utils_list.wifi}
                              checked={utils.includes(utils_list.wifi)}
                              onChange={this.handleChangeCheckBox}
                              color="primary"
                            />
                          }
                          label="无线网络"
                        />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={utils_list.network}
                            checked={utils.includes(utils_list.network)}
                            onChange={this.handleChangeCheckBox}
                            color="primary"
                          />
                        }
                        label="有线网络"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={utils_list.tv}
                            checked={utils.includes(utils_list.tv)}
                            onChange={this.handleChangeCheckBox}
                            color="primary"
                          />
                        }
                        label="电视"
                      />
                    </FormGroup>
                    </FormControl>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </Collapse>
        </CardBody>
      </Card>
      </div>
    )
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);