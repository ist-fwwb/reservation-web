import React from "react";
// core components
import RoomSchedule from "components/RoomSchedule/RoomSchedule.jsx";

class RoomSchedulePage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userId: "12450"
    };
  }

  render(){
    let { roomId, roomLocation} = this.props.match.params;
    return(
      <div>
        <RoomSchedule roomId={roomId} roomLocation={roomLocation} userId={this.state.userId}/>
      </div>
    )
  }
}

export default RoomSchedulePage;