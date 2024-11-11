import React from "react";

const Cards = ({heading, serialnumber, para, cardstyle})=>{
    return(
    <div className={cardstyle}>

    <div className="content p-2 mb-2 ">
        <div className="heading flex flex-row justify-between">
            
            <h1 className="heading1 text-4xl font-[400] flex flex-col items-baseline m-4 gap-4 ">{heading.part1}  <span> {heading.part2} </span> 
            </h1>

            <h2 className="serial text-3xl"> {serialnumber}</h2>
        </div>
        
        <p className="mt-8 text-xl font-light">{para}</p>
    </div>

    </div>
    )

}


export default function Steps(){

    return (
        <div className="entity-container max-w-full flex flex-row items-start justify-between space-x-2 py-4 px-16">

            <div className="text-area sticky top-16 flex flex-col text-start w-1/2 m-4">

                <div className="div heading mb-4"> 
                    <h1 className="text-3xl font-[500]"> Discover the Power of Blockchain for  </h1>
                    <span className="text-3xl font-[500]" >Certificate Management </span>
                </div>

                <div className="div para mt-2 ">Experience secure, transparent certificate management through blockchain. Our system makes digital credential issuance and verification simple, trustworthy, and tamper-proof. </div>

                <div className="div action mt-8">
                    <button className="border py-2 px-6 text-white font-[500] bg-red-500">
                        Action 
                    </button>
                </div>                                    
            </div>
            

            <div className="card-area relative flex flex-col items-center justify-evenly w-1/2 ">

                <Cards heading={{part1:"Issuer Entity Generates", part2:"Certificate"}} serialnumber={"01"} para={"The issuer entity creates a digital certificate for the student upon successful completion of a course or program."} cardstyle={"sticky top-16 z-0 cards bg-gray-400 -rotate-2"}/>


                <Cards heading={{part1:"Student Receives Digital", part2:"Certificate"}} serialnumber={"02"} para={"The student receives the digital certificate from the issuer entity, which includes all relevant details and is securely stored on the blockchain."} cardstyle={"sticky top-16 z-10 cards bg-gray-300 rotate-2"} />

                
                <Cards heading={{part1:"Verifier Validates Certificate", part2:""}} serialnumber={"03"} para={"The verifier, such as a potential employer or academic institution, can verify the authenticity of the certificate by checking the blockchain for the certificate's details."} cardstyle={"sticky top-16 z-20 cards bg-gray-400 -rotate-2"} />

                <Cards heading={{part1:"Certificate Validated", part2:"Successfully"}} serialnumber={"04"} para={"Once the verifier confirms the validity of the certificate on the blockchain, they can trust the information provided by the student."} cardstyle={"cards  sticky top-16 z-30 bg-gray-300 rotate-2"} />

                
            </div>
        
        </div>
        
    )
}