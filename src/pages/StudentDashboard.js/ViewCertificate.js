import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Certificate from "../../components/Certificate"
import Cookies from "js-cookie"

import { ClipLoader } from 'react-spinners';       
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';

export default function ViewCertificate() {
    const cookieUserData = JSON.parse(Cookies.get("loginState"))
    console.log("VIEW CERT COOKIE :", cookieUserData)
    const [cert, setCert] = useState([])
    const [isLoading, setIsLoading] = useState(true)

        useEffect(()=>{            
            (async () => {
            try{
                const url = `${process.env.REACT_APP_API_BASE_URL}/get-certificates/${cookieUserData.uid}`
                console.log("CERT URL: ", url)
                setIsLoading(true)
                const resp = await axios.get(url)
                if(resp.data){
                    setCert(resp.data.data)
                }
                    console.log("GET CERTIFICATE RESPONSE : ", resp.data.data)
           }
           catch(err){
            // console.log("Error Getting Issued Certificate : ", err)
            console.log("ERROR IN GETTING ISSUED CERTIFICATE DATA", err)
           }
           finally {
            setIsLoading(false)
            
           }
            })();
            

        },[])
    return (
        <div className="relative">
            <h1 className="font-light text-2xl mt-4">Issued Certificates</h1>
            <div className="certificate-container border rounded grid grid-cols-3 gap-4 min-h-[412px] mt-4 pl-2 pt-2">

            { cert.length > 0 ?
                cert.map((certificate, index)=>{
                    return (
                        <Certificate isLoading={isLoading} key={index} certificate={certificate}/>
                    )
                })
                :
                    <p style={{position:'absolute', top:'50%', left:'45%'}} className="text-center absolute m-auto">No Issued Certificates!</p>
                
            
            }
             
            </div>
      
        </div>
    )
}