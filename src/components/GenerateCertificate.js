import * as QRCODE from "qrcode.react";
import { useEffect } from "react";

 
 const GenerateCertificate = ({showCertificate, certificateParameter}) => {
        const {studentname, coursename, issuername, certificateid} = certificateParameter 
        console.log("LOG OF CERTIFICATE PARAMETER FROM GENCEERT COMPONENT", certificateParameter)
        const setQRCODEText = () =>{
        const qrcode = document.getElementById("qrcode");
        console.log("QRCODE : ", qrcode)
        }
        return(
        <div id="certificate" style={{
            width: '850px',
            height: '600px', 
            fontFamily: 'Poppins, Arial, sans-serif',
            backgroundImage: "url('/1.png')",
            backgroundSize: 'cover',
            position:'relative',
            left: showCertificate ? 'unset' : '-1000px' 
            }}>
                {/* <div style={{position: 'absolute', top: 10, left: 10, background: '#fff', zIndex: 999}}>
  <code>{JSON.stringify(certificateParameter)}</code>
</div> */}
      
            
            <div className="w-full h-[50px] absolute top-[290px] text-center text-4xl tracking-wide">
                <h1 style={{fontFamily:"Playfair Display, serif", color:"#212121ee"}}>
                {studentname}</h1>  {/** Name */}
            </div>
            
            <QRCODE.QRCodeCanvas id="qrcode" className="absolute bottom-[129px]  left-[25px] h-[94px] w-[94px] bg-blue-500" value={`https://bcertify.vercel.app/verify-certificate/${certificateid}`} size={89}/>

            <div className="w-full h-[40px] absolute top-[395px] text-center text-3xl">
                <h1 style={{fontFamily:"Merriweather, serif", color:"#212121ee"}} >{coursename}</h1>
            </div>
            
            <div className="w-full h-[40px] absolute top-[467px] text-center text-3xl">
                <h1 style={{fontFamily:"Roboto", color:"#212121ee"}} >{issuername}</h1>
            </div>
             <div className="w-full h-[40px] absolute top-[545px] text-center text-1xl">
             <h1 style={{ textAlign: 'center', fontSize:'1em', color:"#212121ee"
            }}>{`${String(new Date().getDate()).padStart(2, '0')}/${
                String(new Date().getMonth() + 1).padStart(2, '0')
              }/${new Date().getFullYear()}`}</h1>
            </div>
            
           
        </div>
        )
    }

export default GenerateCertificate;