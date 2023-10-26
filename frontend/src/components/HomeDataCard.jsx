/* eslint-disable react/prop-types */
import React from 'react'

function HomeDataCard({icon, name, data}) {
  return (
    <div className='flex md:justify-between items-center gap-2'>
      <div>{icon}</div>
      <div>
        <div className=''>{name}</div>
        <div className='text-xl font-semibold'>{data}</div>
      </div>
    </div>
  )
}

export default HomeDataCard
