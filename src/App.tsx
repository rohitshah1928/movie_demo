import { useEffect } from 'react';
import './App.css';
import MovieListItems from './components/MovieListItems';
import { movieList } from './store/features/movieSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        console.log("Hi")
        dispatch(movieList())
    }, [])

    return (
        <>
            <MovieListItems />
            <ToastContainer />
        </>


    );
}

export default App;
