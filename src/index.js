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
} from "react-router-dom";
import UserDashboardPage from './pages/UserDashboardPage';
import UserDashboard from './components/UserDashboard';
import IssuerDashboard from './pages/IssuerDashboard/Dashboard';
import Student from './pages/IssuerDashboard/Student';
import CreateCourse from './pages/IssuerDashboard/CreateCourse';

const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<HomePage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<SignupPage/>}/>
        <Route path="user" element={<UserDashboardPage/>}>
          <Route path="dashboard" element={<UserDashboard/>}/>
        </Route>
        <Route path="issuer-dashboard" element={<IssuerDashboard/>}>
            <Route path="students" element={<Student/>}/>
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
