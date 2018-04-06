import React, { Component } from "react";
import Particles from "react-particles-js";
import styles from "./Home.scss";
import github from "./GitHub.svg";
import stackoverflow from "./StackOverflow.svg";

export default class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.config = {
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 1500
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 2,
            color: "#000000"
          },
          polygon: {
            nb_sides: 1
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.12827296486924183,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 0,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 100,
          color: "#ffffff",
          opacity: 0.26456299004281125,
          width: 0
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "repulse"
          },
          onclick: {
            enable: false,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    };
  }

  render() {
    return (
      <div>
        <Particles params={this.config} className="particles-js" />
        <h1 className="animated fadeInLeft" id="headline">
          hi,
        </h1>
        <p id="subheadline" className="animated fadeInRight">
          Junior Software Engineer | Hobbyist
        </p>
        <div className="icon-container">
          <span>
            <img className="logo" id="github" src={github} alt="GitHub" />
          </span>
          <span>
            <img
              className="logo"
              id="stackoverflow"
              src={stackoverflow}
              alt="Stack Overflow"
            />
          </span>
        </div>
      </div>
    );
  }
}
