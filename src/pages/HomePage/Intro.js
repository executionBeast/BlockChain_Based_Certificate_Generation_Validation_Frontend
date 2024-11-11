import React from 'react'

function Intro() {
  return (
  <>
  <div className="heading w-full">
        <h1 className='text-5xl font-medium space-y-16 flex flex-col' >Empower Your Certificates with Blockchain <span className='mt-3'>Technology </span> </h1>
      </div>
      
      <div className="para w-full px-16">
        <p className='text-1xl'>Welcome to our platform where you can securely generate and validate Certificates using blockchain technology. Say goodbye to fraudulent credentials and embrace the future of certification </p>
    </div>

    <div className="action-butto w-full ">
      <button className='border rounded px-4 py-2 m-1 bg-orange-600 font-medium hover:bg-gray-400'>Get Started</button> 
      <button className='border border-orange-600 text-orange-600 rounded px-4 py-2 m-1 font-bold hover:bg-gray-400' >Learn More</button>     
    </div>

  </>
  )
}

export default Intro;
