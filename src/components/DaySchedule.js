import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteLesson} from "./actions"; 

const DaySchedule = () => {
    const { day } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const schedule = useSelector((state) => state.schedule); // Pobieramy schedule z Redux store
    const [sortOrder, setSortOrder] = useState("default");

    useEffect(() => {
        
    }, [day]);

    const handleEdit = (lesson) => {
        navigate("/add", { state: { lesson, day } });
    };

    const handleDelete = (lesson) => {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            dispatch(deleteLesson(day, lesson.id)); // Wysy³amy akcjê do usuniêcia lekcji
        }
    };

    const daySchedule = schedule.find((d) => d.day === day);

    
    const sortLessons = (lessons) => {
        if (sortOrder === "alphabetical") {
            return [...lessons].sort((a, b) => a.subject.localeCompare(b.subject));
        }
        if (sortOrder === "time") {
            return [...lessons].sort((a, b) => a.time.localeCompare(b.time));
        }
        return lessons; 
    };

    const sortedLessons = daySchedule?.lessons
        ? sortLessons(daySchedule.lessons)
        : [];

    return (
        <div>
            <h2>Schedule for {day}</h2>

            {}
            <div>
                <label htmlFor="sortOrder">Sort by:</label>
                <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="alphabetical">Alphabetical (Subject)</option>
                    <option value="time">Time</option>
                </select>
            </div>

            <ul>
                {sortedLessons.length > 0 ? (
                    sortedLessons.map((lesson) => (
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
