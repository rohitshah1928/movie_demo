import axios from "axios";

let isProd=true;
let movieListURL="https://swapi.dev/api/films/?format=json"

const API = axios.create({
    baseURL: movieListURL
});

export const getMovieList= () => API.get('');

