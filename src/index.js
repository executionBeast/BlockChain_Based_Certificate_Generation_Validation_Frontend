import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage/HomePage';


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
import PrivateRoute from './components/PrivateRoute';
import LogoutRoute from './components/LogoutRoute';
import LoginContextProvider from './context/LoginContextProvider';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index={true} path="" element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignupPage/>}/>
        <Route path="privateroute" element={<PrivateRoute/>}/>
        <Route path="logoutroute" element={<LogoutRoute/>}/>

        <Route path="student-dashboard" element={<UserDashboardPage/>}>   {/*Handle All Student Related <Outlet/> */ }
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
    <LoginContextProvider>
      <RouterProvider router={router} />
    </LoginContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
