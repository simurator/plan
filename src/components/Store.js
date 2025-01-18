import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Użycie eksportu nazwanego


// Początkowy stan
const initialState = { schedule: [] };


// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SCHEDULE":
            return { ...state, schedule: action.payload };
        case "ADD_LESSON":
            const updatedSchedule = [...state.schedule];
            const dayIndex = updatedSchedule.findIndex(
                (d) => d.day === action.payload.day
            );

            if (dayIndex === -1) {
                updatedSchedule.push({
                    day: action.payload.day,
                    lessons: [action.payload.lesson],
                });
            } else {
                updatedSchedule[dayIndex].lessons.push(action.payload.lesson);
            }

            return { ...state, schedule: updatedSchedule };

        case "EDIT_LESSON":
            const editedSchedule = [...state.schedule];
            const dayIdx = editedSchedule.findIndex(
                (d) => d.day === action.payload.day
            );
            const lessonIdx = editedSchedule[dayIdx].lessons.findIndex(
                (l) => l.id === action.payload.id
            );

            if (lessonIdx !== -1) {
                editedSchedule[dayIdx].lessons[lessonIdx] = {
                    ...editedSchedule[dayIdx].lessons[lessonIdx],
                    ...action.payload.updatedLesson,
                };
            }

            return { ...state, schedule: editedSchedule };

        case "DELETE_LESSON":
            const filteredSchedule = state.schedule.map((d) => ({
                ...d,
                lessons: d.lessons.filter((l) => l.id !== action.payload.id),
            }));

            return { ...state, schedule: filteredSchedule };

        default:
            return state;
    }
};

// Tworzenie store z middleware
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
