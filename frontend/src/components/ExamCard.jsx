/* eslint-disable react/prop-types */
import React from 'react'
import { FcNext } from 'react-icons/fc'

function ExamCard({name, url}) {
  return (
    <div className='w-[300px] flex justify-between items-center gap-5 bg-white rounded-md shadow-lg p-2 transition-all duration-500 hover:scale-105'>
      <img className='w-[50px] h-[50px] rounded-full' src={url} alt="examLogo" />
      <div>{name}</div>
      <div><FcNext /></div>
    </div>
  )
}

export default ExamCard
