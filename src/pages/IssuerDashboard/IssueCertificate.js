import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from 'js-cookie'
import html2canvas from "html2canvas"
import GenerateCertificate from "../../components/GenerateCertificate"
import htmlToCanvasToBlob from "../../services/htmlToCanvas.services"
import objectId from 'bson-objectid'
import { ClipLoader } from 'react-spinners';       
import {ToastContainer, toast} from "react-toastify";
// import 'react-toastify/dist'
import 'react-toastify/dist/ReactToastify.css';

export default function IssueCertificate(){
    const userCookieData = Cookies.get("loginState");
    const userdata = JSON.parse(userCookieData)
    const [enrolledStudentsData,setEnrolledStudentsData]=useState([])
    const [courseData, setCourseData] = useState([])
    const [enrolledStudentsWithCert, setEnrolledStudentsWithCert] = useState([])
    const [certificateParameter, setCertificateParameter] = useState({certID: objectId().toHexString()})
    const [IpfsHash, setIpfsHash] = useState('')
    const [showCertificate, setShowCertificate] = useState(false)

    //cert
    // const [certID, setCertID] = useState(objectId().toHexString())
    

    //loading user feedback state
    const [isEnrolledStudentsWithCertificateLoading, setIsEnrolledStudentsWithCertificateLoading] = useState(true)
    const [isSubmitLoading, setIsSubmitLoading] = useState(false)

    const [formData, setFormData] = useState({
        certID: '',
        issuerid:userdata.uid,
        issuername:`${userdata.userdata.firstname} ${userdata.userdata.middlename} ${userdata.userdata.lastname}`,
        courseid:'',
        coursetitle: '',
        studentid: '',
        studentname:'',
        certificatecid:''
    })
    const [customCertID, setCustomCertID] = useState()
    //Fetch Student Data To Select For Issuance
    //Fetch Course Data To Select For Issuance

    const generateCertID = () => {
        const id = objectId().toHexString()
        console.log("Generated ObjectId for Certificate:", id);
        setCustomCertID(id)
        return id;
    }

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
        try{

            const url = `${process.env.REACT_APP_API_BASE_URL}/get-enrolled-students-certificates`
            setIsEnrolledStudentsWithCertificateLoading(true)
            const reqEnrolledStudentsCertificates = await axios.get(url)
            setEnrolledStudentsWithCert(reqEnrolledStudentsCertificates.data.data)
            console.log("Enrolled Student With Cert : ", reqEnrolledStudentsCertificates.data.data)
        }
        catch(err) {
            console.log("Func getEnrolledStudentsWithCertificate Error: ", err)
        }
        finally {
            setIsEnrolledStudentsWithCertificateLoading(false)
        }
        
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
                setCertificateParameter(prev => ({...prev, studentname:studentname, issuername: formData.issuername}))

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
        
        
    }

    const generateAndUpload = async () =>{
        // const certificateEl = document.getElementById('certificate');
        // const canvas = await html2canvas(certificateEl)
        // const blob  = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
        // const certificateImageForm = new FormData()
        // certificateImageForm.append('file', blob, `Cert_${formData.studentname}_${formData.coursetitle}_${formData.issuername}.png`);
        const certificateImageForm = await htmlToCanvasToBlob('certificate', formData)
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.studentid.length === 0 || formData.courseid === 0 ){
            return  toast("Please Select Student and Course First",{
            position: "top-right",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            style:{backgroundColor:'#F37331'}
            })
        }
        try{
        // let certificateId = generateCertID();
        const url = `${process.env.REACT_APP_API_BASE_URL}/issue-certificate`
        console.log("Cert MetaData : ", 
            {
                studentname:formData.studentname, 
                coursename:formData.coursetitle, 
                issuername:formData.issuername,
                certificateid:certificateParameter.certID
            })
        setCertificateParameter(prev=> ({...prev, studentname:formData.studentname, coursename:formData.coursetitle, issuername:formData.issuername}))
        setIsSubmitLoading(true)
        let ipfs = await generateAndUpload()
        console.log("RETURNED VALUE OF PINATA IPFS : ", ipfs)
        setFormData({...formData, certificatecid:ipfs, certID:certificateParameter.certID})
        let payload = {...formData, certificatecid:ipfs, certID:certificateParameter.certID}
        console.log("Payload : ", payload)
        // const reqIssueCertificate = await axios.post(url, formData)
        const reqIssueCertificate = await axios.post(url, payload)
        // setRespIssueCertificate(reqIssueCertificate.data.data)
        console.log("Issued Certificate Resp: ", reqIssueCertificate.data.data)
        let respIssueCertificate = reqIssueCertificate.data.data
        setCertificateParameter({certID:objectId().toHexString()})
        console.log("CERT DATA WITH QRCODE URL : ", respIssueCertificate)
            // {
            //     studentname:respIssueCertificate.studentname, 
            //     coursename:respIssueCertificate.coursetitle,
            //     issuername:respIssueCertificate.issuername, 
            //     certificate: respIssueCertificate
            // }
        // setCertificateParameter(
        //     {
        //         studentname:respIssueCertificate.studentname, 
        //         coursename:respIssueCertificate.coursetitle, 
        //         issuername:respIssueCertificate.issuername, 
        //         certificate: respIssueCertificate
        //     })
        // let ipfs = await generateAndUpload()
        

        // alert("Certificate Issued Successfuly"+reqIssueCertificate.data._id)
        toast("Certificate Issued Successfully!",{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            })
        //renew certID
        // setCertID(objectId().toHexString())

        await getEnrolledStudentsWithCertificate(); 
        // setShowCertificate(false)
        }
        catch(err) {
        console.log("ERROR ISSUING :", err)
        toast("Error Encountered While Certificate Issuance!",{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            style:{backgroundColor:'#F37331'}
            })
        }
        finally {
        setIsSubmitLoading(false)
        setFormData(prev => ({...prev, 
            courseid:'',
            coursetitle: '',
            studentid: '',
            studentname:'',
        }))
        }

    }


    //    const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const url = `${process.env.REACT_APP_API_BASE_URL}/issue-certificate`
    //     console.log("Cert MetaData : ", {studentname:formData.studentname, coursename:formData.coursetitle, issuername:formData.issuername})
    //     // setCertificateParameter({studentname:formData.studentname, coursename:formData.coursetitle, issuername:formData.issuername})
    //     let ipfs = await generateAndUpload()
    //     console.log("RETURNED VALUE OF PINATA IPFS : ", ipfs)
    //     setFormData({...formData, certificateurl:ipfs})
    //     let payload = {...formData, certificateurl:ipfs}
    //     console.log("Payload : ", payload)
    //     // const reqIssueCertificate = await axios.post(url, formData)
    //     const reqIssueCertificate = await axios.post(url, payload)
    //     console.log("Issued Certificate Resp: ", reqIssueCertificate.data)
    //     // alert("Certificate Issued Successfuly"+reqIssueCertificate.data._id)
    //     await getEnrolledStudentsWithCertificate(); 
    //     setShowCertificate(false)

    // }

    return(
        <div className='flex flex-col mt-6'>
        <ToastContainer/>
        <h2 className='font-light text-2xl'>Enrolled Students</h2>
        
        {
            isEnrolledStudentsWithCertificateLoading ? (
            <div className="mt-6 text-center text-gray-500">            
                <ClipLoader className='relative right-[20px]' color="#656565" size={28} />
            </div>
        )  : enrolledStudentsWithCert.length === 0 ? 
        (
        <div className='min-h-[212px] w-full mt-4 relative border rounded'>
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600'>
          {courseData.length === 0 ? 
            'No courses created yet — added course will be enrolled by students then issuance'
           :
            'No enrollments yet -- Encourage students to enroll in your courses'
            }
            
          </span>
        </div> 
        ) 
        :
        
        (
        <table className='mt-4 '>
        <thead className='text-white antialiased text-md font-[900] bg-[#233941]'>
            {/* <thead className=' text-black antialiased text-xl bg-gray-200'> */}
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
            <td className="py-2">
                {val.issuedCertificate === "Not Issued" ? (
                <span className="text-red-500">{val.issuedCertificate}</span>
                ) : 
                (
                <a className="text-green-500" href={`https://sapphire-adorable-peacock-363.mypinata.cloud/ipfs/${val.issuedCertificate}`} target="_blank ">🔗Issued</a>
                )}
            </td>
            </tr>)
        })}
            </tbody>
        </table>
        )
        }


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
            {isSubmitLoading ? 
            <ClipLoader className='relative right-[0px]' color="#656565" size={24} /> 
            :
            <button disabled={courseData.length !== 0 && enrolledStudentsData !== 0 ? false : true} className="border rounded mx-2  px-2 bg-orange-600" type="submit" onClick={handleSubmit}>Issue Certificate</button>
            }   
        </form>
        </div>
        {/* <GenerateCertificate certificateParameter={{studentname:"Sujit Kumar", coursename:"Web2.0 Cohort", issuername:"Shyam Kumar"}}/> */}
        <div>
            <button className="border bg-gray-400 rounded my-2 px-2 "  position="relative" onClick={()=>{setShowCertificate(true)}}>Preview Certificate</button>
            {/* <button className="border bg-gray-400 rounded m-2 px-2" position="relative" onClick={downloadCertificate}>Download Certificate</button> */}
        </div>
        {certificateParameter && <GenerateCertificate showCertificate={showCertificate} certificateParameter={certificateParameter}/>}

        
    </div>
    )
}
