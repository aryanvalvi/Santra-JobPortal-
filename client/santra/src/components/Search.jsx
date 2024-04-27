import React, { useState } from "react";
import "./Search.scss";
const Search = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  console.log(input1);
  console.log(input2);
  return (
    <div className="SeachHome">
      <div className="abc"></div>
      {/* <img className="line" src="./Line 1.png" alt="" /> */}
      <div className="search">
        <input
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="searchInput searchInput1"
          type="text"
          placeholder="PhP developer Intern"
        />
        <input
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className=" searchInput2 "
          type="text"
          placeholder="mumbai"
        />
        <button className="searchBtn">Search</button>
      </div>
    </div>
  );
};

export default Search;
