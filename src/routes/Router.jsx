import {  createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Dashboard from "../layouts/Dashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import InstructorsHome from "../pages/InstructorsHome/InstructorsHome";
import StudentsHome from "../pages/Dashboard/StudentsHome/StudentsHome";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
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
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'adminhome',
                element: <AdminDashboard>Home</AdminDashboard>

            },
            {
                path: 'instructorshome',
                element: <InstructorsHome>Home</InstructorsHome>
            },
            {
                path: 'studentshome',
                element: <StudentsHome>Home</StudentsHome>
            }
        ]
    }
  ]);


  
  