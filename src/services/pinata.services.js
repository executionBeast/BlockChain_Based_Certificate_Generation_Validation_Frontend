
const uploadToPinata = async (certificateImageBlob) =>{
    const certificateEl = document.getElementById('certificate');
    const canvas = await html2canvas(certificateEl)
    const blob  = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    const certificateImageForm = new FormData()
    certificateImageForm.append('file', blob, `Cert_${formData.studentname}_${formData.coursetitle}_${formData.issuername}.png`);
    try{
        const pinataUrl ='https://api.pinata.cloud/pinning/pinFileToIPFS'
        const res = await axios.post(pinataUrl,certificateImageBlob,
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
        return {status:true, ipfsCID : res.data.IpfsHash}


    }
    catch(err){
        console.log("Pinata Upload Error : ", err)
        // alert("Failed to upload to IPFS.");
        return {status: false, msg: err}
    }
}
