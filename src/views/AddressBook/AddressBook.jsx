import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

import Person from '@material-ui/icons/Person';

import { userController } from 'variables/general.jsx';
import UserProfile from 'components/UserProfile/UserProfile.jsx';

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing.unit * 2,
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
});

class AddressBook extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        error: false,
        loaded: false,

        users: null,
        selectedId: null, 
      };
  }

  componentDidMount(){
    let api = userController.getUser();
    fetch(api, {
      method:'get',
      credentials:'include'
    })
    .then(res => res.json())
    .then((data) => {
      if (data.error){
        console.log(data.error);
        this.setState({error: true});
        return;
      }
      this.setState({
        users: data,
        loaded: true,
        selectedId: data?data[0].id:null
      });
    })
    .catch((error) => {
      this.setState({error: true});
      console.log(error);
    })
  }

  handleListItemClick = (event, id) => {
    event.preventDefault();
    this.setState({ selectedId: id });
  };

  render(){
    const { classes } = this.props;
    if (this.state.error){
      return <h2>Error</h2>
    }
    return (
      <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid container item xs={12} spacing={24}>
          <Fragment>
            <Grid item xs={4}>
              <Paper square className={classes.paper}>
                <Typography className={classes.text} variant="h5" gutterBottom>
                  通讯录
                </Typography>
                <List className={classes.list}>
                  { !this.state.loaded || !this.state.users || !this.state.selectedId ? null : 
                    this.state.users.map(({ id, name, phone }) => (
                    <Fragment key={id}>
                      <ListItem 
                        button 
                        onClick={event => this.handleListItemClick(event, id)}
                        selected={this.state.selectedId === id}
                        >
                        <Avatar alt="Profile Picture">
                          <Person/>
                        </Avatar>
                        <ListItemText primary={name} secondary={phone} />
                      </ListItem>
                    </Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={8}>
              { !this.state.loaded || !this.state.users || !this.state.selectedId ? null :
                <UserProfile userId={this.state.selectedId} disabled={true}/>
              }
            </Grid>
          </Fragment>
        </Grid>
      </Grid>
    </div>
      
    )
  }
}
AddressBook.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddressBook)