const prefix = "http://";
const domain = "www.test.com";
const port = "31000";
const server = prefix + domain + ":" + port;

const dateToString = (date) => (date.toLocaleDateString([],{year:"numeric", month:"2-digit", day:"numeric"}).replace(/\//g,'-'));
const today = dateToString(new Date());

const nextDay = (day) => {
  let result = new Date(day);
  result.setDate(result.getDate()+1);
  return dateToString(result);
}

const idToTime = (id) => {
  if (id % 2 === 0)
      return String(id / 2) + ":00";
  else
      return String((id - 1 ) / 2) + ":30";
}

const timeToId = (time) => {
  let li = time.split(':');
  return Number(li[0]) * 2 + (Number(li[1]) === 30 ? 1 : 0);
}

const roomController = {
  "getRoom": () => (server + "/meetingroom" ),
  "getRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId),
  "createRoom": () => (server + "/meetingroom"), // json params in req body
  "editRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId), // json params in req body
  "deleteRoomByRoomId": (roomId) => (server + "/meetingroom/" + roomId),
};
const timeSliceController = {
  "getTimeSilceByDateAndRoomId": (date, roomId) => (server + "/timeSlice?date=" + date + "&roomId=" + roomId),
  "getTimeSilceByRoomId": (roomId) => (server + "/timeSlice?roomId=" + roomId),
};

const meetingController = {
  "getMeeting": () => (server + "/meeting"),
  "getMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  "getMeetingByDateAndRoomIdAndStatus": (date, roomId, status) => {
    let dateStr = date ? "date="+date+"&" : null;
    let roomIdStr = roomId ? "roomId="+roomId+"&" : null;
    let statusStr = status ? "status="+status+"&" : null;
    let api = server + "/meeting?"+dateStr + roomIdStr + statusStr;
    return api;
  },
  "createMeeting": () => (server + "/meeting"), // json params in req body
  "editMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId), //json params in req body
  "deleteMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  "cancelMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId + "/status/Cancelled"),
  //"attendMeetingByMeetingId": (meetingId, userId) => (server + "/meeting/" + meetingId + "/attendants?userId=" + userId),
  "attendMeetingByAttendantNum": (attendantNum, userId) => (server + "/meeting/" + attendantNum + "/attendants?userId=" + userId),
  "exitMeetingByMeetingId": (meetingId , userId) => (server +"/meeting/" + meetingId + "/attendants/" + userId),
  "getMeetingByUserIdAndDate": (userId, date) => (server + "/user/" + userId + "/meeting?date=" + date),
  "getMeetingByUserIdAndStatus": (userId, status) => (server + "/user/" + userId + "/meeting?status=" + status),
  "getMeetingByUserIdAndDateAndStatus": (userId, date, status) => (server + "/user/" + userId + "/meeting?status=" + status + "&date=" + date),
};

const userController = {
  "getUserByIds":(ids) => {
    let idsStr = "ids=";
    let del = "%2C";
    ids.map(id => idsStr += (id + del));
    idsStr = idsStr.substring(0, idsStr.length - 3);
    let api = server + "/user?" + idsStr;
    return api;
  },
  "getUser": (type=null) => (type?(server + "/user?type=" + type):(server + "/user")),
  "register": () => (server + "/user"), //json params in req body
  "login": (tel, password) => (server + "/user/login?phone=" + tel + "&password=" + password),
  "getUserByUserId": (userId) => (server + "/user/" + userId),
  "editUser": (userId) => (server + "/user/" + userId),
};

const quickSort = (origArray, valueName=null) => {
	if (origArray.length <= 1) { 
		return origArray;
	} else {

		let left = [];
		let right = [];
		let newArray = [];
		let pivot = origArray.pop();
		let length = origArray.length;

		for (var i = 0; i < length; i++) {
      if (!valueName){
        if (origArray[i] <= pivot) {
          left.push(origArray[i]);
        } else {
          right.push(origArray[i]);
        }
      }
      else {
        if (origArray[i][valueName] <= pivot[valueName]) {
          left.push(origArray[i]);
        } else {
          right.push(origArray[i]);
        }
      }
			
		}

		return newArray.concat(quickSort(left), pivot, quickSort(right));
	}
}

function ScheduleDataToRows(data){
  let re = [];
  for (let i in data){
    let ele = data[i];
    let nameMap = ele.meetingNames;
    let day = (new Date(ele.date).getDay());
    if (day === 6 || day === 0)
      continue;
    let timeSlice = ele.timeSlice;
    for (let j in timeSlice){
      if (!re[j])
        re[j] = [0,0,0,0,0];
      if (!re[j][day-1])
        re[j][day-1] = {};
      if (timeSlice[j]===null){
        re[j][day-1]["occupied"] = false;
        re[j][day-1]["meetingid"] = null;
      }
      else {
        re[j][day-1]["occupied"] = true;
        re[j][day-1]["meetingid"] = timeSlice[j];
        re[j][day-1]["name"] = nameMap[timeSlice[j]];
      }
      re[j][day-1]["date"] = ele.date;
      re[j][day-1]["click"] = false;
      re[j][day-1]["between"] = false;
      re[j][day-1]["original"] = false;
    }
  }
  return re;
}

module.exports = {
  idToTime,
  timeToId,
  today,
  nextDay,
  roomController,
  timeSliceController,
  meetingController,
  userController,
  quickSort,
  ScheduleDataToRows,
};
