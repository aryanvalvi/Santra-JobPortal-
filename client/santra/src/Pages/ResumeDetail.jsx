import React, { useState } from "react";
import "./ResumeDetail.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import skills from "./skill.json";
const Language = [
  "English",
  "Hindi",
  "Bengali",
  "Telugu",
  "Marathi",
  "Tamil",
  "Urdu",
  "Gujarati",
  "Kannada",
  "Odia",
  "Punjabi",
  "Malayalam",
];

const ResumeDetail = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguage, setSelectedLanuage] = useState([]);
  const [inputValuelan, setInputValuelan] = useState("");

  const filteredSkills = skills.filter(
    (skill) => skill.toLowerCase().includes(inputValue.toLowerCase())
    // skills.includes(inputValue)
  );

  const filteredLanguage = Language.filter((lan) =>
    lan.toLowerCase().includes(inputValuelan.toLowerCase())
  );

  const HandleSkillClicked = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setInputValue("");
    setExpertise([...expertise, skill]);
  };
  const HandleLanguageClicked = (lan) => {
    setSelectedLanuage([...selectedLanguage, lan]);
    setInputValuelan("");

    setLanguage([...languge, lan]);
  };

  const HandleClickExperience = () => {
    seteExperience([...eexperience, ""]);
  };
  const [Header, Setheader] = useState({
    name: "Mariana Anderson",
    post: "Marketing Manager",
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
  });
  const [PersonalInfo, SetPersonalInfo] = useState({
    number: "23314121212",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
    education: "Enter Your Degree, University/College ",
  });
  const [expertise, setExpertise] = useState([
    // "UI/UX",
    // "Visual Design",
    // "Wireframes",
    // "Storyboards",
    // "User Flows",
    // "Process Flows",
  ]);
  const [eexpertise, seteExpertise] = useState([
    "UI/UX",
    "Visual Design",
    "Wireframes",
    "Storyboards",
    "User Flows",
    "Process Flows",
  ]);
  const [languge, setLanguage] = useState([]);
  const [llanguge, setlLanguage] = useState(["English", "Hindi"]);
  const [experience, setExperience] = useState([
    {
      date: "2019 - 2022",
      company: "Company Name",
      address: "123 Anywhere St., Any City",
      position: "Job position here",
    },
    {
      date: "2017 - 2019",
      company: "Company Name",
      address: "123 Anywhere St., Any City",
      position: "Job position here",
    },
    {
      date: "2015 - 2017",
      company: "Company Name",
      address: "123 Anywhere St., Any City",
      position: "Job position here",
    },
  ]);
  const [eexperience, seteExperience] = useState([
    {
      date: "2019 - 2022",
      company: "Company Name",
      address: "123 Anywhere St., Any City",
      position: "Job position here",
    },
  ]);
  const [references, setReferences] = useState([
    {
      name: "Name Surname",
      position: "Job position",
      company: "Company Name",
      phone: "123-456-7890",
      email: "hello@reallygreatsite.com",
    },
    {
      name: "Name Surname",
      position: "Job position",
      company: "Company Name",
      phone: "123-456-7890",
      email: "hello@reallygreatsite.com",
    },
  ]);
  return (
    <div className="home">
      <Navbar></Navbar>
      <div className="resumeBigFlex">
        <div className="LeftInfo">
          <h1 className="h1">Write Your Info Here</h1>
          <div className="PersonalInfo">
            <p className="unique">Basic</p>
            <p>Name</p>
            <input
              type="text"
              onChange={(e) =>
                Setheader((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
            <p>Post</p>
            <input
              type="text"
              onChange={(e) =>
                Setheader((prev) => ({ ...prev, post: e.target.value }))
              }
            />
            <p>Description</p>
            <textarea
              type="text"
              onChange={(e) =>
                Setheader((prev) => ({ ...prev, info: e.target.value }))
              }
            />
          </div>
          <div className="PersonalInfo">
            {/* <p>Contact</p> */}
            <p>Phone No</p>
            <input
              type="text"
              onChange={(e) =>
                SetPersonalInfo((prev) => ({ ...prev, number: e.target.value }))
              }
            />
            <p>Email</p>
            <input
              type="text"
              onChange={(e) =>
                SetPersonalInfo((prev) => ({ ...prev, email: e.target.value }))
              }
            />
            <p>Address</p>
            <textarea
              type="text"
              onChange={(e) =>
                SetPersonalInfo((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
            />
            <p>Expertise</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ul className="FilteredSkills">
              {filteredSkills.map((skill, index) => (
                <li
                  className="FilteredSkillOne"
                  key={index}
                  onClick={() => HandleSkillClicked(skill)}
                >
                  {inputValue && skill}
                </li>
              ))}
            </ul>
            <h1>Selected Skills</h1>
            {selectedSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
            <p>Language</p>
            <input
              type="text"
              value={inputValuelan}
              onChange={(e) => setInputValuelan(e.target.value)}
            />
            <ul className="FilteredSkills">
              {filteredLanguage.map((lan, index) => (
                <li
                  className="FilteredSkillOne"
                  onClick={() => HandleLanguageClicked(lan)}
                >
                  {inputValuelan && lan}
                </li>
              ))}
            </ul>
            <p>Selected Languge</p>
            {selectedLanguage.map((lan, index) => (
              <li key={index}>{lan}</li>
            ))}
            {/* 
            <input
              type="text"
              onChange={(e) =>
                SetPersonalInfo((prev) => ({ ...prev, info: e.target.value }))
              }
            /> */}
          </div>
          <div className="Experience PersonalInfo">
            <p className="unique">Experience</p>
            <p>Date</p>
            <input
              type="Date"
              onChange={(e) =>
                seteExperience((prev) => [{ ...prev[0], date: e.target.value }])
              }
            />
            <p>Company</p>
            <input
              type="text"
              onChange={(e) =>
                seteExperience((prev) => [
                  { ...prev[0], company: e.target.value },
                ])
              }
            />
            <p>Address</p>
            <input
              type="text"
              onChange={(e) =>
                seteExperience((prev) => [
                  { ...prev[0], address: e.target.value },
                ])
              }
            />
            <p>Position</p>
            <input
              type="text"
              onChange={(e) =>
                seteExperience((prev) => [
                  { ...prev[0], position: e.target.value },
                ])
              }
            />
            <button onClick={() => HandleClickExperience()}>Add</button>
          </div>
          <div className="PersonalInfo">
            <p className="unique">Reference</p>
            <p>Company Name</p>
            <input type="text" onChange={(e) => SetName(e.target.value)} />
            <p>position</p>
            <input type="text" onChange={(e) => SetName(e.target.value)} />
            <p>company</p>
            <input type="text" onChange={(e) => SetName(e.target.value)} />
            <p>phone</p>
            <input type="text" onChange={(e) => SetName(e.target.value)} />
            <p>email</p>
            <input type="text" onChange={(e) => SetName(e.target.value)} />
          </div>
        </div>

        <div className="resume">
          <div className="FlexResume">
            <div className="leftResume">
              <div className="profile-picture">
                <img src="/female.jpg" alt="Profile Picture" />
              </div>
              <div className="contact">
                <h2>Contact</h2>
                <ul>
                  <li>
                    <strong>Phone:</strong> <br /> {PersonalInfo.number}
                  </li>
                  <li>
                    <strong>Email:</strong> <br /> {PersonalInfo.email}
                  </li>
                  <li>
                    <strong>Address:</strong> <br /> {PersonalInfo.address}
                  </li>
                </ul>
              </div>
              <div className="education">
                <h2>Education</h2>
                <ul>
                  <li>{PersonalInfo.education}</li>
                </ul>
              </div>
              <div className="expertise">
                <h2>Expertise</h2>
                <ul>
                  {expertise.length > 0 ? (
                    <ul>
                      {expertise.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {eexpertise.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
              <div className="language">
                <h2>Language</h2>
                <ul>
                  {languge.length > 0 ? (
                    <ul>
                      {languge.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      {llanguge.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  )}
                </ul>
              </div>
            </div>
            <div className="RightResume">
              <div className="personal-info">
                <h1>{Header.name}</h1>
                <h2>{Header.post}</h2>
                <p>{Header.info}</p>
              </div>
              <div className="experience">
                <h2>Experience</h2>
                {eexperience.map((item, index) => (
                  <div key={index} className="experience-item">
                    <h3>{item.date}</h3>
                    <p>
                      <strong>
                        {item.company} | {item.address}
                      </strong>
                    </p>
                    <p>{item.position}</p>
                  </div>
                ))}
                <button>Add</button>
              </div>

              <div className="reference">
                <h2>Reference</h2>
                {references.map((item, index) => (
                  <div key={index} className="reference-item">
                    <p>
                      <strong>{item.name}</strong>
                    </p>
                    <p>
                      {item.position}, {item.company}
                    </p>
                    <p>
                      <strong>Phone:</strong> {item.phone}
                    </p>
                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ResumeDetail;
