import html2canvas from "html2canvas";

const htmlToCanvasToBlob = async (element, blobMetdata) => {    //blobMetadata --> formData
    const certElement = document.getElementById(element);
    const canvas = await html2canvas(certElement)
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
    const certificateImageBlobForm = new FormData()
    console.log("html2canvas BlobMetaData : ", blobMetdata)
    certificateImageBlobForm.append('file', blob, `Cert_${blobMetdata.studentname}_${blobMetdata.coursetitle}_${blobMetdata.issuername}.png`)
    return certificateImageBlobForm
}


export const downloadCertificate = async (element) =>{
    const certificateElement = document.getElementById(element);
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

export default htmlToCanvasToBlob;