import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedule } from "./components/actions"

import DaySchedule from "./components/DaySchedule";
import LessonForm from "./components/LessonForm";
import Navigation from "./components/Navigation";
import DayList from "./components/DayList";

const App = () => {
    const dispatch = useDispatch();
    const schedule = useSelector((state) => state.schedule);

    useEffect(() => {
        dispatch(fetchSchedule());
    }, [dispatch]);

    const modifyLesson = (day, lesson, action = "add") => {
        if (action === "add") {
            dispatch({ type: "ADD_LESSON", payload: { day, lesson } });
        } else if (action === "edit") {
            dispatch({
                type: "EDIT_LESSON",
                payload: { day, id: lesson.id, updatedLesson: lesson },
            });
        } else if (action === "delete") {
            dispatch({ type: "DELETE_LESSON", payload: { day, id: lesson.id } });
        }
    };

    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<DayList schedule={schedule} />} />
                <Route
                    path="/schedule/:day"
                    element={
                        <DaySchedule schedule={schedule} onModifyLesson={modifyLesson} />
                    }
                />
                <Route path="/add" element={<LessonForm onModifyLesson={modifyLesson} />} />
            </Routes>
        </Router>
    );
};

export default App;
