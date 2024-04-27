import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostedJob = () => {
  const [job, setJob] = useState([]);
  const getJob = async () => {
    const res = await fetch("http://localhost:5000/postedJob", {
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
    setJob(data);
  };
  useEffect(() => {
    getJob();
  }, []);
  return (
    <div className="home">
      <Navbar></Navbar>
      {job.map((e) => {
        return (
          <div className="jopPosted">
            <h1>{e.Address}</h1>
            <h1>{e.JobDetail}</h1>
            <h1>{e.JobType}</h1>
          </div>
        );
      })}
      <Footer></Footer>
    </div>
  );
};

export default PostedJob;
