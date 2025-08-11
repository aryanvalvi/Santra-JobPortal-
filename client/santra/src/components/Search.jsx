import React, { useEffect, useState, useRef, useContext } from "react";
import "./Search.scss";
import data_skills from "./data_skill.json";
import Jobs from "../Pages/Jobs";
import { UserContext } from "../contextApi/Auth/Auth";
const Search = () => {
  const SearchContext = useContext(UserContext);

  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchParam, setSearchParam] = useState("machine");
  const [toggle, setToggle] = useState(true);
  const inputRef = useRef(null);

  console.log(input1);
  console.log(input2);

  const getsearchData = async (e) => {
    setToggle(true);
    setInput1(e.target.value);
    const res = await fetch(`http://localhost:5000/search?query=${input1}`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    const data = await res.json();
    console.log(data.suggestions);
    setSearchData(data.suggestions);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      // SearchContext.State2Dispatch({ type: "ToggleHit" });
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="SeachHome">
        <div className="MainInput">
          {/* <img className="line" src="./Line 1.png" alt="" /> */}
          <div className="search">
            <input
              ref={inputRef}
              // value={input1}
              value={SearchContext.state2State.input1}
              // onChange={(e) => setInput1(e.target.value)},
              // onChange={(e) => {
              //   setInput1(e.target.value);
              //   setToggle(true);
              // }}
              onChange={(e) => {
                SearchContext.State2Dispatch({
                  type: "input1Change",
                  payload: e.target.value,
                });
                // setInput1(e.target.value);
                setToggle(true);
              }}
              className="searchInput"
              type="text"
              placeholder="PhP developer Intern"
            />
            <div class="vertical-line"></div>
            <input
              value={input2}
              // onChange={(e) => setInput2(e.target.value)}
              className=" searchInput2 "
              type="text"
              placeholder="(Early Dev. Stage) "
            />
            <button onClick={getsearchData} className="searchBtn">
              Search
            </button>
          </div>
          {toggle && !SearchContext.state2State.input1.length == 0 && (
            <div ref={inputRef} className="searchResult">
              {data_skills
                .filter((item) => {
                  const searchTerm =
                    SearchContext.state2State.input1.toLowerCase();
                  const skill = item.toLowerCase();
                  return searchTerm && skill.startsWith(searchTerm);
                })
                .map((item) => {
                  return (
                    <div
                      key={item}
                      onClick={() => {
                        console.log("Clicked item", item);
                        setInput1(item);
                        setToggle(false);
                      }}
                      className="skillsSearch"
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      {/* <Jobs data={searchData}></Jobs> */}
    </>
  );
};

export default Search;
