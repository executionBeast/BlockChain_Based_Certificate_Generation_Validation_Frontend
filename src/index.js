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
} from "react-router-dom";

import StudentDashboard from './pages/StudentDashboard.js/StudenDashboard';
import CourseEnrollment from './pages/StudentDashboard.js/CourseEnrollment';
import IssuerDashboard from './pages/IssuerDashboard/IssuerDashboard';
import Student from './pages/IssuerDashboard/Student';
import CreateCourse from './pages/IssuerDashboard/CreateCourse';
import IssueCertificate from './pages/IssuerDashboard/IssueCertificate';
import PrivateRoute from './components/PrivateRoute';
import LogoutRoute from './components/LogoutRoute';
import LoginContextProvider from './context/LoginContextProvider';
import VerifyCertificate from './pages/VerifyCertificate.js/VerifyCertificate';
import ViewCertificate from './pages/StudentDashboard.js/ViewCertificate';
const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route index={true} path="" element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignupPage/>}/>
        <Route path="privateroute" element={<PrivateRoute/>}/>
        <Route path="logoutroute" element={<LogoutRoute/>}/>
        <Route path="verify-certificate/:certificateid" element={<VerifyCertificate/>}/>

        <Route path="student-dashboard" element={<StudentDashboard/>}>   {/*Handle All Student Related <Outlet/> */ }
          <Route index path="enroll-course" element={<CourseEnrollment/>}/>
          <Route path="view-certificates" element={<ViewCertificate/>}/>
        </Route>

        <Route path="issuer-dashboard" element={<IssuerDashboard/>}>
            <Route index path="students" element={<Student/>}/>   {/**View All Students */}
            <Route path="create-course" element={<CreateCourse/>}/> {/**create courses */}
            <Route path="issue-certificate" element={<IssueCertificate/>}/> {/**create courses */}

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
