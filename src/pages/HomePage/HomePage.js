import React from 'react';
import Intro from './Intro';
import Features from './Features';
import Steps from './Steps';
import Entity from './Entity';

function HomePage() {
  console.log("REACT_APP_API_BASE_URL", process.env.REACT_APP_API_BASE_URL);

  return (
    <div className='intro-section items-center justify-center text-center flex-col w-full max-w-full my-24 space-y-8'>
      <Intro/>      
      <Features/>
      <Steps/>
      <Entity/>
      
    </div>
  )
}

export default HomePage;
