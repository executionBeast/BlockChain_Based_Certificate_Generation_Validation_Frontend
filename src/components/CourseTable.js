import React from 'react'
import EnrollCourseButton from './EnrollCourseButton';
import { useEffect } from 'react';
function CourseTable({courseData}) {
  return (
    <div className='course-table'>
        <table className="border w-full">
            <thead className='border bg-gray-200'>
                <tr>
                    <th>Course Name</th>
                    <th>Certificate</th>
                    <th>Issuer</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody class="items-center justify-center">
                {
                    courseData.map((value,index)=>{
                        return(
                            <tr key={index} class="items-center justify-center text-center">
                                <td>{value.title}</td>
                                <td>{value.certitype}</td>
                                <td>{value.issuername}</td>
                                <td> {<EnrollCourseButton courseid={value._id}/> }</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      

    </div>
  )
}

export default CourseTable;