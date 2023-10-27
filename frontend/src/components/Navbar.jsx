import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink, useNavigate } from "react-router-dom";
import GyanBookLogo from "../assets/logo/GyanBookLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const navItems = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Exams",
      path: "/all-exams",
    },
    {
      id: 3,
      name: "Test Series",
      path: "/all-tests",
    },
    {
      id: 4,
      name: "About",
      path: "/about",
    },
    {
      id: 5,
      name: "Contact",
      path: "/contact",
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const isLoggedIn = useSelector((state) => state?.auth.isLoggedIn);
  // console.log(isLoggedIn)
  async function logoutHandler() {
    const res = await dispatch(logout());
    if(res.type === "/auth/logout/fulfilled"){
      navigate("/login")
    }
  }

  return (
    <nav className="fixed top-0 left-0 h-[70px] w-full z-20 flex shrink-0 items-center space-x-2 bg-white text-slate-500 py-6 px-4 sm:px-6 border-b-2 ">
      {/* Logo */}
      <div className="h-9 text-heading">
        <Link to={"/"}>
          <div className="flex justify-center items-center">
            <img className="w-[150px]" src={GyanBookLogo} alt="logo" />
          </div>
        </Link>
      </div>
      <div className="flex-1">
        <div className="absolute inset-y-0 inset-x-0 hidden items-center justify-center space-x-1.5 px-4 md:flex">
          <div className="flex justify-center items-center gap-10">
            {navItems.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-[#0ad0f4]" : "hover:text-[#0ad0f4]"
                }
                key={item.id}
                to={item.path}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div className="z-10">
        <Link to={"/signup"}>
          {isLoggedIn === false ? (
            <button
              type="button"
              className="bg-green-400 px-5 py-2 text-white rounded-md hover:bg-green-500 hidden cursor-pointer items-center justify-center border-muted-3  text-base font-semibold  shadow-sm hover:text-heading focus:text-heading focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-0 disabled:opacity-30 disabled:hover:text-text md:inline-flex"
            >
              Get Started
            </button>
          ) : (
            <button
              onClick={logoutHandler}
              type="button"
              className="bg-green-400 px-5 py-2 text-white rounded-md hover:bg-green-500 hidden cursor-pointer items-center justify-center border-muted-3  text-base font-semibold  shadow-sm hover:text-heading focus:text-heading focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-0 disabled:opacity-30 disabled:hover:text-text md:inline-flex"
            >
              Logout
            </button>
          )}
        </Link>
      </div>

      <Menu as="div" className="relative md:hidden">
        <Menu.Button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-xl border-none border-transparent bg-transparent p-2 font-semibold text-text hover:bg-heading/5 hover:text-heading focus:bg-heading/5 focus:outline-none focus:ring-2 focus:ring-heading/80 focus:ring-offset-0 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-text"
        >
          <AiOutlineMenu className="h-5 w-5 text-gray-900" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-40 mt-2 w-56 origin-top-right rounded-xl bg-white py-3 shadow-xl focus:outline-none">
            {navItems.map((item) => {
              return (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <Link
                      to={item.path}
                      className={`${
                        active ? "bg-muted-1 text-heading" : "text-text"
                      } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              );
            })}
            <Menu.Item>
              {({ active }) =>
                isLoggedIn === true ? (
                  <button
                    onClick={logoutHandler}
                    className={`${
                      active ? "bg-muted-1 text-heading" : "text-text"
                    } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to={"/signup"}>
                    <button
                      className={`${
                        active ? "bg-muted-1 text-heading" : "text-text"
                      } flex w-full cursor-pointer items-center px-4 py-2 text-sm font-semibold`}
                    >
                      Get Started
                    </button>
                  </Link>
                )
              }
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </nav>
  );
}
