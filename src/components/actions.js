import axios from "axios";
import store from "./Store"; 

export const fetchSchedule = async () => {
    try {
        const response = await axios.get("/api/schedule");
        store.dispatch({ type: "SET_SCHEDULE", payload: response.data });
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const addLesson = async (day, lesson) => {
    try {
        const response = await axios.post("/api/schedule", { day, lesson });
        store.dispatch({ type: "ADD_LESSON", payload: { day, lesson: response.data } });
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const updateLesson = async (day, updatedLesson) => {
    try {
        const response = await axios.put(`/api/schedule/${updatedLesson.id}`, updatedLesson);
        store.dispatch({ type: "EDIT_LESSON", payload: { day, id: updatedLesson.id, updatedLesson: response.data } });
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const deleteLesson = async (day, id) => {
    try {
        await axios.delete(`/api/schedule/${id}`);
        store.dispatch({ type: "DELETE_LESSON", payload: { day, id } });
    } catch (error) {
        store.dispatch({ type: "SET_ERROR", payload: error.message });
    }
};
