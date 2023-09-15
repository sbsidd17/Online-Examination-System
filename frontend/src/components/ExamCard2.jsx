/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function ExamCard2({image, name, totalTests, price, enrolled_users}) {
  return (
    <div className='flex flex-col w-[300px] bg-white rounded-md shadow-md p-5 gap-3'>
      <div className='flex justify-center items-center'>
        <img className='w-[280px]' src={image} alt="ExamThumbnail" />
      </div>
      <div className='font-semibold'>{name}</div>
      <div className='text-sm'>{totalTests} Total Tests</div>
      <div className='text-sm'>Price : {price} Rupees</div>
      <div className='text-sm'>Enrolled Users : {enrolled_users}</div>
      <button className="bg-[#0ad0f4] text-white px-5 py-2 rounded-md transition-all duration-200 hover:bg-[#12c1e0] hover:scale-95">View Test Series</button>
    </div>
  )
}

export default ExamCard2
