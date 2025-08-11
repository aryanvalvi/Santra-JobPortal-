import React, { useEffect, useState } from "react";
import "./Navbar.scss";
// import { useAuth } from "../contextApi/AuthContext";
import { Link, Outlet } from "react-router-dom";
import { HiBookmark } from "react-icons/hi";
import { BiBookBookmark } from "react-icons/bi";
import { MdSettings } from "react-icons/md";

import { FaUser } from "react-icons/fa6";
const Navbar = () => {
  // const { user, setUser } = useAuth();
  const otherImage = "/logoSantra.png";
  const [data, setData] = useState({});
  const [userIsThere, setUserisThere] = useState(false);
  const [showToggleOptions, setShowToggleOptions] = useState(false);
  const [showUserIcons, setShowUserIcons] = useState(false);
  // console.log(userIsThere);
  // console.log(data);
  const SignIN = async () => {
    try {
      window.open("http://localhost:5000/auth/google", "_self");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const LogOUt = () => {
    setUserisThere((e) => !e);
    fetch("http://localhost:5000/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
  };
  const GetUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/getUser", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const dataa = await response.json();
      // setData(data.user.photos[0].value);
      setData(dataa);
      console.log(dataa);
      console.log(dataa.user.displayName);

      setUserisThere(true);
      // console.log("Data:", data.user.photos[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    GetUser();
  }, []);

  const getData = async () => {
    const res = await fetch("http://localhost:5000/getJob", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const handleClickOutside = (event) => {
    const userinfoBox = document.querySelector(".userinfo");
    const image = document.querySelector(".userImage");
    if (
      !image.contains(event.target) &&
      userinfoBox &&
      !userinfoBox.contains(event.target)
    ) {
      setShowToggleOptions(!showToggleOptions);
    }
  };

  useEffect(() => {
    if (showToggleOptions == true) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showToggleOptions]);

  return (
    <div className="navbarGandus">
      {console.log("navbar called")}
      <div className="flex1">
        <Link to="/">
          <img
            className="logo"
            src={`./logoSantra.png  `}
            // onError={(e) => (e.target.src = otherImage)}
            alt="logo"
          />
        </Link>
      </div>

      <div className="flex2">
        <nav className="nav">
          <ul className="navElements">
            <Link className="link" to="jobs">
              <li>Jobs</li>
            </Link>

            {/* <Link className="link" to="/postedJob">
              <li>posted Jobs</li>
            </Link> */}

            <li>
              {userIsThere ? (
                <img
                  className="userImage"
                  src={`${data.user.photos[0].value}`}
                  alt="image"
                  onClick={() => {
                    setShowToggleOptions(!showToggleOptions);
                  }}
                />
              ) : (
                <button onClick={SignIN} className="btn">
                  Sign In
                </button>
              )}

              {showToggleOptions && userIsThere && (
                <div className="userinfo">
                  {userIsThere ? (
                    <div className="signInComp">
                      <ul>
                        <li className="normalLi">{data.user.displayName}</li>
                        <li className="smallLI">
                          <HiBookmark size="1.3rem" className="reactIcon" />
                          <p>Saved Jobs</p>
                        </li>
                        <li className="smallLI">
                          <BiBookBookmark size="1.3rem" />
                          <p>My jobs</p>
                        </li>
                        <li className="smallLI">
                          <MdSettings size="1.3rem" />
                          <p>Profile Setting</p>
                        </li>
                        <li>
                          <button onClick={LogOUt} className="btn-logOut">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  ) : (
                    <button onClick={SignIN} className="btn">
                      Sign In
                    </button>
                  )}
                </div>
              )}
            </li>
            <Link className="link" to="postjob">
              <li className="BigLi">Post Jobs</li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
