import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import "./SkillCard.scss"

export default function SkillCard({ name, logo, rating }) {
  return (
    <div className="card">
      <img className="skill-logo" alt={name} src={logo} />
      <div className="text">{name}</div>
      <div className="star-container">
        {Array.from({ length: rating }).map(x => {
          return (
            <FontAwesomeIcon
              color="gold"
              icon={faStar}
              style={{ margin: "2px" }}
            />
          )
        })}
      </div>
    </div>
  )
}
