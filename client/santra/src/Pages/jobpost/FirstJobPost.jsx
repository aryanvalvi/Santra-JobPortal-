import React from "react";
import Navbar from "../../components/Navbar";
import "./jobpost.scss";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import Footer from "../../components/Footer";
// SwiperCore.use([Autoplay]);
const FirstJobPost = () => {
  return (
    <>
      <div className="home">
        <Navbar></Navbar>
      </div>
      <div className="firstjobpost-Home">
        <div className="firstjobpost-left">
          <h1>
            Hire smarter
            <br /> hire quicker.
          </h1>
          <Link to="/postJob">
            <button className="btn btn7">Post a job free</button>
          </Link>
          <br />
          <Link className="tc">Terms & Conditon</Link>
        </div>
        <div className="firstjobpost-right">
          <img src="./jobposthire.jpg" alt="" />
        </div>
      </div>
      <div className="Step">
        <div className="steps">
          <div className="insteps">
            <p>1</p>
            <h1>Create your free account</h1> <br />
          </div>
          <p className="instepsP">
            All you need Just A Email Address and Good to Go!
          </p>
        </div>
        <div className="steps">
          <div className="insteps">
            <p>2</p>
            <h1>Build your job post</h1> <br />
          </div>
          <p className="instepsP">Add Basic Information About your Job</p>
        </div>
        <div className="steps">
          <div className="insteps">
            <p>3</p>
            <h1>Post your Job offer</h1> <br />
          </div>
          <div className="instepsP">
            <p>Santra will notify you Asap And get your dream talent</p>
          </div>
        </div>
      </div>

      <div className="Testimonials">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div className="InTesti">
              <p>
                "Our hiring process has become so much smoother since we started
                using this job posting website. The interface is intuitive, and
                the quality of applicants has exceeded our expectations. We
                filled three critical positions within two weeks! Highly
                recommend this platform to any company looking to streamline
                their recruitment process."
              </p>
              <div className="TestimonialImg">
                <img className="TI" src="./Test1.jpg" alt="" srcset="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="InTesti">
              <p>
                "I’ve used many job posting websites, but this one stands out.
                The ability to target specific skill sets and industries has
                drastically improved the relevance of our applications. Plus,
                the customer service is top-notch. Whenever I have a question,
                they’re quick to respond and always helpful."
              </p>
              <div className="TestimonialImg">
                <img className="TI" src="Test2.jpg" alt="" srcset="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="InTesti">
              <p>
                "As a small business owner, finding the right talent quickly is
                crucial. This job posting site has been a game-changer for us.
                The user-friendly dashboard and affordable pricing plans make it
                accessible, even for startups like ours. We've hired three
                amazing designers thanks to this site!"
              </p>
              <div className="TestimonialImg">
                <img className="TI" src="Test3.jpg" alt="" srcset="" />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="InTesti">
              <p>
                "This job posting website has revolutionized our recruitment
                strategy. The platform's reach and the detailed analytics
                provided help us make data-driven hiring decisions. We've
                noticed a significant increase in the quality and diversity of
                our candidate pool. It's a must-have tool for any growing
                company."
              </p>
              <div className="TestimonialImg">
                <img className="TI" src="Test4.jpg" alt="" srcset="" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="GetStarted">
        <Link to="/postJob">
          <button className="btn btn7">Click Here to continue</button>
        </Link>
      </div>
      <div className="home">
        <Footer></Footer>
      </div>
    </>
  );
};

export default FirstJobPost;
