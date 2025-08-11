import React, { useContext } from "react";
import "./home.scss";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Jobs from "./Jobs";
import { UserContext } from "../contextApi/Auth/Auth";
const Home = () => {
  const { state } = useContext(UserContext);
  console.log("here is the state", state.user.displayName);
  return (
    <>
      <div className="home">
        <Navbar></Navbar>
      </div>
      <div className="homeflex2">
        <Search></Search>
        <div className="home-flex-1">
          {/* <div className="text">
            <p>
              Join the community of SANTRA and Get the Job Asap,click the to
              join now{" "}
              <button className="clickhere">
                <Link className="click" to="/jobs">
                  Click Here
                </Link>
              </button>
            </p>
          </div> */}
          {/* <h1>hello</h1> */}
          {/* <div className="boxvideo">
            <video className="video-background" autoPlay muted loop>
              <source src="./bg.mp4" type="video/mp4"></source>
            </video>
            <div className="overlay"></div>
          </div> */}
        </div>
      </div>
      <Jobs></Jobs>

      <div className="home">
        <Footer></Footer>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default Home;
