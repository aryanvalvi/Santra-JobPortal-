import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./postjob.scss";
import skills from "./skill.json";
const PostJob = () => {
  // const skills = ["Javascript ", "React.js ", "Node.js "];

  const [inputValue, setInputValue] = useState("");
  const [inputValueAdded, setInputValueAdded] = useState([]);
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
  const [showSelectedItem, setShowSelectedItem] = useState(false);

  const SearchItems = (searchItem) => {
    setInputValue(searchItem);
    console.log("Search Items", searchItem);

    if (skills.includes(searchItem) && !inputValueAdded.includes(searchItem)) {
      setInputValueAdded([...inputValueAdded, searchItem]);
      setInputValue("");

      setShowSelectedItem(true);
    }
  };
  const handleDeleteSkill = (index) => {
    const newList = [...inputValueAdded];
    newList.splice(index, 1);
    setInputValueAdded(newList);
    if (newList.length == 0) {
      setShowSelectedItem(false);
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
    <>
      <div className="PostJobdetail">
        <div className="postJob">
          <p className="JobpostH1">Write Your Info Here</p>
          <br />
          <div class="form__group field">
            <input
              className="form__field"
              type="input"
              value={TitleJob}
              onChange={(e) => setTitleJob(e.target.value)}
              name="TitleJob"
              id="TitleJob"
            />
            <label className="form__label" htmlFor="TitleJob">
              TitleJob
            </label>
          </div>
          <br />
          <div className="form__group field">
            <textarea
              className="form__field"
              type="text"
              name="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
              id="Address"
            />
            <label className="form__label" htmlFor="Address">
              Address
            </label>
          </div>
          <br />
          <div className="salaryrange">
            {/* <h1>SalaryRange</h1> */}
            <div className="minsalary ">
              <div className="form__group field">
                <div className="salaray">
                  <p>"₹"</p>
                  <input
                    className="form__field"
                    type="text"
                    name="minSalary"
                    value={minSalary}
                    onChange={(e) =>
                      setminSalary(e.target.value.replace(/\D/g, ""))
                    }
                    id="minSalary"
                  />
                </div>
                <label className="form__label" htmlFor="maxSalary">
                  Min-Salary
                </label>
              </div>
            </div>
            <div className="maxSalary">
              <div className="form__group field">
                <div className="salaray">
                  <p>"₹"</p>
                  <input
                    className="form__field"
                    type="text"
                    name="maxSalary"
                    value={maxSalary}
                    onChange={(e) =>
                      setmaxSalary(e.target.value.replace(/\D/g, ""))
                    }
                    id="maxSalary"
                  />
                </div>
                <label className="form__label" htmlFor="maxSalary">
                  Max-Salary
                </label>
              </div>
            </div>
          </div>
          <br />
          <div className="form__group field">
            <label className="form__label" htmlFor="JobType">
              <h1>JobType</h1>
            </label>
            <select
              // className="postjobinput1"
              className="form__field"
              onChange={(e) => setJobType(e.target.value)}
              name=""
              id=""
            >
              <option>
                <p>Select Job Type</p>
              </option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          <br />
          <div className="form__group field">
            <input
              // className="SkillRequired"
              className="form__field"
              type="text"
              name="SkillRequired"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id="SkillRequired"
            />
            <label className="form__label" htmlFor="SkillRequired">
              <h1>SkillRequired</h1>
            </label>
          </div>
          <br />
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
            {/* <h1>Skiils</h1> */}
            {showSelectedItem && (
              <ul className="skill">
                {inputValueAdded.map((e, index) => {
                  return (
                    <>
                      <div className="selectedSkills">
                        <li onClick={() => handleDeleteSkill(index)}>
                          <li>
                            {e}
                            <img className="cross" src="./cross.png" />
                          </li>
                        </li>
                      </div>
                    </>
                  );
                })}
              </ul>
            )}
          </div>
          <br />
          <div className="form__group field">
            <textarea
              className="form__field"
              // className="Responsibilities"
              type="text"
              name="Responsibilities"
              value={Responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              id="Responsibilities"
            />
            <label className="form__label" htmlFor="Responsibilities">
              Responsibilities
            </label>
          </div>
          <br />
          <div className="form__group field">
            <textarea
              className="form__field"
              type="text"
              name="Benefits"
              value={Benefits}
              onChange={(e) => setBenefits(e.target.value)}
              id="Benefits"
            />
            <label className="form__label" htmlFor="Benefits">
              <h1>Benefits</h1>
            </label>
          </div>
          <br />
          <div className="form__group field">
            <label className="form__label" htmlFor="Shift">
              <h1>Shift</h1>
            </label>
            <select
              className="form__field"
              // className="postjobinput1"
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
          </div>
          <br />
          <div className="form__group field">
            <textarea
              className="form__field"
              type="text"
              name="Education"
              value={Education}
              onChange={(e) => setEducation(e.target.value)}
              id="Education"
            />
            <label className="form__label" htmlFor="Education">
              <h1>Education</h1>
            </label>
          </div>
          <br />
          <div className="form__group field">
            <input
              className="form__field"
              type="text"
              name="CompanyName"
              value={CompanyName}
              onChange={(e) => setCompanyName(e.target.value)}
              id="CompanyName"
            />
            <label className="form__label" htmlFor="CompanyName">
              <h1>CompanyName</h1>
            </label>
          </div>
          <br />
          <div className="form__group field">
            <textarea
              className="form__field"
              type="text"
              name="JobDetail"
              value={JobDetail}
              onChange={(e) => setJobDetail(e.target.value)}
              id="JobDetail"
            />
            <label className="form__label" htmlFor="JobDetail">
              <h1>JobDetail</h1>
            </label>
          </div>
          <br />
          <div className="form__group field">
            <textarea
              className="form__field"
              type="text"
              name="SkillRequiredInDetail"
              value={SkillRequiredInDetail}
              onChange={(e) => setSkillRequiredInDetail(e.target.value)}
              id="SkillRequiredInDetail"
            />
            <label className="form__label" htmlFor="SkillRequiredInDetail">
              <h1>SkillRequiredInDetail</h1>
            </label>
          </div>
          <br />
          <button className="btn" onClick={postJobREQ}>
            Submit
          </button>
        </div>
        <div className="jobpostImageContainer">
          <img className="jobpostjpg" src="./jobpost.jpg" alt="" srcset="" />
        </div>
      </div>
      <div className="home">
        <Footer />
      </div>
    </>
  );
};

export default PostJob;
