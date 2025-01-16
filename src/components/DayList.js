import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DayList = ({ schedule }) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div>
      <h2>Weekly Schedule</h2>
      <ul>
        {daysOfWeek.map((day) => (
          <li key={day}>
            <Link to={`/schedule/${day}`}>{day}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

DayList.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      lessons: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default DayList;
