import { useParams } from "react-router-dom";
import {Lesson } from "./Lesson.js"

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
