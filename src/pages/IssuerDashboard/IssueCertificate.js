import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from 'js-cookie'
import html2canvas from "html2canvas"
export default function IssueCertificate(){
    const userCookieData = Cookies.get("loginState");
    const userdata = JSON.parse(userCookieData)
    const [enrolledStudentsData,setEnrolledStudentsData]=useState([])
    const [courseData, setCourseData] = useState([])
    const [enrolledStudentsWithCert, setEnrolledStudentsWithCert] = useState([])
    const [certificateParameter, setCertificateParameter] = useState({})
    const [IpfsHash, setIpfsHash] = useState('')
    const [formData, setFormData] = useState({
        issuerid:userdata.uid,
        issuername:`${userdata.userdata.firstname} ${userdata.userdata.middlename} ${userdata.userdata.lastname}`,
        courseid:'',
        coursetitle: '',
        studentid: '',
        studentname:'',
        certificateurl:''
    })
    //Fetch Student Data To Select For Issuance
    //Fetch Course Data To Select For Issuance

    const getCourse = async ()=>{
        try{
            console.log("UID",userdata.uid) //Fine
            const url  = `${process.env.REACT_APP_API_BASE_URL}/course`
            const res = await axios.get(url,{
            params:{ issuerid:userdata.uid}
            })
            console.log("COURSE DATA ",res.data);
            // setCourseData({...res.data, issuername:userCookieData.userdata.username)
            setCourseData(res.data)   
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        console.log("User Cookie Data : ", userdata);
        ;(async () =>{
            await getEnrolledStudentsWithCertificate()
            const url  = `${process.env.REACT_APP_API_BASE_URL}/get-enrolled-students`
            const reqEnrolledStudentsData = await axios.get(url)   //no body
            setEnrolledStudentsData(reqEnrolledStudentsData.data.data)
            console.log("Enrolled Student Data :", enrolledStudentsData)
            await getCourse();
        })(); 
    },[])
    const getEnrolledStudentsWithCertificate = async () =>{
        const url = `${process.env.REACT_APP_API_BASE_URL}/get-enrolled-students-certificates`
        const reqEnrolledStudentsCertificates = await axios.get(url)
        setEnrolledStudentsWithCert(reqEnrolledStudentsCertificates.data.data)
        console.log("Enrolled Student With Cert : ", reqEnrolledStudentsCertificates.data.data)
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        console.log("Select handleChange : ", name, value)
        if(name === "studentid") {
            const selectedStudent = enrolledStudentsData.find(student => student._id === value)
            setFormData(prev => {
                let studentname = `${selectedStudent.firstname} ${selectedStudent.middlename} ${selectedStudent.lastname}`
                console.log("Form Data",{
                    ...prev, 
                    studentid: value,
                    studentname: selectedStudent? `${selectedStudent.firstname} ${selectedStudent.middlename} ${selectedStudent.lastname}` : " " 
                })
                setCertificateParameter(prev => ({...prev, studentname:studentname}))

                return {
                ...prev, 
                studentid: value,
                studentname: selectedStudent? `${selectedStudent.firstname} ${selectedStudent.middlename} ${selectedStudent.lastname}` : " " 
            }})
        }
        else if(name ==="courseid") {
            const selectedCourse = courseData.find(course => course._id === value)
            setFormData(prev => {
                console.log("Form Data",{
                    ...prev, 
                    courseid: value,
                    coursetitle: selectedCourse? `${selectedCourse.title}` : ""
                })
                setCertificateParameter(prev=> ({...prev, coursename:selectedCourse.title}))
                return {
                ...prev, 
                courseid: value,
                coursetitle: selectedCourse? `${selectedCourse.title}` : ""
            }})
        }
        console.log("FormData : ", formData)
        setCertificateParameter(prev=> ({...prev, issuername:formData.issuername}))
        
    }

    const generateAndUpload = async () =>{
        const certificateEl = document.getElementById('certificate');
        const canvas = await html2canvas(certificateEl)
        const blob  = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        const certificateImageForm = new FormData()
        certificateImageForm.append('file', blob, `Cert_${formData.studentname}_${formData.coursetitle}_${formData.issuername}.png`);
        try{
            const pinataUrl ='https://api.pinata.cloud/pinning/pinFileToIPFS'
            const res = await axios.post(pinataUrl,certificateImageForm,
                {
                maxBodyLength: 'Infinity',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
                    pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
                    pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET_KEY}`
                },
            });
            console.log("Pinata Upload Success : CID :", res.data.IpfsHash);
            // alert("Uploaded to IPFS: CID - " + res.data.IpfsHash);
            setIpfsHash(res.data.IpfsHash)
            return res.data.IpfsHash


        }
        catch(err){
            console.log("Pinata Upload Error : ", err)
            // alert("Failed to upload to IPFS.");
        }
    }

    const setCertificate = () =>{
        setCertificateParameter({studentname:formData.studentname, coursename:formData.coursetitle, issuername:formData.issuername})
    }

    const downloadCertificate = async () =>{
        const certificateElement = document.getElementById('certificate');
        const canvas = await html2canvas(certificateElement,{
            useCORS: true,       // Important for images
            allowTaint: true,
            scrollY: -window.scrollY, // Prevent offset issues
            scale: 1
        })
        // const blob  = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        const dataUrl = canvas.toDataURL("image/png")
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "certificate.png"
        link.click()
        
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.REACT_APP_API_BASE_URL}/issue-certificate`
        setCertificateParameter({studentname:formData.studentname, coursename:formData.coursetitle, issuername:formData.issuername})
        let ipfs = await generateAndUpload()
        console.log("RETURNED VALUE OF PINATA IPFS : ", ipfs)
        setFormData({...formData, certificateurl:ipfs})
        let payload = {...formData, certificateurl:ipfs}
        console.log("Payload : ", payload)
        // const reqIssueCertificate = await axios.post(url, formData)
        const reqIssueCertificate = await axios.post(url, payload)
        console.log("Issued Certificate Resp: ", reqIssueCertificate.data)
        // alert("Certificate Issued Successfuly"+reqIssueCertificate.data._id)
        await getEnrolledStudentsWithCertificate();
    }
    const GenerateCertificate = ({certificateParameter}) => {
        const {studentname, coursename, issuername} = certificateParameter
        return(
        <div id="certificate" style={{
            width: '850px', 
            height: '600px', 
            fontFamily: 'Poppins, Arial, sans-serif',
            backgroundImage: "url('/1.png')",
            backgroundSize: 'cover',
            position:'relative',
            display:'inline-block'
            // opacity:0,
            }}>
      
            
            <div className="w-full h-[50px] absolute top-[290px] text-center text-4xl tracking-wide">
                <h1 style={{fontFamily:"Playfair Display, serif"}}>
                {studentname}</h1>  {/** Name */}
            </div>
            
            <div className="w-full h-[40px] absolute top-[395px] text-center text-3xl">
                <h1 style={{fontFamily:"Merriweather, serif"}} >{coursename}</h1>
            </div>
            
            <div className="w-full h-[40px] absolute top-[467px] text-center text-3xl">
                <h1 style={{fontFamily:"Roboto"}} >{issuername}</h1>
            </div>
             <div className="w-full h-[40px] absolute top-[545px] text-center text-1xl">
             <h1 style={{ textAlign: 'center', fontSize:'1em', 
            }}>{`${String(new Date().getDate()).padStart(2, '0')}/${
                String(new Date().getMonth() + 1).padStart(2, '0')
              }/${new Date().getFullYear()}`}</h1>
            </div>
            
           
        </div>
        )
    }


    return(
        <div className='flex flex-col mt-6'>
        <h2 className='font-light text-2xl'>Enrolled Students</h2>
        
        <table className='mt-4 '>
            <thead className=' text-black antialiased text-xl bg-gray-200'>
                <tr className=''>
                    <th>Username</th>
                    <th>Fullname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Course Enrolled</th>
                    <th>Issued Certificate</th>

                </tr>
            </thead>

            <tbody className='text-center'>
            {enrolledStudentsWithCert.map((val,index)=>{
            return (
            <tr className="" key={index}>
            <td className="py-2">{val.username}</td>  
            <td className="py-2">{val.fullname}</td>
            <td className="py-2">{val.email}</td>
            <td className="py-2">{val.phone}</td>
            <td className="py-2">{val.courseEnrolled}</td>
            <td className="py-2">{val.issuedCertificate}</td>
            </tr>)
        })}
            </tbody>
        </table>
        <div className="issue-certificate-form mt-8" >
        <h2 className='font-light text-2xl'>Issue Certificate</h2>

            <form className="flex space-x-8 mt-4 ">
            <select className="bg-gray-300 rounded font-light px-4" name="studentid" value={formData.studentid} onChange={handleChange}>
            <option value="">Select Student </option>
            {enrolledStudentsData.map(student=> <option key={student._id} value={student._id}>{`${student.firstname} ${student.middlename} ${student.lastname}`}</option>)}

            </select>
            <select className="bg-gray-300 rounded font-light px-4" name="courseid" value={formData.courseid} onChange={handleChange}>
            <option value="">Select Course </option>
            {courseData.map(course=> <option value={course._id}>{course.title}</option>)}

            </select>
            <button className="border rounded mx-2  px-2 bg-orange-600" type="submit" onClick={handleSubmit}>Issue Certificate</button>
        </form>
        </div>
        {/* <GenerateCertificate certificateParameter={{studentname:"Sujit Kumar", coursename:"Web2.0 Cohort", issuername:"Shyam Kumar"}}/> */}
        <div>
            <button className="border bg-gray-400 rounded my-2 px-2" position="relative" onClick={setCertificate}>Set Certificate</button>
            <button className="border bg-gray-400 rounded m-2 px-2" position="relative" onClick={downloadCertificate}>Download Certificate</button>
        </div>
        {certificateParameter && <GenerateCertificate certificateParameter={certificateParameter}/>}

        
    </div>
    )
}
