import React, { useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { useContext } from 'react';
import Cookies from "js-cookie";

function HomePage() {
  const userData = useContext(LoginContext);
  const [userContext, setUserContext] = useState(userData);
  const uid = Cookies.get("uid");
  console.log(uid)
  return (
    <div>
      <h1>HomePage</h1>
      <h1>{uid}</h1>
      <h1>{JSON.stringify(userContext)}</h1>
    </div>
  )
}

export default HomePage;
