import React from "react";
import "./home.scss";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="homeflex2">
        <Search></Search>
        <div className="home-flex-1">
          <div className="text">
            <p>
              Join the community of SANTRA and Get the Job Asap,click the to
              join now{" "}
              <button className="clickhere">
                <Link className="click" to="/jobs">
                  Click Here
                </Link>
              </button>
            </p>
          </div>
          {/* <h1>hello</h1> */}
          <div className="boxvideo">
            <video className="video-background" autoPlay muted loop>
              <source src="./bg.mp4" type="video/mp4"></source>
            </video>
            <div className="overlay"></div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
