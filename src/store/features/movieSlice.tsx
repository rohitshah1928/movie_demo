import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../api';
import { toast } from 'react-toastify';
const initialState = {
    movieData: [],
    filteredMovieData:[],
    error: null,
    loading: true,
    islogged: false
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
                state.islogged = true;
                state.loading = false;
                toast.success("Data loaded Successfully");
            }  
        })   
    }
})
export default movieSlice.reducer;