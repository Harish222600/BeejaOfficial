import { useCallback, useEffect, useState } from "react"
import { Link, matchPath, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"

import { NavbarLinks } from "../../../data/navbar-links"
import studyNotionLogo from '../../assets/Logo/Logo-Full-Light.png'
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI'


import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md"

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchSublinks = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetchCourseCategories()
      if (res && Array.isArray(res)) {
        setSubLinks(res)
      } else {
        setSubLinks([])
      }
    } catch (error) {
      console.log("Could not fetch the category list = ", error)
      setSubLinks([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSublinks()
  }, [fetchSublinks])

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const [showNavbar, setShowNavbar] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) setShowNavbar('hide')
      else setShowNavbar('show')
    } else setShowNavbar('top')
    setLastScrollY(window.scrollY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [controlNavbar])

  return (
    <nav className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-all ${showNavbar}`}>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        <Link to="/" aria-label="Home">
          <img src={studyNotionLogo} width={120} height={30} loading='lazy' alt="StudyNotion Logo" />
        </Link>

        {/* Nav Links - visible for only large devices */}
        <ul className='hidden sm:flex gap-x-6 text-richblack-25'>

          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                    ? "bg-yellow-25 text-black rounded-xl p-1 px-3"
                    : "text-richblack-25 rounded-xl p-1 px-3"
                  }`}>
                  <p>{link.title}</p>
                  <MdKeyboardArrowDown />
                  <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                    <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                    {loading ? (
                      <div className="flex items-center justify-center p-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-richblack-900"></div>
                      </div>
                    ) : (
                      <>
                        {subLinks?.length > 0 ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 transition-all duration-200"
                              key={i}
                            >
                              <p className="text-richblack-900">{subLink.name}</p>
                            </Link>
                          ))
                        ) : (
                          <div className="py-4 pl-4 text-richblack-900">
                            No categories available
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={link?.path}>
                  <p className={`${matchRoute(link?.path) ? "bg-yellow-25 text-black" : "text-richblack-25"} rounded-xl p-1 px-3`}>
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}

          {/* Services Dropdown - right next to Catalog */}
          <li className="relative group flex cursor-pointer items-center gap-1 rounded-xl p-1 px-3 text-richblack-25 hover:bg-richblack-50">
            <span>Services</span>
            <MdKeyboardArrowDown />
            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] -translate-x-1/2 translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[250px]">
              <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 select-none rounded bg-richblack-5"></div>
              <Link
                to="/services/institute"
                className="rounded-lg bg-transparent py-2 px-3 hover:bg-richblack-50"
              >
                For Institute
              </Link>
              <Link
                to="/services/student"
                className="rounded-lg bg-transparent py-2 px-3 hover:bg-richblack-50"
              >
                For Student
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
