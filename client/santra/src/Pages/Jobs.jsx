import React, { useEffect, useState } from "react";
import "./jobs.scss";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Search from "../components/Search";
import { FaRegBookmark } from "react-icons/fa6";
import { HiOutlineLightBulb } from "react-icons/hi";
import { BsCashStack } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { SiOnlyoffice } from "react-icons/si";
const Jobs = () => {
  const [jobSelected, SetJobSelected] = useState(null);
  const [data, setData] = useState([]);
  const [job, setjob] = useState(null);
  const Getjob = async () => {
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

    setData(data);
  };
  const calculateDaysDifference = (createdAt) => {
    const currentDate = new Date();
    const uploadedDate = new Date(createdAt);
    const timeDifference = currentDate - uploadedDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    if (daysDifference == 0) {
      return "Today";
    } else {
      return daysDifference, "day ago";
    }
  };

  useEffect(() => {
    Getjob();
  }, []);

  const HandleClick = (value) => {
    SetJobSelected(value);
    setjob(value);
  };
  return (
    <div className="home">
      <Navbar></Navbar>
      <Search></Search>
      <div className="jobsflexbox">
        <div className="leftJobs">
          <div>
            {data.map((e) => {
              return (
                <div
                  onClick={() => HandleClick(e)}
                  className={`jobs ${jobSelected === e ? "selected" : " "}`}
                >
                  <p className="title">{e.TitleJob}</p>
                  <p className="address">{e.Address}</p>
                  <p className="shift">{e.Shift}</p>
                  <p className="SalaryRange">₹{e.SalaryRange}</p>
                  <p className="SkillRequired">{e.SkillRequired}</p>
                  <p className="Responsibilities">
                    {e.Responsibilities.slice(0, 100)}...
                  </p>
                  <p className="day">
                    Uploaded at {calculateDaysDifference(e.createdAt)}
                  </p>
                  <div className="arrowgandu">
                    {/* <Link to={`/jobs/jobdetail/${e._id}`}>
                      <img src="./arrow.png" alt="" /> <p>Apply</p>
                    </Link> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="boxvideo boxvideo1">
          <video className="video-background" autoPlay muted loop>
            <source src="./bg.mp4" type="video/mp4"></source>
          </video>
        </div> */}
        <div className="rightBigJob">
          {job && (
            <div>
              <div className="rightBigJob2">
                <p className="title">{job.TitleJob}</p>
                <p className="address">{job.Address}</p>
                <p className="SalaryRange">₹{job.SalaryRange}</p> <br />
                <div className="buttonwithBookMark">
                  <Link to={`Resume/${job._id}`}>
                    <button className="btn2">Apply Now</button>
                  </Link>
                  <FaRegBookmark
                    className="svj"
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginLeft: "8px",
                    }}
                  ></FaRegBookmark>
                </div>
              </div>

              <div className="moreDetail">
                <h1>Profile insights</h1>
                <div className="skillIcon">
                  <HiOutlineLightBulb
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginTop: "30px",
                    }}
                  ></HiOutlineLightBulb>
                  <p>Skills</p>
                </div>
                <p className="SkillRequired2">{job.SkillRequired}</p>
                <br />
                <div className="EducationIcon">
                  <FaBookReader
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginTop: "30px",
                    }}
                  ></FaBookReader>
                  <p>Education</p>
                </div>
                <p className="SkillRequired2">{job.Education}</p>
              </div>
              <div className="moreDetail">
                <h1>Job Details</h1>
                <div className="EducationIcon">
                  <BsCashStack
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginTop: "30px",
                    }}
                  ></BsCashStack>
                  <p> Pay</p>
                </div>
                <p className="SkillRequired2">₹{job.SalaryRange}</p>
                <div className="EducationIcon">
                  <SiOnlyoffice
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginTop: "30px",
                    }}
                  ></SiOnlyoffice>
                  <p>Job Type</p>
                </div>
                <p className="SkillRequired2">{job.JobType}</p>

                <div className="EducationIcon">
                  <FaRegClock
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginTop: "30px",
                    }}
                  ></FaRegClock>
                  <p>Shift</p>
                </div>
                <p className="SkillRequired2">{job.Shift}</p>
              </div>
              <div className="moreDetail">
                <h1>Location</h1>
                <div className="EducationIcon">
                  <MdLocationPin
                    style={{
                      fill: "white",
                      fontSize: "25px",
                      marginTop: "30px",
                    }}
                  ></MdLocationPin>
                  <p>{job.Address}</p>
                </div>
              </div>
              <div className="moreDetail">
                <h1>Full Job description</h1>
                <h2>SkillRequired</h2>
                <p>{job.SkillRequiredInDetail}</p>
                <h2>Responsibilities</h2>
                <p>{job.Responsibilities}</p>
              </div>
              {/* <button className="btn2">Apply Now</button> */}
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Jobs;
