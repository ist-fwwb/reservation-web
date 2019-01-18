// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Work from "@material-ui/icons/Work";
import Home from "@material-ui/icons/Home";
// import ContentPaste from "@material-ui/icons/ContentPaste";
import BubbleChart from "@material-ui/icons/BubbleChart";
import Notifications from "@material-ui/icons/Notifications";
// core components/views
import RoomPage from "views/RoomPage/RoomPage.jsx";
import MeetingPage from "views/MeetingPage/MeetingPage.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Icons from "views/Icons/Icons.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import RoomSchedulePage from "views/RoomSchedulePage/RoomSchedulePage.jsx";
import RoomProfile from "views/RoomProfile/RoomProfile.jsx";
import HomePage from "views/HomePage/HomePage.jsx";
import MeetingProfile from "views/MeetingProfile/MeetingProfile.jsx";

export const dashboardRoutes = [
  {
    path: "/home",
    sidebarName: "首页",
    navbarName: "首页",
    icon: Home,
    component: HomePage
  },
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
    path: "/notifications",
    sidebarName: "Notifications",
    navbarName: "Notifications",
    icon: Notifications,
    component: NotificationsPage
  },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

let routesNotInSideBar = [
  {
    path: "/room/:roomId/:roomLocation/schedule",
    component: RoomSchedulePage
  },
  {
    path: "/room/:roomId/profile",
    component: RoomProfile
  },
  {
    path: "/meeting/:meetingId/profile",
    component: MeetingProfile
  },
  {
    path: "/user/:userId/profile",
    component: UserProfile
  },
];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);
