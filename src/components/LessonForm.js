import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux"; // Import useDispatch

const LessonForm = ({ onAdd }) => {
    const [day, setDay] = useState("");
    const [lesson, setLesson] = useState({
        subject: "",
        time: "",
        teacher: "",
        room: "",
    });

    // Hook do wywo³ywania akcji Redux
    const dispatch = useDispatch();

    // Funkcja do zapisu do localStorage
    const saveToLocalStorage = (schedule) => {
        localStorage.setItem("schedule", JSON.stringify(schedule));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Walidacja pól
        if (!day || !lesson.subject || !lesson.time || !lesson.teacher || !lesson.room) {
            return alert("Please fill in all fields.");
        }

        // Walidacja room (czy jest liczb¹)
        if (isNaN(lesson.room) || lesson.room.trim() === "") {
            return alert("Room must be a valid number.");
        }

        // Tworzenie akcji do dodania lekcji do store
        dispatch({
            type: "ADD_LESSON",
            payload: { day, lesson: { ...lesson, room: parseInt(lesson.room, 10) } },
        });

        // Po dodaniu lekcji, zapisujemy dane do localStorage
        const updatedSchedule = JSON.parse(localStorage.getItem("schedule")) || [];
        const dayIndex = updatedSchedule.findIndex(d => d.day === day);

        if (dayIndex === -1) {
            updatedSchedule.push({ day, lessons: [{ ...lesson, room: parseInt(lesson.room, 10) }] });
        } else {
            updatedSchedule[dayIndex].lessons.push({ ...lesson, room: parseInt(lesson.room, 10) });
        }

        // Zapisanie zaktualizowanego harmonogramu do localStorage
        saveToLocalStorage(updatedSchedule);

        // Resetowanie formularza po wys³aniu
        setDay("");
        setLesson({
            subject: "",
            time: "",
            teacher: "",
            room: "",
        });
    };

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
                value={lesson.subject}
                onChange={(e) => setLesson({ ...lesson, subject: e.target.value })}
            />
            <input
                placeholder="Time"
                value={lesson.time}
                onChange={(e) => setLesson({ ...lesson, time: e.target.value })}
            />
            <input
                placeholder="Teacher"
                value={lesson.teacher}
                onChange={(e) => setLesson({ ...lesson, teacher: e.target.value })}
            />
            <input
                placeholder="Room"
                type="number"
                value={lesson.room}
                onChange={(e) => setLesson({ ...lesson, room: e.target.value })}
            />
            <button type="submit">Add Lesson</button>
        </form>
    );
};

LessonForm.propTypes = {
    onAdd: PropTypes.func.isRequired,
};

export default LessonForm;
