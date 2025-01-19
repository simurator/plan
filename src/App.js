import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import store from "./components/Store";
import { fetchSchedule } from "./components/actions";

import DaySchedule from "./components/DaySchedule";
import LessonForm from "./components/LessonForm";
import Navigation from "./components/Navigation";
import DayList from "./components/DayList";

const App = () => {
    const schedule = useSelector((state) => state.schedule);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSchedule = async () => {
            await fetchSchedule(); 
            setLoading(false);
        };

        loadSchedule();
    }, []);

    const modifyLesson = async (day, lesson, action = "add") => {
        if (action === "add") {
            store.dispatch({ type: "ADD_LESSON", payload: { day, lesson } });
        } else if (action === "edit") {
            store.dispatch({
                type: "EDIT_LESSON",
                payload: { day, id: lesson.id, updatedLesson: lesson },
            });
        } else if (action === "delete") {
            store.dispatch({ type: "DELETE_LESSON", payload: { day, id: lesson.id } });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

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
