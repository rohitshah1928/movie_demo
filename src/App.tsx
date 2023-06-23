import { useEffect } from 'react';
import './App.css';
import MovieListItems from './components/MovieListItems';
import { movieList } from './store/features/movieSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';



function App() {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(movieList())
    }, [])
    return (
        <>
            <MovieListItems />  
        </>


    );
}

export default App;
