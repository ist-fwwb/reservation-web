// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Work from "@material-ui/icons/Work";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
// core components/views
import RoomPage from "views/RoomPage/RoomPage.jsx";
import MeetingPage from "views/MeetingPage/MeetingPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import RoomSchedule from "views/RoomSchedule/RoomSchedule.jsx";
import RoomProfile from "views/RoomProfile/RoomProfile.jsx";

export const dashboardRoutes = [
  {
    path: "/room",
    sidebarName: "查看会议室",
    navbarName: "查看会议室",
    icon: Dashboard,
    component: RoomPage
  },
  {
    path: "/meeting",
    sidebarName: "查看会议",
    navbarName: "查看会议",
    icon: Work,
    component: MeetingPage
  },
  {
    path: "/user",
    sidebarName: "个人信息",
    navbarName: "个人信息",
    icon: Person,
    component: UserProfile
  },
  {
    path: "/table",
    sidebarName: "Table List",
    navbarName: "Table List",
    icon: "content_paste",
    component: TableList
  },
  {
    path: "/icons",
    sidebarName: "Icons",
    navbarName: "Icons",
    icon: BubbleChart,
    component: Icons
  },
  {
    path: "/maps",
    sidebarName: "Maps",
    navbarName: "Map",
    icon: LocationOn,
    component: Maps
  },
  {
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  {
    path: "/upgrade-to-pro",
    sidebarName: "Upgrade To PRO",
    navbarName: "Upgrade To PRO",
    icon: Unarchive,
    component: UpgradeToPro
  },
  { redirect: true, path: "/", to: "/room", navbarName: "Redirect" }
];

let routesNotInSideBar = [
  {
    path: "/room/:roomid/schedule",
    component: RoomSchedule
  },
  {
    path: "/room/:roomid/profile",
    component: RoomProfile
  }
];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);
