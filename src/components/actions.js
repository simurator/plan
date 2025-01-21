import axios from "axios";
import store from "./Store";  // Adjust path to your store

// Action to fetch the schedule
export const fetchSchedule = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("/api/schedule");  // Make an API call
            dispatch({ type: "SET_SCHEDULE", payload: response.data });  // Dispatch SET_SCHEDULE with fetched data
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });  // Handle error
        }
    };
};

// Action to add a lesson
export const addLesson = (day, lesson) => {
    return async (dispatch) => {
        try {
            const response = await axios.post("/api/schedule", { day, lesson });  // Send POST request to API
            dispatch({ type: "ADD_LESSON", payload: { day, lesson: response.data } });  // Dispatch ADD_LESSON with the response data
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });  // Handle error
        }
    };
};

// Action to update a lesson
export const updateLesson = (day, updatedLesson) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`/api/schedule/${updatedLesson.id}`, updatedLesson);  // PUT request to update lesson
            dispatch({ type: "EDIT_LESSON", payload: { day, id: updatedLesson.id, updatedLesson: response.data } });  // Dispatch EDIT_LESSON
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });  // Handle error
        }
    };
};

// Action to delete a lesson
export const deleteLesson = (day, id) => {
    return async (dispatch) => {
        try {
            await axios.delete(`/api/schedule/${id}`);  // DELETE request to remove lesson
            dispatch({ type: "DELETE_LESSON", payload: { day, id } });  // Dispatch DELETE_LESSON
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: error.message });  // Handle error
        }
    };
};
