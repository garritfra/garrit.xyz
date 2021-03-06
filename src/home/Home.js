import React, { Component } from "react";
import Particles from "react-particles-js";
import Navbar from "../components/NavBar/Navbar";
import Skills from "../components/skills/Skills";
import "./Home.scss";
import config from "./particleConfig";
import Landing from "../landing/Landing";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Particles params={config} className="particles-js" />
      <Navbar />
      <Landing />
      <Skills />
      <Footer />
    </div>
  );
}
