/* eslint-disable react/prop-types */
import React from 'react'

function AdminDashboardCard({icon, title, total}) {
  return (
    <div className='flex justify-between items-center w-[300px] rounded-md shadow-md py-5 px-10 bg-[#0ad0f4]'>
        {/* left */}
      <div className="flex justify-center items-center">
        {icon}
      </div>
      {/* right */}
      <div className="flex flex-col justify-between items-center text-white">
        <div className='text-sm font-semibold'>{title}</div>
        <div>{total}</div>
      </div>
    </div>
  )
}

export default AdminDashboardCard
