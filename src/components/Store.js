import { createStore } from "redux";

// Pocz¹tkowy stan
const initialState = { schedule: [] };

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_LESSON":
            // Dodawanie lekcji do odpowiedniego dnia
            const updatedSchedule = [...state.schedule];
            const dayIndex = updatedSchedule.findIndex(d => d.day === action.payload.day);

            if (dayIndex === -1) {
                updatedSchedule.push({ day: action.payload.day, lessons: [action.payload.lesson] });
            } else {
                updatedSchedule[dayIndex].lessons.push(action.payload.lesson);
            }

            return {
                ...state,
                schedule: updatedSchedule,
            };

        default:
            return state;
    }
};

// Tworzenie store
const store = createStore(reducer);

export default store;
