import axios from "axios";

export const fetchSchedule = () => async (dispatch) => {
    try {
        const response = await axios.get("/api/schedule");
        dispatch({ type: "SET_SCHEDULE", payload: response.data });
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const addLesson = (day, lesson) => async (dispatch) => {
    try {
        const response = await axios.post("/api/schedule", { day, lesson });
        dispatch({ type: "ADD_LESSON", payload: { day, lesson: response.data } });
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const updateLesson = (day, updatedLesson) => async (dispatch) => {
    try {
        const response = await axios.put(`/api/schedule/${updatedLesson.id}`, updatedLesson);
        dispatch({ type: "EDIT_LESSON", payload: { day, id: updatedLesson.id, updatedLesson: response.data } });
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};

export const deleteLesson = (day, id) => async (dispatch) => {
    try {
        await axios.delete(`/api/schedule/${id}`);
        dispatch({ type: "DELETE_LESSON", payload: { day, id } });
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
    }
};
