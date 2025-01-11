import React, { useState } from "react";

const LessonForm = ({ onAdd }) => {
    const [day, setDay] = useState("");
    const [lesson, setLesson] = useState({ subject: "", teacher: "", room: "" });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Walidacja
        if (!day || !lesson.subject || !lesson.teacher || !lesson.room) {
            alert("Please fill in all fields.");
            return;
        }

        // Dodanie lekcji
        onAdd(day, { ...lesson, room: parseInt(lesson.room) });

        // Reset formularza
        setDay("");
        setLesson({ subject: "", teacher: "", room: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Day:</label>
                <input
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                />
            </div>
            <div>
                <label>Subject:</label>
                <input
                    type="text"
                    value={lesson.subject}
                    onChange={(e) => setLesson({ ...lesson, subject: e.target.value })}
                />
            </div>
            <div>
                <label>Teacher:</label>
                <input
                    type="text"
                    value={lesson.teacher}
                    onChange={(e) => setLesson({ ...lesson, teacher: e.target.value })}
                />
            </div>
            <div>
                <label>Room:</label>
                <input
                    type="number"
                    value={lesson.room}
                    onChange={(e) => setLesson({ ...lesson, room: e.target.value })}
                />
            </div>
            <button type="submit">Add Lesson</button>
        </form>
    );
};

export default LessonForm;
