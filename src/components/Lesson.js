import React from "react";
import PropTypes from "prop-types";

export const Lesson = ({ subject, time, teacher, room}) => (
  <div>
    <p>Subject: {subject}</p>
    <p>Time: {time}</p>
    <p>Teacher: {teacher}</p>
    <p>Room: {room}</p>
    
  </div>
);

Lesson.propTypes = {
  subject: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  teacher: PropTypes.string.isRequired,
  room: PropTypes.number.isRequired,
};
