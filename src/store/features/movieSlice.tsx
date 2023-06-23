import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    movieData: [],
    filteredMovieData:[],
    loading: true,

};


export const movieList = createAsyncThunk('movie/getMovieList', async () => {
    try {
        const response = await api.getMovieList();
        return JSON.stringify(response.data);
    }
    catch (error:any) {   
    }
})
const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {},

    extraReducers:(builder)=>{
        builder.addCase(movieList.fulfilled, (state, {payload}) => {
            if(payload){
                const data=JSON.parse(payload).results;
                state.movieData=data
                state.filteredMovieData=data;
                state.loading = false;
               
            }  
        })   
    }
})
export default movieSlice.reducer;