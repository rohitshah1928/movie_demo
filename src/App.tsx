import { useEffect } from 'react';
import './App.css';
import { movieList } from './store/features/movieSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import MovieDashboard from './pages/MovieDashboard';



function App() {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(movieList())
    }, [])
    return (
        <>
          <MovieDashboard/> 
        </>


    );
}

export default App;
