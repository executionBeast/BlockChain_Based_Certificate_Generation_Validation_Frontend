import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';

import {
  createBrowserRouter,  
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate
} from "react-router-dom";

import UserDashboardPage from './pages/StudentDashboard.js/UserDashboardPage';
import CourseEnrollment from './pages/StudentDashboard.js/CourseEnrollment';
import IssuerDashboard from './pages/IssuerDashboard/Dashboard';
import Student from './pages/IssuerDashboard/Student';
import CreateCourse from './pages/IssuerDashboard/CreateCourse';
import Cookies from "js-cookie";
const cookieLoginState = Cookies.get('loginState');
// {cookieLoginState ? <HomePage/> : <Navigate to="/login" replace={true}/> }
// {cookieLoginState ? <IssuerDashboard/>: <Navigate to="/login" replace={true}/>}
const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<HomePage/>}/>
        <Route path="login" element={cookieLoginState ? <Navigate to="/" replace={true}/> : <LoginPage/>}/>
        <Route path="signup" element={<SignupPage/>}/>

        <Route path="user-dashboard" element={<UserDashboardPage/>}>   {/*Handle All Student Related <Outlet/> */ }
          <Route index path="enroll-course" element={<CourseEnrollment/>}/>
        </Route>

        <Route path="issuer-dashboard" element={<IssuerDashboard/>}>
            <Route index path="students" element={<Student/>}/>
            <Route path="create-course" element={<CreateCourse/>}/>
        </Route>


    </Route>
  )

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
