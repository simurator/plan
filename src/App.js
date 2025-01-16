import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import DaySchedule from "./components/DaySchedule";
import LessonForm from "./components/LessonForm";
import Navigation from "./components/Navigation";
import DayList from "./components/DayList";

const App = () => {
  const [schedule, setSchedule] = useState([]);

  const fetchSchedule = async () => {
    const localData = JSON.parse(localStorage.getItem("schedule"));
    if (localData) {
      setSchedule(localData);
    } else {
      try {
        const response = await axios.get("/api/schedule");
        setSchedule(response.data);
        localStorage.setItem("schedule", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    }
  };

  const modifyLesson = (day, lesson, action = "add") => {
    const updatedSchedule = [...schedule];
    const dayIndex = updatedSchedule.findIndex((d) => d.day === day);

    if (dayIndex === -1) {
      updatedSchedule.push({ day, lessons: [lesson] });
    } else {
      if (action === "add") {
        updatedSchedule[dayIndex].lessons.push(lesson);
      } else if (action === "edit") {
        const lessonIndex = updatedSchedule[dayIndex].lessons.findIndex(
          (l) => l.id === lesson.id
        );
        if (lessonIndex !== -1) {
          updatedSchedule[dayIndex].lessons[lessonIndex] = lesson;
        }
      } else if (action === "delete") {
        updatedSchedule[dayIndex].lessons = updatedSchedule[dayIndex].lessons.filter(
          (l) => l.id !== lesson.id
        );
      }
    }

    setSchedule(updatedSchedule);
    localStorage.setItem("schedule", JSON.stringify(updatedSchedule));
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<DayList schedule={schedule} />} />
        <Route
          path="/schedule/:day"
          element={<DaySchedule schedule={schedule} onModifyLesson={modifyLesson} />}
        />
        <Route path="/add" element={<LessonForm onModifyLesson={modifyLesson} />} />
      </Routes>
    </Router>
  );
};

export default App;
