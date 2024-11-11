import React, {useState} from 'react'
import student from "../../images/student.jpg";
import issuer from "../../images/authority.jpg";
import verifier from "../../images/verifier.jpg";

function Entity() {
    const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='pt-16 flex flex-row-reverse justify-between h-fit max-w-full' >
      <div className=" p-4 image-area w-1/2">
        {
            activeTab === 0 && (
            <img height="350px" width="580px" src={student} alt="Student"/>
        )}
         {
            activeTab === 1 && (
            <img height="350px" width="580px" src={issuer} alt="Issuer"/>
        )}
         {
            activeTab === 2 && (
            <img height="350px" width="580px" src={verifier} alt="Verifier"/>
        )}
      </div>
        

      <div className="p-8 text-area flex flex-col text-start w-1/2 ">

        <div className=" blockchain py-2 pl-8 cursor-pointer space-y-6 hover:bg-gray-100 border-l-4 border-l-transparent hover:border-black" onMouseOver={()=>{
                setActiveTab(0);
            }} >
                <h1 className="text-4xl font">Student</h1>
                <p className="text-1xl font-light tracking-wider">The Student Entity securely receives and stores digital certificates, providing students with instant access to verified credentials for easy sharing.</p>
        </div>
            
        <div className="issuence py-2 pl-8 cursor-pointer space-y-6 hover:bg-gray-100 border-l-4 border-l-transparent hover:border-black" onMouseOver={()=>{
                setActiveTab(1);
            }} >
                 <h1 className="text-4xl font">Issuer</h1>
                 <p className="text-1xl font-light tracking-wider">The Issuer Entity generates and securely issues tamper-proof, verifiable certificates through our blockchain system, ensuring trust and transparency in certification processes.</p>
        </div>
            
        <div className="verify py-2 pl-8 cursor-pointer space-y-6 hover:bg-gray-100 border-l-4 border-l-transparent hover:border-black" onMouseOver={()=>{
                setActiveTab(2);
            }} >
                <h1 className="text-4xl font">Verifier</h1>
                <p className="text-1xl font-light tracking-wider">The Verifier Entity enables instant, secure certificate verification on the blockchain, ensuring authenticity and trustworthiness for all credentials issued.</p>
        </div>

      </div>
    </div>
  )
}

export default Entity;
