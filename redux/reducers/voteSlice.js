import {createSlice} from '@reduxjs/toolkit';

const voteSlice = createSlice({
  name: 'vote',
  initialState: {name: 'none'},
  reducers: {
    SET_VOTE: (state, action) => {
      state.name = action.payload;
    },
},})

export const {SET_VOTE} = voteSlice.actions;
export default voteSlice.reducer;