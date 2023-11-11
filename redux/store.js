import {configureStore} from '@reduxjs/toolkit';
import voteReducer from './reducers/voteSlice';
export default configureStore({
    reducer:{
        vote: voteReducer
    }
})