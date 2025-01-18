import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const LessonForm = ({ onModifyLesson }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { lesson, day: initialDay } = location.state || {};

    const [day, setDay] = useState(initialDay || "");
    const [formLesson, setFormLesson] = useState({
        subject: lesson?.subject || "",
        time: lesson?.time || "",
        teacher: lesson?.teacher || "",
        room: lesson?.room || "",
        id: lesson?.id || Date.now(), // Unikalny identyfikator dla każdej lekcji
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Walidacja: Sprawdzenie, czy wszystkie pola są wypełnione
        if (!day) {
            return alert("Please select a day.");
        }
        if (!formLesson.subject || !formLesson.time || !formLesson.teacher || !formLesson.room) {
            return alert("Please fill in all fields.");
        }
        onModifyLesson(day, formLesson, lesson ? "edit" : "add");
        navigate(`/schedule/${day}`);
    };

    useEffect(() => {
        if (lesson) {
            setFormLesson(lesson);
        }
        if (initialDay) {
            setDay(initialDay);
        }
    }, [lesson, initialDay]);

    return (
        <form onSubmit={handleSubmit}>
            <select value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
            </select>
            <input
                placeholder="Subject"
                value={formLesson.subject}
                onChange={(e) => setFormLesson({ ...formLesson, subject: e.target.value })}
            />
            <input
                placeholder="Time"
                value={formLesson.time}
                onChange={(e) => setFormLesson({ ...formLesson, time: e.target.value })}
            />
            <input
                placeholder="Teacher"
                value={formLesson.teacher}
                onChange={(e) => setFormLesson({ ...formLesson, teacher: e.target.value })}
            />
            <input
                placeholder="Room"
                type="number"
                value={formLesson.room}
                onChange={(e) => setFormLesson({ ...formLesson, room: e.target.value })}
            />
            <button type="submit">
                {lesson ? "Edit Lesson" : "Add Lesson"}
            </button>
        </form>
    );
};

LessonForm.propTypes = {
    onModifyLesson: PropTypes.func.isRequired,
    lesson: PropTypes.shape({
        subject: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        teacher: PropTypes.string.isRequired,
        room: PropTypes.number.isRequired,
        
    }),
    
};

export default LessonForm;
