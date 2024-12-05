import React, { useEffect, useState } from "react";
import "../Home/Home.css";
import Cover from "../../assets/backgroundhome.jpg";
import Profile from "../../assets/profile.jpg";
import Category from "../Category/Category";
import Search from "../Search/Search";
import Staff from "../Staff/Staff";
import { motion } from "framer-motion";
const Home = () => {

  const [staffData , setStaffData]=useState([]);

  const taskAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const animationDescription = {
    hidden: { opacity: 0, x: 150 },
    visible: { opacity: 1, x: 0 },
  };


   const fechStaff = async ()=>{
    try{
      const apiResource =  await fetch("http://127.0.0.1:8000/api/staff/index");
      if(apiResource.ok){
         const data = await apiResource.json();
      }else{
       throw new Error("HTTP error!")
      }
    }catch(error){
      console.error(error);
    }
     
  }

  useEffect(()=>{
    fechStaff();
  },[])

  return (
    <div className="home-container">
      <div className="home-container-image">
        <img src={Cover} alt="" />
      </div>
      <div className="home-profile">
        <div className="home-profile-content">
          <div className="home-profile-image-name">
            <div className="home-profile-image">
                <img src={Profile} alt="" />
            </div>
            <div className="home-profile-name">
              <div className="home-profile-name-content">
                <p>SEANG KONGHENG</p>
                <small>Manager IT</small>
              </div>
            </div>
          </div>
          <div className="home-profile-even">
            <div className="home-profile-even-content">
              <div className="home-profile-even-button">
                <button>VIEW EVEN</button>
              </div>
              <div className="home-profile-even-count">
                <h3>Even</h3>
                <p>11</p>
              </div>
              <div className="home-profile-even-descousion">
                <h3>Discussions</h3>
                <p>10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Category />
      <Search />
      <Staff />
    </div>
  );
};

export default Home;
