import React from "react";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Table from "components/Table/Table.jsx";

function generateSchedule(start, end){
  let result = [];
  for (let i = start; i < end; i++){
    let t1 = i + ":00";
    let t2 = i + ":30";
    let t3 = (i+1) + ":00";
    result.push([t1 + "~" + t2]);
    result.push([t2 + "~" + t3]);
  }
  return result;
}

const schedule = generateSchedule(8, 18);

const button = <Button color="success">预定</Button>;

class RoomDetail extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tl: false,
      tc: false,
      tr: false,
      bl: false,
      bc: false,
      br: false
    };
  }
  // to stop the warning of calling setState of unmounted component
  componentWillUnmount() {
    var id = window.setTimeout(null, 0);
    while (id--) {
      window.clearTimeout(id);
    }
  }
  showNotification(place) {
    var x = [];
    x[place] = true;
    this.setState(x);
    this.alertTimeout = setTimeout(
      function() {
        x[place] = false;
        this.setState(x);
      }.bind(this),
      6000
    );
  }
  render(){
    return(
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="success">
                <h4>{"会议室 " + this.props.match.params.roomid}</h4>
                <p>
                  预约情况
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="primary"
                  tableHead={["时间", "星期一", "星期二", "星期三", "星期四", "星期五"]}
                  tableData={schedule}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}
export default RoomDetail;