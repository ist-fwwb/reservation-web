import React from "react";
// core components
import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";

class RoomSchedulePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render(){
    let { roomId, roomLocation} = this.props.match.params;
    return(
      <div>
        <RoomSchedule roomId={roomId} roomLocation={roomLocation} userId={this.props.userId}/>
      </div>
    )
  }
}

export default RoomSchedulePage;