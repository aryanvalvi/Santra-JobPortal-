import React from "react";
import Navbar from "../components/Navbar";
import "./Resume.scss";
import Footer from "../components/Footer";
const Resume = () => {
  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="Resume">
        <h1>Choose A Template</h1>
        <div className="templates">
          <img className="ResumeImg" src="/Resume1.webp" alt="img" srcset="" />
          <img className="ResumeImg" src="/Resume2.webp" alt="img" srcset="" />
          <img className="ResumeImg" src="/Resume3.webp" alt="img" srcset="" />
          <img className="ResumeImg" src="/Resume4.jpg" alt="img" srcset="" />
        </div>
        <div className="btn3">
          <button className="btn">Skip</button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Resume;
