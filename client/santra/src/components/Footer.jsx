import React from "react";
import "./Footer.scss";
const Footer = () => {
  const otherImage = "/logoSantra.png";

  return (
    <div className="Footer">
      <div className="footer1">
        <img
          className="logo2"
          src={`./logoSantra.png  `}
          onError={(e) => (e.target.src = otherImage)}
          alt="logo"
        />

        <div>
          <ul className="footerItems">
            <li>About us</li>
            <li>Terms & Condition </li>
            <li>Privacy and Policy</li>
            <li>Trust and safety</li>
            <li>Jobs</li>
            <li>Post job</li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="connect">Connect With Us</h1>
        <ul className="footerSocials">
          <li>
            <img src="/Group 2.png" alt="" />
            <p>Facebook</p>
          </li>
          <li>
            <img src="/Group 3.png" alt="" />
            <p>Youtube</p>
          </li>
          <li>
            <img src="/Group 4.png" alt="" />
            <p>Instagram</p>
          </li>
          <li>
            <img src="/Group 5.png" alt="" />
            <p>Github</p>
          </li>
        </ul>
      </div>
      <div className="copy">Aryan valvi ,All Rights are Reserved</div>
    </div>
  );
};

export default Footer;
