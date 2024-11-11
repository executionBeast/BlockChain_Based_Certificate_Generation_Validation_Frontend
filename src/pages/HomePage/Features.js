import React, {useState} from 'react'
import blockchain from "../../images/blockchain.jpg";
import certificate from "../../images/certificate2.png"
import instantverification from "../../images/instantverification.png"
function Features() {
    const [activeTab, setActiveTab] = useState(0);
  return (
    <div className='flex flex-row items-center justify-evenly h-fit max-w-full ' >
      <div className="image-area">
        {
            activeTab === 0 && (
            <img height="250px" width="480px" src={blockchain} alt="Blockchain"/>
        )}
         {
            activeTab === 1 && (
            <img height="250px" width="480px" src={certificate} alt="Secure Issuence "/>
        )}
         {
            activeTab === 2 && (
            <img height="250px" width="480px" src={instantverification} alt="Instant Verification"/>
        )}
      </div>
        

      <div className="text-area flex flex-col text-start ">

        <div className=" blockchain py-2 pl-8 cursor-pointer space-y-6 hover:bg-gray-100 border-l-4 border-l-transparent hover:border-black" onMouseOver={()=>{
                setActiveTab(0);
            }} >
                <h1 className="text-4xl font">Blockchain Technology</h1>
                <p className="text-1xl font-light">Utilize the power of blockchain for certificate generation</p>
        </div>
            
        <div className="issuence py-2 pl-8 cursor-pointer space-y-6 hover:bg-gray-100 border-l-4 border-l-transparent hover:border-black" onMouseOver={()=>{
                setActiveTab(1);
            }} >
                 <h1 className="text-4xl font">Secure Issuance</h1>
                 <p className="text-1xl font-light">Securely issue certificates on the blockchain network</p>
        </div>
            
        <div className="verify py-2 pl-8 cursor-pointer space-y-6 hover:bg-gray-100 border-l-4 border-l-transparent hover:border-black" onMouseOver={()=>{
                setActiveTab(2);
            }} >
                <h1 className="text-4xl font">Instant Verification</h1>
                <p className="text-1xl font-light">Verify certificates instantly using blockchain technology
                </p>
        </div>

      </div>
    </div>
  )
}

export default Features;
