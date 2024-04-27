import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
// import
const Jobdetail = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const Getjob = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getJob");
      console.log([res.data]);
      const ThatOne = res.data;
      const NewData = ThatOne.find((e) => e._id === id);
      console.log(NewData);
      setData(NewData);
    } catch (error) {
      console.log("error fetching job data");
    }
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
  }, [id]);
  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="boxvideo">
        <video className="video-background" autoPlay muted loop>
          <source src={`/bg.mp4`} type="video/mp4"></source>
        </video>
      </div>
      <div className="LeftBox">
        <h1>{data.TitleJob}</h1>
        <p className="p1Address">{data.Address}</p>
        <p className="salary">{data.SalaryRange}</p>
        <h1>Job Details</h1>
        <div className="pngs">
          <div className="png1">
            <img src="/cash.png" alt="" />
            <div className="inpng1">
              <p>Pay</p>
              <div className="pricerange">{data.SalaryRange}</div>
            </div>
          </div>
          <div className="png2 png1">
            <img src="/office.png" alt="" />
            <div className="inpng2 inpng1">
              <p>Job Type</p>
              <div className="jobtyperange pricerange">{data.JobType}</div>
            </div>
          </div>
          <div className="png3 png1 png2">
            <img src="/clock.png" alt="" />
            <div className="inpng3 inpng1">
              <p>Shift</p>
              <p className="pricerange">Day-Shift</p>
            </div>
          </div>
        </div>

        <p className="Skills">Skills</p>
        <p className="skillRequired">{data.SkillRequired}</p>
        <p className="Skills">Responsibilities:</p>
        <p className="res">{data.Responsibilities}</p>
        <p className="Skills">Job Details:</p>
        <p className="res">{data.JobDetail}</p>
        <p className="Skills">Skills Required:</p>
        <p className="res">{data.SkillRequiredInDetail}</p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Jobdetail;
