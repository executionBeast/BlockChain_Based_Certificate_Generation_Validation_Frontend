import React from 'react'

function ShowCourse({courseData}) {
  return (
    <div className='course-table '>
      {/* {JSON.stringify(courseData)} */}
      <table className=' w-full mt-4 bg-[#D1D5DB]'>
        <thead className='text-white antialiased text-md font-[900] bg-[#233941]'>
          <tr className=''>
            
            <th className='font-[400] '>Course</th>
            <th className='font-[400] '>Certificate</th>
            <th className='font-[400] '>Issuer</th>



          </tr>
        </thead>
        <tbody className='text-center'>
          {courseData.map((course,index)=>{
            return(
              <tr
                className=''
              key={index}>
                <td>{course.title}</td>
                <td>{course.certitype}</td>

              </tr>
            )
          })}
        

        </tbody>
      </table>
    </div>
  )
}

export default ShowCourse;
