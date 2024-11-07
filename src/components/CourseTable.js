import React from 'react'
import EnrollCourseButton from './EnrollCourseButton';
function CourseTable({courseData}) {
  return (
    <div className='course-table '>
        <table className="border">
            <thead className='border bg-gray-200'>
                <tr>
                    <th>Course Name</th>
                    <th>Certificate</th>
                    <th>Issuer</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    courseData.map((value,index)=>{
                        return(
                            <tr key={index}>
                                <td>{value.title}</td>
                                <td>{value.certitype}</td>
                                <td>{value.issuerid}</td>
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