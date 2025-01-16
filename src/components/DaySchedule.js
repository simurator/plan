import React from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";

const DaySchedule = ({ schedule, onModifyLesson }) => {
  const { day } = useParams();
  const navigate = useNavigate();

  const handleEdit = (lesson) => {
    navigate("/add", { state: { lesson, day } });
  };

  const handleDelete = (lesson) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      onModifyLesson(day, lesson, "delete");
    }
  };

  const daySchedule = schedule.find((d) => d.day === day);

  return (
    <div>
      <h2>Schedule for {day}</h2>
      <ul>
        {daySchedule && daySchedule.lessons.length > 0 ? (
          daySchedule.lessons.map((lesson) => (
            <li key={lesson.id}>
              {lesson.subject} - {lesson.time} - {lesson.teacher} - Room {lesson.room}
              <button onClick={() => handleEdit(lesson)}>Edit</button>
              <button onClick={() => handleDelete(lesson)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No lessons for {day}.</p>
        )}
      </ul>
    </div>
  );
};

DaySchedule.propTypes = {
  schedule: PropTypes.array.isRequired,
  onModifyLesson: PropTypes.func.isRequired,
};

export default DaySchedule;
