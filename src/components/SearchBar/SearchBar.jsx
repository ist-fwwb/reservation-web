import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import { utils_list } from 'variables/general.jsx';

import Search from "@material-ui/icons/Search";

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
  });

class SearchBar extends Component{
  constructor(props){
    super(props);

    this.state={
      location: null,
      size: "null",

      utils: [],
    }

    this.handleSearch = this.props.handleSearch;
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
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
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