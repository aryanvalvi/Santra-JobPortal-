import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home";
import Jobs from "./Pages/Jobs";
import Jobdetail from "./Pages/Jobdetail";
import Example from "./Pages/Example";
import PostJob from "./Pages/PostJob";
import PostedJob from "./Pages/PostedJob";
import Resume from "./Pages/Resume";
import ResumeDetail from "./Pages/ResumeDetail";
import Experince from "./Pages/Experince";
import Layout from "./components/Layout";
import FirstJobPost from "./Pages/jobpost/FirstJobPost";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home></Home>}>
      {/* <Route index element={<Home></Home>}></Route> */}
      {/* <Route element={<Search></Search>}></Route> */}
      <Route path="jobs" element={<Jobs></Jobs>}></Route>
      <Route path="postjob" element={<PostJob></PostJob>}></Route>
      {/* <Route path="" element={<PostJob></PostJob>}></Route> */}
    </Route>
  )
);

const App = () => {
  const [user, setUser] = useState(null);

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
        setUser(resObj.user);
      });
  };
  useEffect(() => {
    isAuth();
  }, []);
  return (
    <div>
      {
        // <Router>
        //   <Routes>
        //     <Route path="/" element={<Layout></Layout>}></Route>
        //     <Route index element={<Home></Home>}></Route>
        //     <Route
        //       path="/jobPost1"
        //       element={<FirstJobPost></FirstJobPost>}
        //     ></Route>
        //     <Route path="/jobs" element={<Jobs></Jobs>}></Route>
        //     <Route
        //       path="/postJob"
        //       element={
        //         user ? <PostJob></PostJob> : <Navigate to="/"></Navigate>
        //       }
        //     ></Route>
        //     <Route path="/postedJob" element={<PostedJob></PostedJob>}></Route>
        //     <Route
        //       path="/jobs/jobdetail/:id"
        //       element={<Jobdetail></Jobdetail>}
        //     ></Route>
        //     <Route path="/example" element={<Example></Example>}></Route>
        //     <Route path="jobs/Resume/:id" element={<Resume></Resume>}></Route>
        //     <Route path="a" element={<ResumeDetail></ResumeDetail>}></Route>
        //     <Route path="b" element={<Experince></Experince>}></Route>
        //   </Routes>
        // </Router>
      }
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
