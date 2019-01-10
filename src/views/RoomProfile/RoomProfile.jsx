import React from "react";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Tasks from "components/Tasks/Tasks.jsx";

const content = [
  "空调",
  "投影仪"
]

class RoomProfile extends React.Component {
  render(){
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4>{"会议室 " + this.props.match.params.roomid}</h4>
              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
export default RoomProfile;