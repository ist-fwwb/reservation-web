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
  "createMeeting": () => (server + "/meeting"), // json params in req body
  "editMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId), //json params in req body
  "deleteMeetingByMeetingId": (meetingId) => (server + "/meeting/" + meetingId),
  //"attendMeetingByMeetingId": (meetingId, userId) => (server + "/meeting/" + meetingId + "/attendants?userId=" + userId),
  "attendMeetingByAttendantNum": (attendantNum, userId) => (server + "/meeting/" + attendantNum + "/attendants?userId=" + userId),
  "exitMeetingByMeetingId": (meetingId , userId) => (server +"/meeting/" + meetingId + "/attendants/" + userId),
  "getMeetingByUserIdAndDate": (userId, date) => (server + "/user/" + userId + "/meeting/" + date),
};

const userController = {
  "getUser": () => (server + "/user"),
  "register": () => (server + "/user"), //json params in req body
  "login": (phone, password) => (server + "/user/login?phone=" + phone + "&password=" + password),
  "getUserByUserId": (userId) => (server + "/user/" + userId),
  "editUser": (userId) => (server + "/user/" + userId),
};

module.exports = {
  idToTime,
  server,
  today,
  nextDay,
  roomController,
  timeSliceController,
  meetingController,
  userController,
};
