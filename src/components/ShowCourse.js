import React from 'react'

function ShowCourse({courseData}) {
  return (
    <div className='course-table'>
      {/* {JSON.stringify(courseData)} */}
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Certificate</th>

          </tr>
        </thead>
        <tbody>
          {courseData.map((course,index)=>{
            return(
              <tr key={index}>
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
