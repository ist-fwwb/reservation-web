const prefix = "http://";

const lexer_domain = "47.106.8.44";
const lexer_port = "4000";
const lexer_server = prefix + lexer_domain + ":" + lexer_port;

const lexerController = {
  "lexer":(text) => (lexer_server + "/lexer/" + encodeURIComponent(text)),
}

const domain = "47.106.8.44";
const port = "31000";
const server = prefix + domain + ":" + port;

// 向未来取整
const formatTimeCeiling = (time) => {
	let array = time.split(':');
	let hour = Number(array[0]);
    let minute = Number(array[1]);
	if (minute < 0 || minute > 60){
        return -1;
    }
	if ( minute < 30){
		minute = "30";
	}
	else {
		minute = "00";
		if (hour === 23){
			hour = "00";
		}
		else{
			hour += 1;
		}
  }
  if (hour < 10){
      hour = "0" + String(hour);
  }
	let result = hour + ":" + minute;
	return result;
}

const dateToString = (date) => (date.toLocaleDateString([],{year:"numeric", month:"2-digit", day:"2-digit"}).replace(/\//g,'-'));
const nowTime = () => (new Date()).toLocaleTimeString([],{hour12: false, hour:'2-digit', minute:'2-digit'});


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
  "searchRoomByLocationAndSizeAndUtils":(location, size, utils) => {
    let locationStr = location ? "location="+location+"&" : "";
    let sizeStr = size ? "size="+size+"&" : "";
    let utilsStr = "";
    for (let i in utils){
      utilsStr += ("utils=" + utils[i] + "&");
    }
    let api = server+"/meetingroom?"+locationStr+sizeStr+utilsStr;
    api = api.substring(0, api.length-1);
    return api;
  },
  "getRoomByStartTimeAndEndTimeAndDate":(startTime, endTime, date) => {
    let startTimeStr = startTime ? "startTime="+startTime+"&" : "";
    let endTimeStr = endTime ? "endTime="+endTime+"&" : "";
    let dateStr = date ? "date="+date+"&" : "";
    let api = server+"/meetingroom?"+startTimeStr+endTimeStr+dateStr;
    api = api.substring(0, api.length-1);
    return api;
  },
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
    let dateStr = date ? "date="+date+"&" : "";
    let roomIdStr = roomId ? "roomId="+roomId+"&" : "";
    let statusStr = status ? "status="+status+"&" : "";
    let api = server + "/meeting?"+dateStr + roomIdStr + statusStr;
    api = api.substring(0, api.length-1);
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
  "register": (enterpriceId, phone, password, name, faceFile, featureFile, ) => (server + "/user?enterpriseId="+enterpriceId+"&name="+name+"&phone="+phone+"&password="+password+"&faceFile="+faceFile+"&featureFile="+featureFile), //json params in req body
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
  let nowTimeIdCeiling = timeToId(formatTimeCeiling(nowTime()));
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
      let currentCell = re[j][day-1];
      if (timeSlice[j]===null){
        currentCell["occupied"] = false;
        currentCell["meetingid"] = null;
      }
      else {
        currentCell["occupied"] = true;
        currentCell["meetingid"] = timeSlice[j];
        currentCell["name"] = nameMap[timeSlice[j]];
      }

      if (ele.date === today && j < nowTimeIdCeiling){
        currentCell["expired"] = true;
      }
      else {
        currentCell["expired"] = false;
      }

      currentCell["date"] = ele.date;
      currentCell["click"] = false;
      currentCell["between"] = false;
      currentCell["original"] = false;
    }
  }
  return re;
}

const emptyTimeSlice = [
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": today,
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(today),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(today)),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(today))),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(nextDay(today)))),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(nextDay(nextDay(today))))),
  },
  {
    "timeSlice": [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ],
    "date": nextDay(nextDay(nextDay(nextDay(nextDay(nextDay(today)))))),
  }
]

const utils_list = {
  tv: "TV",
  airconditioner: "AIRCONDITIONER",
  blackboard: "BLACKBOARD",
  table: "TABLE",
  wifi: "WIFI",
  network: "NETWORK",
  projector: "PROJECTOR",
  power: "POWERSUPPLY"
}

module.exports = {
  idToTime,
  timeToId,
  
  formatTimeCeiling,

  today,
  nowTime,
  nextDay,
  
  roomController,
  timeSliceController,
  meetingController,
  userController,
  lexerController,

  ScheduleDataToRows,
  emptyTimeSlice,

  utils_list,
};
