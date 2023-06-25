import React, { useEffect, useState } from 'react'

import axios from 'axios';
import SearchInput from './SearchInput';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { filterBySearch, handleSortingUtils } from '../utils/Utility';
import ReactStars from 'react-stars';
import { Oval } from 'react-loader-spinner';
import Ratingchips from './Ratingchips';

const MovieListItems = () => {

    const { movieData, loading } = useSelector((state: RootState) => state.movie);
    const [filterMovielist, setFilterMovielist] = useState<[key: string][]>(movieData)

    const [order, setOrder] = useState('asc');
    const [selectedMovieDetail, setSelectedMovieDetail] = useState({
        title: "",
        opening_crawl: "",
        director: "",
        episode_id: "",
        poster: '',
        rating: ''
    })
    useEffect(() => {
        setFilterMovielist(movieData)
    }, [movieData])

    const handleClick = (data: any) => {
        axios.get(`https://www.omdbapi.com/?apikey=b9a5e69d&t=${data.title}&Episode=${data.episode_id}`).then((movieDetail: any) => {
            setSelectedMovieDetail({ ...data, poster: movieDetail.data.Poster })

        })
    }


    const handleSorting = (sortFieldName: string) => {

        order === 'asc' ? setOrder('desc') : setOrder('asc');
        setFilterMovielist(handleSortingUtils(order, sortFieldName, filterMovielist))

    }

    const handleInputSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        setFilterMovielist(filterBySearch(e.currentTarget.value, movieData))

    };

    return (
        <section className="antialiase text-gray-600 px-4 h-full">
            {
                loading ? <div className='flex justify-center items-center h-full' title='loading'>
                    <Oval
                        height={50}
                        width={50}
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass="loaing"
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#4fa94d"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div> :

                    <div className=" xl:flex flex-none container my-4 md:min-w-0 min-w-full"  title='movielistcontainer'>

                        <div className="w-full max-w-2xl   bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <SearchInput
                                    type="search"
                                    placeholder="Search..."
                                    name="search"
                                    onChange={(e: React.SyntheticEvent<HTMLInputElement>) => handleInputSearchChange(e)} />
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto" >
                                    <table className="table-auto min-w-4xl" >
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-1 xl:p-2 md:p-2 whitespace-nowrap" >
                                                    <div className="font-semibold text-left text-xs" onClick={() => handleSorting('episode_id')}>Episode No</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap" >
                                                    <div className="font-semibold text-left" onClick={() => handleSorting('title')}>Title</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-left">Rating</div>
                                                </th>
                                                <th className="p-2 whitespace-nowrap">
                                                    <div className="font-semibold text-center" onClick={() => handleSorting('release_date')}>Date</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        {
                                            filterMovielist?.map((item: any,index) => (
                                                <tbody className="text-xs sm:text-sm  divide-y divide-gray-100 cursor-pointer" key={index}>
                                                    <tr onClick={() => handleClick(item)} data-testid="table-row" >
                                                        <td className="p-1 sm:p-2 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div>{"EPISODE " + item.episode_id}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-1 sm:p-2 whitespace-nowrap">
                                                            <div className="text-left">{"EPISODE " + item.episode_id}-{item.title}</div>
                                                        </td>
                                                        <td className="p-1 sm:p-2 whitespace-nowrap flex flex-row">
                                                            <ReactStars
                                                                count={10}
                                                                size={18}
                                                                edit={false}
                                                                value={9}
                                                                color2={'#ffd700'} />

                                                        </td>
                                                        <td className="p-1 sm:p-2 whitespace-nowrap">
                                                            <div className="text-left font-medium text-green-500">{item.release_date}</div>
                                                        </td>

                                                    </tr>

                                                </tbody>
                                            ))
                                        }

                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="w-full max-w-2xl xl:ml-2 xs:mt-1 md:mt-0 container bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-400">Movie Details</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-none">

                                    {
                                        selectedMovieDetail.title ? <div title="movie-details">
                                            <div className="font-semibold text-gray-800">{"EPISODE " + selectedMovieDetail.episode_id} -{selectedMovieDetail.title}</div>

                                            <div className='flex flex-column my-8'>
                                                <div className="w-30  flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-none" src={selectedMovieDetail.poster} width="120" height="400" alt="Alex Shatov" /></div>
                                                <div className=" xs:text-xs sm: text-sm md:text-md text-gray-800 max-h-52 w-full overflow-auto">{selectedMovieDetail.opening_crawl}</div>

                                            </div>

                                            <div className="font-medium text-gray-800">{"Directed By: " + selectedMovieDetail.director}</div>
                                            <div className='flex flex-row items-center'>

                                                <div className="font-medium text-gray-800">Average Rating:</div>

                                                <div className='flex justify-center ml-2 '>
                                                    <ReactStars
                                                        count={10}
                                                        size={24}
                                                        edit={false}
                                                        value={9}
                                                        color2={'#ffd700'} />
                                                </div>


                                            </div>
                                            <div className='md:flex xs:flex-none flex-row my-2' >
                                               <Ratingchips ctext="Internet Movie Database : 76%"/>
                                               <Ratingchips ctext="Rotten Tomatoes : 79%"/>
                                               <Ratingchips ctext="MetaCritics : 68%"/>
                                                
                                            </div>

                                        </div>

                                            : <div>
                                                <h1>No Movie Selected</h1>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }


        </section>

    )
}

export default MovieListItems;