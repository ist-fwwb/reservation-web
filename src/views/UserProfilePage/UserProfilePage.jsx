import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import UserProfile from 'components/UserProfile/UserProfile.jsx';
// core components
const styles = theme => {};
class UserProfilePage extends React.Component {
  constructor(props){
    super(props);
    this.state={
    };
  }

  render(){
    const disabled = !(this.props.userId === this.props.match.params.userId);
    return (
      <div>
        <UserProfile userId={this.props.match.params.userId} disabled={disabled}/>
      </div>
    );
  }
}

export default withStyles(styles)(UserProfilePage);
