import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class RoomLink extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

  render (){
    const { classes } = this.props;
    const { open } = this.state;
    const location = this.props.location;
    return (
      <div className={classes.root}>
        <Button
          className={classes.root}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {location}
        </Button>
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={this.handleClose}>
                  <MenuList>
                    <MenuItem><Link to={"/room/"+location+"/schedule"} style={{fontSize:'5px'}}>日程安排</Link></MenuItem>
                    <MenuItem><Link to={"/room/"+location+"/profile"} style={{fontSize:'5px'}}>基本信息</Link></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    )
  }
}
RoomLink.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomLink);