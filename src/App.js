import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import DaySchedule from "./components/DaySchedule";
import LessonForm from "./components/LessonForm";
import Navigation from "./components/Navigation";

const App = () => {
    const [schedule, setSchedule] = useState([]);

    // Funkcja do pobierania danych z API lub localStorage
    const fetchSchedule = async () => {
        const localData = JSON.parse(localStorage.getItem("schedule"));
        console.log("localData", localData); // SprawdŸ, czy dane s¹ w localStorage

        if (localData && localData.length > 0) {
            console.log("Loaded schedule from localStorage");
            setSchedule(localData);
        } else {
            try {
                const response = await axios.get("/api/schedule");
                console.log("Fetched schedule from API:", response.data); // SprawdŸ odpowiedŸ z API
                setSchedule(response.data);
            } catch (error) {
                console.error("Error fetching schedule:", error);
                setSchedule([]);  // Pusta lista w przypadku b³êdu
            }
        }
    };


    // Funkcja do dodawania lekcji
    const addLesson = async (day, lesson) => {
        try {
            // Wyœlij dane do API
            await axios.post("/api/schedule", { day, lesson });

            // Zaktualizuj dane w localStorage
            const updatedSchedule = JSON.parse(localStorage.getItem("schedule")) || [];

            const dayIndex = updatedSchedule.findIndex((d) => d.day === day);
            if (dayIndex === -1) {
                updatedSchedule.push({ day, lessons: [lesson] });
            } else {
                updatedSchedule[dayIndex].lessons.push(lesson);
            }

            // Zapisz zaktualizowane dane w localStorage
            localStorage.setItem("schedule", JSON.stringify(updatedSchedule));

            // Zaktualizuj stan aplikacji
            setSchedule(updatedSchedule);
        } catch (error) {
            console.error("Error adding lesson:", error);
        }
    };

    // Pobieranie danych przy pierwszym renderze
    useEffect(() => {
        fetchSchedule();
    }, []);

    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<DaySchedule schedule={schedule} />} />
                <Route path="/add" element={<LessonForm onAdd={addLesson} />} />
            </Routes>
        </Router>

    );
};

export default App;
