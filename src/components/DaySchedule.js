import React from "react";
import { useSelector } from "react-redux";

const DaySchedule = () => {
    const schedule = useSelector(state => state.schedule);  // U¿ywamy hooka useSelector do pobrania danych z store

    return (
        <div>
            {schedule.length > 0 ? (
                schedule.map((day) => (
                    <div key={day.day}>
                        <h2>{day.day}</h2>
                        {day.lessons.length > 0 ? (
                            day.lessons.map((lesson, index) => (
                                <div key={index}>
                                    <p>Subject: {lesson.subject}</p>
                                    <p>Time: {lesson.time}</p>
                                    <p>Teacher: {lesson.teacher}</p>
                                    <p>Room: {lesson.room}</p>
                                </div>
                            ))
                        ) : (
                            <p>No lessons for this day.</p>
                        )}
                    </div>
                ))
            ) : (
                <p>No schedule available.</p>
            )}
        </div>
    );
};

export default DaySchedule;
