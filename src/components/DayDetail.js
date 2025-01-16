import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Lesson } from "./Lesson.js";

const DayDetail = ({ schedule }) => {
  const { day } = useParams();
  const daySchedule = schedule.find((d) => d.day === day);

  return (
    <div>
      <h2>{day}</h2>
      {daySchedule?.lessons.map((lesson) => (
        <Lesson key={lesson.id} {...lesson} />
      )) || <p>No lessons for this day.</p>}
    </div>
  );
};

DayDetail.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      lessons: PropTypes.arrayOf(
        PropTypes.shape({
          subject: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          teacher: PropTypes.string.isRequired,
          room: PropTypes.number.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default DayDetail;
