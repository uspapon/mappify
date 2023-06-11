import {  createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import InstructorsHome from "../pages/Dashboard/InstructorDashboard/InstructorsHome";
import StudentsHome from "../pages/Dashboard/StudentsDashboard/StudentsHome";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Dashboard/AdminDashboard/Users";
import Classes from "../pages/Dashboard/AdminDashboard/Classes";
import AddNewClass from "../pages/Dashboard/InstructorDashboard/AddNewClass";
import MyClasses from "../pages/Dashboard/InstructorDashboard/MyClasses";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import Home from "../pages/Home/Home";

import OurInstrucors from "../pages/Instrucors/OurInstrucors";
import OurClasses from "../pages/Classes/OurClasses";
import SelectedClass from "../pages/Dashboard/StudentsDashboard/SelectedClass";
import EnrolledClasses from "../pages/Dashboard/StudentsDashboard/EnrolledClasses";
import PaymentHistory from "../pages/Dashboard/StudentsDashboard/PaymentHistory";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: 'ourclass',
            element: <OurClasses></OurClasses>
        },
        {
            path: 'ourinstructors',
            element: <OurInstrucors></OurInstrucors>
        },
        {
            path: 'login',
            element: <Login></Login>
        },
        {
            path: 'register',
            element: <Register></Register>
        }
      ]
    },
    {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            // admin routes
            {
                path: 'adminhome',
                element: <AdminDashboard></AdminDashboard>

            },
            {
                path: 'users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
            {
                path: 'classes',
                element: <AdminRoute><Classes></Classes></AdminRoute>
            },
            // instructors routes
            {
                path: 'instructorshome',
                element: <InstructorRoute><InstructorsHome></InstructorsHome></InstructorRoute>
            },
            {
                path: 'addnewclass',
                element: <InstructorRoute><AddNewClass></AddNewClass></InstructorRoute>
            },
            {
                path: 'myclasses',
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            
            // student routes
            {
                path: 'studentshome',
                element: <PrivateRoute><StudentsHome></StudentsHome></PrivateRoute>
            },
            {
                path: 'selectedclasses',
                element: <PrivateRoute><SelectedClass></SelectedClass></PrivateRoute>
            },
            {
                path: 'enrolledclasses',
                element: <PrivateRoute><EnrolledClasses></EnrolledClasses></PrivateRoute>
            },
            {
                path: 'paymenthistory',
                element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
            }
        ]
    }
  ]);


  
  