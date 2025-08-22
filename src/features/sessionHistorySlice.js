import { createSlice } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "@/libs/storage";
import { nanoid } from "@reduxjs/toolkit";


const defaultState = []


const initialState = loadFromLocalStorage("sessionHistory", defaultState);


// SLices

export const  sessionHistorySlice = createSlice({
    name: "sessionHistory",
    initialState,
    // list of reducers
    reducers: {
    
        setSessionHistory: (state, action) => {
            const session = {
                sessionId: nanoid(),
                pageName: action.payload.pageName,
                pageUrl: action.payload.pageUrl,
                timestamp: new Date().toISOString(),
                actionType: action.payload.actionType,
            }
            state.push(session)
        },
       
        clearSessionHistory: (state, action) => {
           state.length = 0;
        },

    }
})

export const {
    setSessionHistory,
    clearSessionHistory,
} =  sessionHistorySlice.actions;

export default  sessionHistorySlice.reducer;