import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import { ClipLoader } from 'react-spinners';       
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';
import Certificate from "../../components/Certificate";
const toastOptions = {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        style:{backgroundColor:'#fff'}
    }
export default function VerifyCertificate() {
    const {certificateid} = useParams()
    const [certificate, setCertificate] = useState("hello");
    const [isLoading, setIsLoading] = useState(null)
    const [isVerifying, setIsVerifying] = useState(null)
    useEffect(()=>{
        (async () => {

            try {
                setIsLoading(true)
                let res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/verify-certificate/${certificateid}`)
                setCertificate(res.data)
                console.log(res.data)
                // toast("Fetched Certificate ", toastOptions)
            }
            catch(err) {
                console.log("ERROR FETCHING CERTIFICATE DATA: ", err )

            }
            finally{
                setIsLoading(false)
            }

        })();
    },[certificateid])
    return (
        <div className=' relative course-creation flex flex-col mt-2 min-h-[80vh] w-full border'>
            <h1 className="font-light text-2xl mt-4 ml-4">
                Verify Certificate
            </h1>
            <ToastContainer/>
            {certificateid}
            <Certificate isLoading={isLoading} certificate={certificate}/>
            {JSON.stringify(certificate)}
            
            

        </div>
    )
}