import React, { useEffect, useState } from "react";
import "./Navbar.scss";
// import { useAuth } from "../contextApi/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const { user, setUser } = useAuth();
  const otherImage = "/logoSantra.png";
  const [data, setData] = useState("");
  const [userIsThere, setUserisThere] = useState(false);
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
      const data = await response.json();
      setData(data.user.photos[0].value);
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

  return (
    <div className="navbarGandus">
      {console.log("navbar called")}
      <div className="flex1">
        <img
          className="logo"
          src={`./logoSantra.png  `}
          // onError={(e) => (e.target.src = otherImage)}
          alt="logo"
        />
      </div>

      <div className="flex2">
        <nav className="nav">
          <ul className="navElements">
            <Link className="link" to="/jobs">
              <li>Jobs</li>
            </Link>
            <Link className="link" to="/postJob">
              <li>Post Jobs</li>
            </Link>
            <Link className="link" to="/postedJob">
              <li>posted Jobs</li>
            </Link>

            <li>
              {userIsThere ? (
                <div className="signInComp">
                  <img className="userImage" src={`${data}`} alt="image" />
                  <button onClick={LogOUt} className="btn-logOut">
                    Logout
                  </button>
                </div>
              ) : (
                <button onClick={SignIN} className="btn">
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
