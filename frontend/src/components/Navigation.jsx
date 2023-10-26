import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import GyanBookLogo from "../assets/logo/GyanBookLogo.png"

function Navigation() {
    const navItems = [
        {
            id: 1,
            name: "Home",
            path: "/"
        },
        {
            id: 2,
            name: "Exams",
            path: "/all-exams"
        },
        {
            id: 3,
            name: "Test Series",
            path: "/all-tests"
        },
        {
            id: 4,
            name: "About",
            path: "/about"
        },
        {
            id: 5,
            name: "Contact",
            path: "/contact"
        },
    ]
  return (
    <>
    {/* navigation */}
      <div className="flex justify-between items-center bg-white text-slate-500 p-3 relative top-0 left-0 h-[70px] w-full z-50 border-b-2">
        {/* left */}
        <div className="flex justify-center items-center gap-5 ">
            <Link to={"/"}>
                <div className="flex justify-center items-center">
                    <img className='w-[150px]' src={GyanBookLogo} alt="logo" />
                </div>
            </Link>
            <div className="flex justify-center items-center gap-10">
            {
                navItems.map((item)=><NavLink className={({isActive})=>(isActive ? "text-[#0ad0f4]": "hover:text-[#0ad0f4]")} key={item.id} to={item.path}>{item.name}</NavLink>)
            }
            </div>
        </div>
        {/* right */}
        <Link to={"/signup"}>
            <button className='bg-green-400 px-5 py-2 text-white rounded-md hover:bg-green-500'>Get Started</button>
        </Link>
      </div>
    </>
  )
}

export default Navigation
