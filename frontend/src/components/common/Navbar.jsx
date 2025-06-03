import { useCallback, useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavbarLinks } from "../../../data/navbar-links";
import studyNotionLogo from "../../assets/Logo/Logo-Full-Light.png";
import { fetchCourseCategories } from "./../../services/operations/courseDetailsAPI";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSublinks = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetchCourseCategories()
      setSubLinks(res)
    } catch (error) {
      console.log("Could not fetch the category list = ", error)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchSublinks();
  }, [fetchSublinks]);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const [showNavbar, setShowNavbar] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY) setShowNavbar("hide");
      else setShowNavbar("show");
    } else setShowNavbar("top");
    setLastScrollY(window.scrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [controlNavbar]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-900 text-white translate-y-0 transition-all ${showNavbar}`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/" aria-label="Home">
          <img
            src={studyNotionLogo}
            width={120}
            height={30}
            loading="lazy"
            alt="StudyNotion Logo"
          />
        </Link>

        {/* Hamburger menu button - visible on small screens */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          className="sm:hidden flex flex-col h-6 w-6 justify-between items-center group"
        >
          <span
            className={`h-0.5 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              mobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          />
        </button>

        {/* Nav Links - visible for only large devices */}
        <ul className="hidden sm:flex gap-x-6 text-richblack-25">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div
                  className={`group relative flex cursor-pointer items-center gap-1 ${
                    matchRoute("/catalog/:catalogName")
                      ? "bg-yellow-25 text-black rounded-xl p-1 px-3"
                      : "text-richblack-25 rounded-xl p-1 px-3"
                  }`}
                >
                  <p>{link.title}</p>
                  <MdKeyboardArrowDown />
                  <div
                    className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                    flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible 
                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]"
                  >
                    <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                    {loading ? (<p className="text-center ">Loading...</p>)
                      : subLinks.length ? (
                        <>
                          {subLinks?.map((subLink, i) => (
                            <Link
                              to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                              className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                              key={i}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                  </div>
                </div>
              ) : (
                <Link to={link?.path}>
                  <p
                    className={`${
                      matchRoute(link?.path)
                        ? "bg-yellow-25 text-black"
                        : "text-richblack-25"
                    } rounded-xl p-1 px-3`}
                  >
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}

          {/* Services Dropdown */}
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

        {/* Mobile menu - visible on small devices */}
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 z-50 w-full bg-richblack-900 p-4 sm:hidden">
            <ul className="flex flex-col gap-4 text-white">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <details>
                      <summary className="cursor-pointer rounded-xl p-2 hover:bg-richblack-800">
                        Catalog
                      </summary>
                      <div className="mt-2 flex flex-col gap-2 pl-4">
                        {loading ? (
                          <p>Loading...</p>
                        ) : subLinks.length ? (
                          subLinks.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg py-2 px-3 hover:bg-richblack-800"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                          ))
                        ) : (
                          <p>No Courses Found</p>
                        )}
                      </div>
                    </details>
                  ) : (
                    <Link
                      to={link?.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl p-2 hover:bg-richblack-800"
                    >
                      {link.title}
                    </Link>
                  )}
                </li>
              ))}

              <details>
                <summary className="cursor-pointer rounded-xl p-2 hover:bg-richblack-800">
                  Services
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-4">
                  <Link
                    to="/services/institute"
                    className="rounded-lg py-2 px-3 hover:bg-richblack-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Institute
                  </Link>
                  <Link
                    to="/services/student"
                    className="rounded-lg py-2 px-3 hover:bg-richblack-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    For Student
                  </Link>
                </div>
              </details>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
