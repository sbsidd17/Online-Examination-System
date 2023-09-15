import React from 'react'
import { useParams } from 'react-router-dom'
import ExamCard from './ExamCard'

function Category() {
    const {id} = useParams()
    console.log(id)
  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-5">
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
                <ExamCard name="SSC CGL" url="https://www.igecorner.com/wp-content/uploads/2019/03/ssc-logo.png" />
            </div>
    </>
  )
}

export default Category
