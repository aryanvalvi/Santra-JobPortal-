import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./postjob.scss";
import skills from "./skill.json";
const PostJob = () => {
  // const skills = ["Javascript ", "React.js ", "Node.js "];

  const [inputValue, setInputValue] = useState("");
  const [inputValueAdded, setInputValueAdded] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [TitleJob, setTitleJob] = useState("");
  const [Address, setAddress] = useState("");
  const [minSalary, setminSalary] = useState("");
  const [maxSalary, setmaxSalary] = useState("");
  const [JobType, setJobType] = useState("");
  const [SkillRequired, setSkillRequired] = useState("");
  const [Responsibilities, setResponsibilities] = useState("");
  const [JobDetail, setJobDetail] = useState("");
  const [Benefits, setBenefits] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Shift, setShift] = useState("");
  const [Education, setEducation] = useState("");
  const [SkillRequiredInDetail, setSkillRequiredInDetail] = useState("");

  const SearchItems = (searchItem) => {
    setInputValue(searchItem);
    console.log("Search Items", searchItem);

    if (skills.includes(searchItem) && !inputValueAdded.includes(searchItem)) {
      setInputValueAdded((prev) => [...prev, searchItem]);
    }
  };
  const postJobREQ = async () => {
    try {
      const formData = {
        Benefits,
        Shift,
        Education,
        CompanyName,
        TitleJob,
        Address,
        SalaryRange,
        JobType,
        SkillRequired,
        Responsibilities,
        JobDetail,
        SkillRequiredInDetail,
      };
      const res = await fetch("http://localhost:5000/api/job/postjob", {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        console.log("data send success", await res.json());
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="PostJobdetail">
        <h1>Post a job on Santra</h1>
        <p>The #1 job board for hiring creative professionals.</p>
      </div>
      <div className="postJob">
        <label htmlFor="TitleJob">
          <h1>TitleJob</h1>
        </label>{" "}
        <br />
        <input
          className="postjobinput"
          type="text"
          value={TitleJob}
          onChange={(e) => setTitleJob(e.target.value)}
          name="TitleJob"
          id="TitleJob"
        />
        <br />
        <label htmlFor="Address">
          {" "}
          <h1>Address</h1>
        </label>{" "}
        <br />
        <textarea
          className="postjobinput"
          type="text"
          name="Address"
          value={Address}
          onChange={(e) => setAddress(e.target.value)}
          id="Address"
        />
        <br />
        <label htmlFor="SalaryRange">
          <h1>SalaryRange</h1>
        </label>{" "}
        <br />
        <div className="salaryrange">
          <div className="minsalary">
            <label htmlFor="maxSalary">minSalary</label>
            <div className="salaray">
              <p>"₹"</p>
              <input
                type="text"
                name="minSalary"
                value={minSalary}
                onChange={(e) =>
                  setminSalary(e.target.value.replace(/\D/g, ""))
                }
                id="minSalary"
              />
            </div>
          </div>
          <div className="maxSalary">
            <label htmlFor="maxSalary">maxSalary</label>
            <div className="salaray">
              <p>"₹"</p>
              <input
                type="text"
                name="maxSalary"
                value={maxSalary}
                onChange={(e) =>
                  setmaxSalary(e.target.value.replace(/\D/g, ""))
                }
                id="maxSalary"
              />
            </div>
          </div>
        </div>
        <br />
        <label htmlFor="JobType">
          <h1>JobType</h1>
        </label>{" "}
        <br />
        <select
          className="postjobinput1"
          onChange={(e) => setJobType(e.target.value)}
          name=""
          id=""
        >
          <option>
            <h1>Select Job Type</h1>
          </option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Intern">Intern</option>
        </select>
        <br />
        <label htmlFor="SkillRequired">
          <h1>SkillRequired</h1>
        </label>{" "}
        <br />
        <input
          className="SkillRequired"
          type="text"
          name="SkillRequired"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="SkillRequired"
        />
        {/* <button className="btn btn2" onClick={() => SearchItems(inputValue)}>
          Add Skills
        </button> */}
        <div className="dropdown">
          {skills
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const skill = item.toLowerCase();
              return searchTerm && skill.startsWith(searchTerm);
            })
            .map((item) => {
              return (
                <div className="skills" onClick={() => SearchItems(item)}>
                  {item}
                </div>
              );
            })}
        </div>
        <div className="">
          <h1>Skiils</h1>
          <ul className="skill">
            <li>{inputValueAdded}</li>
          </ul>
        </div>
        <br />
        <label htmlFor="Responsibilities">Responsibilities</label> <br />
        <textarea
          className="Responsibilities"
          type="text"
          name="Responsibilities"
          value={Responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          id="Responsibilities"
        />
        <br />
        <label htmlFor="Benefits">
          <h1>Benefits</h1>
        </label>{" "}
        <br />
        <textarea
          className="Responsibilities"
          type="text"
          name="Benefits"
          value={Benefits}
          onChange={(e) => setBenefits(e.target.value)}
          id="Benefits"
        />
        <br />
        <label htmlFor="Shift">
          <h1>Shift</h1>
        </label>{" "}
        <br />
        <select
          className="postjobinput1"
          onChange={(e) => setShift(e.target.value)}
          name=""
          id=""
        >
          <option>
            <h1>Select Shift</h1>
          </option>
          <option value="Day">Day</option>
          <option value="Night">Night</option>
          <option value="Work from Home">Work from Home</option>
        </select>
        <br />
        <label htmlFor="Education">
          <h1>Education</h1>
        </label>{" "}
        <br />
        <textarea
          className="Responsibilities"
          type="text"
          name="Education"
          value={Education}
          onChange={(e) => setEducation(e.target.value)}
          id="Education"
        />
        <br />
        <label htmlFor="CompanyName">
          <h1>CompanyName</h1>
        </label>{" "}
        <br />
        <input
          className="postjobinput"
          type="text"
          name="CompanyName"
          value={CompanyName}
          onChange={(e) => setCompanyName(e.target.value)}
          id="CompanyName"
        />
        <br />
        <label htmlFor="JobDetail">
          <h1>JobDetail</h1>
        </label>{" "}
        <br />
        <textarea
          className="Responsibilities"
          type="text"
          name="JobDetail"
          value={JobDetail}
          onChange={(e) => setJobDetail(e.target.value)}
          id="JobDetail"
        />
        <br />
        <label htmlFor="SkillRequiredInDetail">
          <h1>SkillRequiredInDetail</h1>
        </label>{" "}
        <br />
        <textarea
          className="Responsibilities"
          type="text"
          name="SkillRequiredInDetail"
          value={SkillRequiredInDetail}
          onChange={(e) => setSkillRequiredInDetail(e.target.value)}
          id="SkillRequiredInDetail"
        />
        <br />
        <button className="btn" onClick={postJobREQ}>
          Submit
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default PostJob;
