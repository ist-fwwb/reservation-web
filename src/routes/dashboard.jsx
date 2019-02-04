// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Work from "@material-ui/icons/Work";
import Home from "@material-ui/icons/Home";
import Book from "@material-ui/icons/Book";
import CloudQueue from "@material-ui/icons/CloudQueue";

// core components/views
import RoomPage from "views/RoomPage/RoomPage.jsx";
import MeetingPage from "views/MeetingPage/MeetingPage.jsx";
import UserProfilePage from "views/UserProfilePage/UserProfilePage.jsx";
import RoomProfile from "views/RoomProfile/RoomProfile.jsx";
import HomePage from "views/HomePage/HomePage.jsx";
import MeetingProfile from "views/MeetingProfile/MeetingProfile.jsx";
import AddressBook from "views/AddressBook/AddressBook.jsx";
import SmartReservationPage from "views/SmartReservationPage/SmartReservationPage.jsx";

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
    path: "/smart-reserve",
    sidebarName: "智能预定",
    navbarName: "智能预定",
    icon: CloudQueue,
    component: SmartReservationPage
  },
  {
    path: "/addressbook",
    sidebarName: "通讯录",
    navbarName: "通讯录",
    icon:Book,
    component: AddressBook,
  },
  { redirect: true, path: "/", to: "/home", navbarName: "Redirect" }
];

let routesNotInSideBar = [
  {
    path: "/room/:roomId/profile",
    component: RoomProfile
  },
  {
    path: "/room/:roomId/profile/:date/:startTime/:endTime/:description",
    component: RoomProfile
  },
  {
    path: "/meeting/:meetingId/profile",
    component: MeetingProfile
  },
  {
    path: "/user/:userId/profile",
    component: UserProfilePage
  },
];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);
