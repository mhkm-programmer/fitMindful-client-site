import AboutUs from "../component/Pages/About/AboutUs";
import AddClasses from "../component/Pages/Dashboard/Instructors/AddClasses";
import AdminHome from "../component/Pages/Dashboard/Admin/AdminHome";
import AdminRoute from "./AdminRoute";
import Classes from "../component/Pages/Classes/Classes";
import ContactUs from "../component/Pages/Contact/ContactUs";
import Dashboard from "../Layout/Dashboard";
import EnrolledClasses from "../component/Pages/Dashboard/Student/EnrolledClasses";
import ErrorPage from "../component/Pages/ErrorPage/ErrorPage";
import Home from "../component/Pages/Home/Home";
import Instructor from "../component/Pages/Instructor/Instructor";
import InstructorsHome from "../component/Pages/Dashboard/Instructors/InstructorsHome";
import Login from "../Layout/LoginLayout/Login";
import Main from "../Layout/Main";
import ManageClasses from "../component/Pages/Dashboard/Admin/ManageClasses";
import ManageUser from "../component/Pages/Dashboard/Admin/ManageUser";
import MyClasses from "../component/Pages/Dashboard/Instructors/MyClasses";
import Payment from "../component/Pages/Dashboard/Student/Payment";
import PaymentHistory from "../component/Pages/Dashboard/Student/PaymentHistory";
import SelectedClasses from "../component/Pages/Dashboard/Student/SelectedClasses";
import SignUp from "../Layout/LoginLayout/SignUp";
import StudentHome from "../component/Pages/Dashboard/Student/StudentHome";
import Terms from "../component/Pages/TernsAndCondition/Terms";
import { createBrowserRouter } from "react-router-dom";
import InstructorRoute from "./InstructorRoute";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },

      {
        path: "instructors",
        element: <Instructor></Instructor>,
      },
      {
        path: "classes",
        element: (
          <PrivateRoute>
            <Classes></Classes>
          </PrivateRoute>
        ),
      },

      {
        path: "about",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },

      {
        path: "terms",
        element: <Terms></Terms>,
      },
    ],
  },

  //Dashboard routes
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      //Student routes
      {
        path: "student-home",
        element: <StudentHome></StudentHome>,
      },
      {
        path: "selected-classes",
        element: <SelectedClasses></SelectedClasses>,
      },
      {
        path: "enrolled-classes",
        element: <EnrolledClasses></EnrolledClasses>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },

      //Instructor routes
      {
        path: "instructors-home",
        element: (
          <InstructorRoute>
            <InstructorsHome></InstructorsHome>
          </InstructorRoute>
        ),
      },
      {
        path: "add-classes",
        element: (
          <InstructorRoute>
            <AddClasses></AddClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },

      //Admin routes

      {
        path: "admin-home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manage-user",
        element: (
          <AdminRoute>
            <ManageUser></ManageUser>
          </AdminRoute>
        ),
      },
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
    ],
  },
]);
