import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAimItem } from "../../../models/aim";


// Define the initial state using that type
const initialState: IAimItem = {
    title: "",
    is_done: false,
    progress: 0,
    created_at: "",
    tasks: [],
    parameters: []
}
  

const diarySlice = createSlice({
    name: "diary",
    initialState:{userAims:[initialState]},
    reducers: {
        updateUserAims: (state, action: PayloadAction<IAimItem[]>) => {
            state.userAims = action.payload;
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        //  // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
});

export default diarySlice.reducer;

export const { updateUserAims } = diarySlice.actions;