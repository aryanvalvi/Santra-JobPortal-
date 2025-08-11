import React, { useEffect, useState, useRef } from "react";
import "./ResumeDetail.scss";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import skills from "./skill.json";
import axios from "axios";
import { saveAs } from "file-saver";
import { IoCloudUploadSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const ResumeDetail = () => {
  const [showExperience, setShowExperience] = useState(true);
  const [showReference, setshowReference] = useState(true);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [googleId, setGoogleId] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLanguage, setSelectedLanuage] = useState([]);
  const [inputValuelan, setInputValuelan] = useState("");
  const [emptyLink, setEmptyLink] = useState([]);
  const [links, setLinks] = useState("");
  const [links2, setLinks2] = useState({
    link1: "",
    link2: "",
    link3: "",
  });
  const [elinks2, seteLinks2] = useState({
    toggle: true,
    site: "www.google.com",
  });
  const [education, setEducation] = useState("");
  const [educationArryay, setEducationArray] = useState([]);
  const AddEducation = () => {
    setEducationArray([...educationArryay, education]);
    setEducation(" ");
  };
  console.log(links);

  const wordLimit = 105;
  const EducationBro = (e) => {
    const value = e.target.value;
    // const word = value.trim().split(/\s+/).length;
    if (value.length <= wordLimit) {
      setEducation(value);
    } else {
      alert("Max Limit Hit of Words");
    }
  };
  const convertNewlinesToBreaks = (text) => {
    return text.split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  };

  const HandleAddLink = (e) => {
    seteLinks2({ toggle: false });
    if (links.trim() !== "") {
      const condition = emptyLink.length < 3;
      if (condition) {
        setEmptyLink([...emptyLink, links]);
        setLinks("");
      } else {
        alert("Max limit is 3");
      }
      // const condition = links2.length < 3;
      if (!links2.link1) {
        setLinks2({ link1: links });
      } else if (!links2.link2) {
        setLinks2({ ...links2, link2: links });
      } else if (!links2.link3) {
        setLinks2({ ...links2, link3: links });
      }
    } else {
      alert("Please enter link");
    }
  };
  console.log(links2);

  const downloadPdf = (email) => {
    const capture = document.querySelector(".resume");

    html2canvas(capture, { scale: 2 }).then((canvas) => {
      const imgdata = canvas.toDataURL("img/png");
      const doc = new jsPDF({
        orientationL: "portrait",
        unit: "mm",
        format: [210, 297],
      });
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgdata, "PNG", 0, 0, componentWidth, componentHeight);
      doc.setFillColor(255, 255, 255, 0);
      const hyperlinkText = "                            ";
      const hyperlinkText2 = "                            ";
      const hyperlinkText3 = "                              ";
      const hyperlinkText4 = "                              ";
      const x = 10; // X coordinate
      const y = 104; // Y coordinate
      doc.setTextColor(255, 255, 255);
      doc.textWithLink(hyperlinkText, x, y, {
        url: `mailto:${PersonalInfo.email}`,
      });
      doc.textWithLink(hyperlinkText2, x, 142, {
        url: `${links2.link1}`,
      });
      doc.textWithLink(hyperlinkText3, x, 147, {
        url: `${links2.link2}`,
      });
      doc.textWithLink(hyperlinkText4, x, 153, {
        url: `${links2.link3}`,
      });
      doc.save("RESUME.pdf");
    });
  };
  useEffect(() => {
    const isAuth = async () => {
      fetch("http://localhost:5000/isAuth", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((resObj) => {
          console.log(resObj);
          setGoogleId(resObj.user.id);
        });
    };
    isAuth();
  }, []);

  useEffect(() => {
    const fetchImage = async () => {
      if (googleId) {
        try {
          const res = await axios.get(`http://localhost:5000/${googleId}.jpg`, {
            responseType: "arraybuffer",
          });

          const blob = new Blob([response.data], { type: "image/jpeg" });
          const imageUrl = URL.createObjectURL(blob);
          setImageSrc(imageUrl);
        } catch (error) {
          console.error("error fetching", error);
        }
      }
    };
    fetchImage();
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [googleId]);
  const filteredSkills = skills.filter(
    (skill) => skill.toLowerCase().includes(inputValue.toLowerCase())
    // skills.includes(inputValue)
  );

  const filteredLanguage = Language.filter((lan) =>
    lan.toLowerCase().includes(inputValuelan.toLowerCase())
  );

  const [showFilteredSkills, setShowFilteredSkills] = useState(false);
  const [skilltoggel, setSkillToggel] = useState(true);
  console.log(showFilteredSkills);
  const HandleSkillClicked = (skill) => {
    if (expertise.length < 5) {
      setSelectedSkills([...selectedSkills, skill]);
      setInputValue("");
      setExpertise([...expertise, skill]);
      // setShowFilteredSkills(true);
    } else if (expertise2.length < 5) {
      setSkillToggel(true);
      setSelectedSkills([...selectedSkills, skill]);
      setInputValue("");
      setExpertise2([...expertise2, skill]);
      // setShowFilteredSkills(true);
    } else {
      // setShowFilteredSkills(false);
      alert("maximum 10 skill u can add");
      setInputValue("");
    }
  };

  const handleClickOutSide = () => {
    setShowFilteredSkills(!showFilteredSkills);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutSide);
    return () => {
      window.removeEventListener("click", handleClickOutSide);
    };
  }, [showFilteredSkills]);
  const FunctionInputClick = () => {
    setShowFilteredSkills(false);
  };

  const HandleLanguageClicked = (lan) => {
    if (languge.length <= 7) {
      setSelectedLanuage([...selectedLanguage, lan]);
      setLanguage([...languge, lan]);
      setInputValuelan("");
    } else {
      alert("maximum limit is 7");
    }
  };

  const removeSkill = (index) => {
    const theSkiils = [...selectedSkills];
    theSkiils.splice(index, 1);
    setSelectedSkills(theSkiils);
  };
  const removelang = (index) => {
    const lang = [...selectedLanguage];
    lang.splice(index, 1);
    setSelectedLanuage(lang);
  };

  const [Add, setAdd] = useState(false);
  const [Addref, setAddref] = useState(false);
  const Handlesubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Add the new experience to the eexperience array
    const allFieldsFilled = Object.keys(eexperience).every((key) => {
      return eexperience[key].trim() !== "";
    });

    if (!allFieldsFilled) {
      // Clear the input fields after submission

      alert("Please enter a value");
    } else if (existingData.length <= 4) {
      setExistingData([...existingData, eexperience]);
      seteExperience({
        date: "",
        company: "",
        address: "",
        position: "",
      });
      setAdd(true);
      setShowExperience(false);
    } else {
      alert("You can add at max 4 ");
    }
  };
  const [existingData, setExistingData] = useState([]);

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
  const [expertise, setExpertise] = useState([]);
  const [expertise2, setExpertise2] = useState([]);
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
  const [eexperience, seteExperience] = useState({
    date: "",
    company: "",
    address: "",
    position: "",
  });

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

  const HandleReferenceSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.keys(rreferences).every((key) => {
      return rreferences[key].trim() !== "";
    });
    if (!allFieldsFilled) {
      alert("Please enter a value");
    } else if (existingRefrencedata.length <= 3) {
      setExistingRefrencedata([...existingRefrencedata, rreferences]);
      setrReferences({
        name: "",
        position: "",
        company: "",
        phone: "",
        email: "",
      });
      setAddref(true);

      setshowReference(false);
    } else {
      alert("Limit is 3");
    }
  };
  const [rreferences, setrReferences] = useState({
    name: "",
    position: "",
    company: "",
    phone: "",
    email: "",
  });
  const [existingRefrencedata, setExistingRefrencedata] = useState([]);
  const HandlePhotUpload = () => {
    console.log(selectedFile);
    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch("http://localhost:5000/uploads", {
      method: "POST",
      credentials: "include",
      // headers: {
      //   Accept: "application/json",
      //   // "Content-Type": "application/json",
      //   // "Access-Control-Allow-Credentials": true,
      // },
      body: formData,
    })
      .then(
        (res) => console.log(res.data.message),
        setTimeout(() => {
          getImage(); // Fetch and display the image
        }, 1000)
      )
      .catch((err) => console.log("error while uploding", err));
  };

  // useEffect(() => {
  //   getImage();
  // }, [imageUploaded]);
  const getImage = async () => {
    fetch("http://localhost:5000/get-image", {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((resObj) => {
        console.log(resObj[0].toString());
        setImageUploaded(resObj[0].toString());
      });
  };
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
            <p>Education</p>
            <textarea type="text" value={education} onChange={EducationBro} />
            {/* <button className="btn4" onClick={AddEducation}>
              Add
            </button> */}
            <p>Expertise</p>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={FunctionInputClick}
            />
            <ul className="FilteredSkills">
              {showFilteredSkills &&
                filteredSkills.map((skill, index) => (
                  <li
                    className="FilteredSkillOne"
                    key={index}
                    onClick={() => HandleSkillClicked(skill)}
                  >
                    {inputValue && skill}
                  </li>
                ))}
            </ul>
            <h1 className="selectedSkill">Selected Skills</h1>
            {selectedSkills.map((skill, index) => (
              <li key={index}>
                <p className="Cross" onClick={() => removeSkill(index)}>
                  <p>{skill}</p>
                  <p>
                    <RxCross1 className="cross" size="14px" color="red" />
                  </p>
                </p>
              </li>
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
              <li key={index}>
                <p className="Cross" onClick={() => removelang(index)}>
                  <p> {lan}</p>
                  <p>
                    <RxCross1 className="cross" size="14px" color="red" />
                  </p>
                </p>
              </li>
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
            <div className="ExperienceOption">
              <p className="unique">Experience</p>
              <p
                onClick={() => setShowExperience(!showExperience)}
                className="unique unique2"
              >
                No Expeirence
              </p>
            </div>
            <form onSubmit={Handlesubmit}>
              <p>Date</p>
              <input
                value={eexperience.date}
                type="Date"
                onChange={(e) =>
                  seteExperience((prev) => ({
                    ...prev,
                    date: e.target.value,
                  }))
                }
              />
              <p>Company</p>
              <input
                value={eexperience.company}
                type="text"
                onChange={(e) =>
                  seteExperience((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
              />
              <p>Address</p>
              <input
                value={eexperience.address}
                type="text"
                onChange={(e) =>
                  seteExperience((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
              <p>Position</p>
              <input
                value={eexperience.position}
                type="text"
                onChange={(e) =>
                  seteExperience((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              />
              <button className="btn4" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="PersonalInfo">
            <div className="ExperienceOption">
              <p className="unique">Reference</p>
              <p
                onClick={() => setshowReference(!showReference)}
                className="unique unique2"
              >
                No Reference
              </p>
            </div>
            <form onSubmit={HandleReferenceSubmit}>
              <p> Name</p>
              <input
                value={rreferences.name}
                type="text"
                onChange={(e) =>
                  setrReferences((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <p>position</p>
              <input
                value={rreferences.position}
                type="text"
                onChange={(e) =>
                  setrReferences((prev) => ({
                    ...prev,
                    position: e.target.value,
                  }))
                }
              />

              <p>company</p>
              <input
                value={rreferences.company}
                type="text"
                onChange={(e) =>
                  setrReferences((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }))
                }
              />

              <p>phone</p>
              <input
                value={rreferences.phone}
                type="text"
                onChange={(e) =>
                  setrReferences((prev) => ({ ...prev, phone: e.target.value }))
                }
              />

              <p>email</p>
              <input
                value={rreferences.email}
                type="text"
                onChange={(e) =>
                  setrReferences((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <button className="btn4" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="imageUpload">
            <p>Upload your image here</p>
            <div className="underimageflex">
              <input
                className="choosefile"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                id=""
              />
              <button className="btn5" onClick={HandlePhotUpload}>
                <IoCloudUploadSharp className="imageuploadicons" />
                Upload
              </button>
            </div>
            <button
              className="stickybutton btn"
              onClick={() => downloadPdf(PersonalInfo.email)}
            >
              Download
            </button>
            <p>Add your Links</p>
            <input
              className="input"
              type="text"
              onChange={(e) => setLinks(e.target.value)}
            />
            <button className="btn4" onClick={HandleAddLink}>
              Add
            </button>
          </div>
        </div>

        <div className="resume">
          <div className="FlexResume">
            <div className="leftResume">
              <div className="profile-picture">
                {!imageUploaded ? (
                  <img
                    className="imgupload"
                    src="/female.jpg"
                    alt="Profile Picture"
                  />
                ) : (
                  <img
                    className="imgupload"
                    src={`./images/${imageUploaded}`}
                    height={100}
                    width={100}
                    alt="img"
                  />
                )}
              </div>
              <div className="contact">
                <h2>Contact</h2>
                <ul>
                  <li>
                    <strong>Phone:</strong> <br /> {PersonalInfo.number}
                  </li>
                  <li>
                    <strong>Email:</strong> <br />
                    <a href={`mailto:${PersonalInfo.email}`}>
                      {PersonalInfo.email}
                    </a>
                  </li>
                  <li>
                    <strong>Address:</strong> <br /> {PersonalInfo.address}
                  </li>
                  {elinks2.toggle == true ? (
                    <>
                      <div className="linkContainer2">
                        <strong className="linksgandu">My Links</strong>
                        <li>{elinks2.site}</li>
                      </div>
                    </>
                  ) : (
                    <li>
                      <strong className="linksgandu">My Links</strong>
                      <div className="linkContainer">
                        {emptyLink.map((e) => {
                          return <li className="linksli">{e}</li>;
                        })}
                      </div>
                    </li>
                  )}
                </ul>
              </div>
              <div className="education">
                <h2>Education</h2>
                <p>{convertNewlinesToBreaks(education)}</p>
                {/* <ul>
                  <li>
                    {educationArryay.map((e) => {
                      return <li className="educationLi">{e}</li>;
                    })}
                  </li>
                </ul> */}
              </div>
              <div className="expertise">
                <h2>Expertise</h2>
                <ul>
                  {expertise.length > 0 ? (
                    <div className="a">
                      <li>
                        {expertise.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </li>
                      <br />
                      <li>
                        <div className="expertise2">
                          {skilltoggel &&
                            expertise2.map((itm, indexx) => (
                              <li key={indexx}>{itm}</li>
                            ))}
                        </div>
                      </li>
                    </div>
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

            {/* Right Infor */}
            <div className="RightResume">
              <div className="personal-info">
                <h1>{Header.name}</h1>
                <h2>{Header.post}</h2>
                <p>{Header.info}</p>
              </div>
              {showExperience && (
                <div className="experience">
                  <h2>Experience</h2>
                  {Add
                    ? existingData.map((e, index) => (
                        <div key={index} className="experience-item">
                          <h3>{e.date}</h3>
                          <p>
                            <strong>
                              {e.company} | {e.address}
                            </strong>
                          </p>
                          <p>{e.position}</p>
                        </div>
                      ))
                    : experience.map((item, index) => (
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
                </div>
              )}

              {showReference && (
                <div className="reference">
                  <h2>Reference</h2>
                  {!Addref
                    ? references.map((item, index) => (
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
                      ))
                    : existingRefrencedata.map((item, index) => (
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
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {imageSrc ? (
        <img src={imageSrc} alt="User" />
      ) : (
        <div>Loading image...</div>
      )} */}

      <Footer></Footer>
    </div>
  );
};

export default ResumeDetail;
