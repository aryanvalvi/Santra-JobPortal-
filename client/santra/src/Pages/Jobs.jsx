import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../contextApi/Auth/Auth";
const Jobs = () => {
  const props = useContext(UserContext);
  const [propsData, setPropsData] = useState([props]);

  console.log(props.data);

  const [jobSelected, SetJobSelected] = useState(null);
  const [data, setData] = useState([]);
  const [job, setjob] = useState(null);
  const [scrollup, SetScrollUp] = useState(false);
  let lastscroll = 0;
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

  const handleScroll = () => {
    let scrollTop = window.pageYOffset || document.documentElement.scroll;

    if (scrollTop > lastscroll) {
      SetScrollUp(true);
    } else {
      SetScrollUp(false);
    }
  };
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  };

  const debouncedHandleScroll = debounce(handleScroll, 100);
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <div>
      {/* <Navbar></Navbar>
      <Search></Search> */}
      <div className={`headerJob ${scrollup ? "scroll-up-header" : ""}`}>
        <h1>Job Feed</h1>
      </div>
      <div className="jobsflexbox">
        <div
          className={`leftJobs ${jobSelected ? "leftjobFlexNot" : " "} ${
            scrollup ? "scroll-up" : ""
          } `}
        >
          {props.data.length >= 1
            ? props.data.map((e) => {
                return (
                  <div
                    onClick={() => HandleClick(e)}
                    className={`jobs ${
                      jobSelected === e ? "selected" : "JobN"
                    }`}
                  >
                    <p className="title">{e._source.TitleJob}</p>
                    <p className="address">{e._source.Address}</p>
                    <p className="SalaryRangee shift">{e._source.Shift}</p>
                    {e._source.SalaryRange ? (
                      <p className="SalaryRangee">₹{e._source.SalaryRange}</p>
                    ) : (
                      <p className="SalaryRangee">
                        ₹{e._source.maxSalary} - ₹{e._source.minSalary}
                      </p>
                    )}
                    <p className="SalaryRangee">{e._source.SkillRequired}</p>
                    <p className="Responsibilities">
                      {e._source.Responsibilities.slice(0, 100)}...
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
              })
            : data.map((e) => {
                return (
                  <div
                    onClick={() => HandleClick(e)}
                    className={`jobs ${
                      jobSelected === e ? "selected" : "JobN"
                    }`}
                  >
                    <p className="title">{e.TitleJob}</p>
                    <p className="address">{e.Address}</p>
                    <p className="SalaryRangee shift">{e.Shift}</p>
                    {e.SalaryRange ? (
                      <p className="SalaryRangee">₹{e.SalaryRange}</p>
                    ) : (
                      <p className="SalaryRangee">
                        ₹{e.maxSalary} - ₹{e.minSalary}
                      </p>
                    )}
                    <p className="SalaryRangee">{e.SkillRequired}</p>
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
        {/* <div className="boxvideo boxvideo1">
          <video className="video-background" autoPlay muted loop>
            <source src="./bg.mp4" type="video/mp4"></source>
          </video>
        </div> */}
        <div className="rightBigJob">
          {job && props.data.length >= 1
            ? props.data.map((e) => {
                return (
                  <div>
                    <div className="rightBigJob2">
                      <p className="title">{e._source.TitleJob}</p>
                      <p className="address">{e._source.Address}</p>
                      {job.SalaryRange ? (
                        <p className="SalaryRange">₹{e._source.SalaryRange}</p>
                      ) : (
                        <p className="SalaryRange">
                          ₹{e._source.maxSalary} - ₹{e._source.minSalary}
                        </p>
                      )}
                      {/* <p className="SalaryRange">₹{job.SalaryRange}</p> */}
                      <br />
                      <div className="buttonwithBookMark">
                        <Link to={`Resume/${e._source._id}`}>
                          <button className="btn2">Apply Now</button>
                        </Link>
                        <FaRegBookmark
                          className="svj"
                          style={{
                            fill: "black",
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
                            fill: "black",
                            fontSize: "25px",
                            marginTop: "30px",
                          }}
                        ></HiOutlineLightBulb>
                        <p>Skills</p>
                      </div>
                      <p className="SkillRequired2">
                        {e._source.SkillRequired}
                      </p>
                      <br />
                      <div className="EducationIcon">
                        <FaBookReader
                          style={{
                            fill: "black",
                            fontSize: "25px",
                            marginTop: "30px",
                          }}
                        ></FaBookReader>
                        <p>Education</p>
                      </div>
                      <p className="SkillRequired2">{e._source.Education}</p>
                    </div>
                    <div className="moreDetail">
                      <h1>Job Details</h1>

                      {e._source.SalaryRange && (
                        <>
                          <div className="EducationIcon">
                            <BsCashStack
                              style={{
                                fill: "black",
                                fontSize: "25px",
                                marginTop: "30px",
                              }}
                            ></BsCashStack>
                            <p> Pay</p>
                          </div>
                          <p className="SkillRequired2">
                            ₹{e._source.SalaryRange}
                          </p>
                        </>
                      )}
                      <div className="EducationIcon">
                        <SiOnlyoffice
                          style={{
                            fill: "black",
                            fontSize: "25px",
                            marginTop: "30px",
                          }}
                        ></SiOnlyoffice>
                        <p>Job Type</p>
                      </div>
                      <p className="SkillRequired2">{e._source.JobType}</p>

                      <div className="EducationIcon">
                        <FaRegClock
                          style={{
                            fill: "black",
                            fontSize: "25px",
                            marginTop: "30px",
                          }}
                        ></FaRegClock>
                        <p>Shift</p>
                      </div>
                      <p className="SkillRequired2">{e._source.Shift}</p>
                    </div>
                    <div className="moreDetail">
                      <h1>Location</h1>
                      <div className="EducationIcon">
                        <MdLocationPin
                          style={{
                            fill: "black",
                            fontSize: "25px",
                            marginTop: "30px",
                          }}
                        ></MdLocationPin>
                        <p>{e._source.Address}</p>
                      </div>
                    </div>
                    <div className="moreDetail">
                      <h1>Full Job description</h1>
                      <h2>SkillRequired</h2>
                      <p>{e._source.SkillRequiredInDetail}</p>
                      <h2>Responsibilities</h2>
                      <p>{e._source.Responsibilities}</p>
                    </div>
                    {/* <button className="btn2">Apply Now</button> */}
                  </div>
                );
              })
            : job && (
                <div>
                  <div className="rightBigJob2">
                    <p className="title">{job.TitleJob}</p>
                    <p className="address">{job.Address}</p>
                    {job.SalaryRange ? (
                      <p className="SalaryRange">₹{job.SalaryRange}</p>
                    ) : (
                      <p className="SalaryRange">
                        ₹{job.maxSalary} - ₹{job.minSalary}
                      </p>
                    )}
                    {/* <p className="SalaryRange">₹{job.SalaryRange}</p> */}
                    <br />
                    <div className="buttonwithBookMark">
                      <Link to={`Resume/${job._id}`}>
                        <button className="btn2">Apply Now</button>
                      </Link>
                      <FaRegBookmark
                        className="svj"
                        style={{
                          fill: "black",
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
                          fill: "black",
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
                          fill: "black",
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

                    {job.SalaryRange && (
                      <>
                        <div className="EducationIcon">
                          <BsCashStack
                            style={{
                              fill: "black",
                              fontSize: "25px",
                              marginTop: "30px",
                            }}
                          ></BsCashStack>
                          <p> Pay</p>
                        </div>
                        <p className="SkillRequired2">₹{job.SalaryRange}</p>
                      </>
                    )}
                    <div className="EducationIcon">
                      <SiOnlyoffice
                        style={{
                          fill: "black",
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
                          fill: "black",
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
                          fill: "black",
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

      <div className="home">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Jobs;
