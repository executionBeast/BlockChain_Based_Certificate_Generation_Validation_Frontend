import { useState } from "react";
import { ClipLoader } from "react-spinners";
// import { Download } from "lucide-react"; // optional: you can use your own icon if not using lucide-react

const Certificate = ({ certificate, isLoading }) => {
    const [hover, setHover] = useState(false);
    const imageUrl = `https://sapphire-adorable-peacock-363.mypinata.cloud/ipfs/${certificate.certificatecid}`;

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `certificate.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div
            className="relative flex items-center justify-center w-[350px] h-[240px] border rounded mt-2 ml-2 overflow-hidden"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            
            {isLoading ? (
                <ClipLoader className="relative right-[0px]" color="#656565" size={24} />
            ) : (
                <>
                    <img
                        className="w-[350px] h-full object-cover"
                        src={imageUrl}
                        alt={`certificate ${certificate.studentname} ${certificate.coursetitle}`}
                    />
                    {hover && (
                        <button
                            onClick={handleDownload}
                            className="absolute bottom-2 right-2 p-2 bg-black bg-opacity-60 text-white rounded hover:bg-opacity-80 transition duration-150"
                            title="Download Certificate"
                        >
                            {/* <Download size={16} /> */}
                            Download
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Certificate;
