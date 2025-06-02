import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {ClipLoader} from "react-spinners"
function Student() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = `${process.env.REACT_APP_API_BASE_URL}/users`;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userdata = await axios.get(url);
        setUserData(userdata.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setUserData([]); // fallback
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

  }, [url]);

  return (
    <div className='flex flex-col mt-6'>
      <h2 className='font-light text-2xl'>All Students</h2>

      {isLoading ? (
        <div className="mt-6 text-center text-gray-500">            
        <ClipLoader className='relative right-[20px]' color="#656565" size={28} />
        </div>
      ) : userData.length === 0 ? (
        <div className='min-h-[412px] w-full mt-4 relative border rounded'>
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-600'>
            No student signups yet — once they do, they’ll appear here!
          </span>
        </div>
      ) : (
        <table className='mt-4 border rounded w-full'>
        <thead className='text-white antialiased text-md font-[900] bg-[#233941]'>
          {/* <thead className='text-black antialiased text-xl bg-gray-200'> */}
            <tr>
              <th>Username</th>
              <th>Fullname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Email Verified</th>
              <th>Phone Verified</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {userData.map((val, index) => (
              <tr key={index}>
                <td>{val.username}</td>
                <td>{`${val.firstname} ${val.middlename} ${val.lastname}`}</td>
                <td>{val.email}</td>
                <td>{val.phone}</td>
                <td>
                  {val.isEmailVerified ? (
                    <span className="text-green-600">✔ Verified</span>
                  ) : (
                    <span className="text-red-500">✖ Not Verified</span>
                  )}
                </td>
                <td>
                  {val.isPhoneVerified ? (
                    <span className="text-green-600">✔ Verified</span>
                  ) : (
                    <span className="text-red-500">✖ Not Verified</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Student;
