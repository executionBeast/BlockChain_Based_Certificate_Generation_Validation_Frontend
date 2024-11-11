import React from 'react';
import Intro from './Intro';
import Features from './Features';
import Steps from './Steps';
import Entity from './Entity';
function HomePage() {


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
