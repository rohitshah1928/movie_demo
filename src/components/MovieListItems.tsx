import React, { ChangeEvent, useEffect, useState } from 'react'

import axios from 'axios';
import SearchInput from './SearchInput';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { filterBySearch, handleSortingUtils } from '../utils/Utility';
import ReactStars from 'react-stars';
import { Oval } from 'react-loader-spinner';

const MovieListItems = (props: any) => {

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
        <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
            {
                loading ? <div className='flex justify-center items-center h-full'>
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

                    <div className="flex  justify-left">

                        <div className="w-full max-w-2xl  bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <SearchInput
                                    type="search"
                                    placeholder="Search..."
                                    name="search"
                                    onChange={(e: React.SyntheticEvent<HTMLInputElement>) => handleInputSearchChange(e)} />
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                            <tr>
                                                <th className="p-2 whitespace-nowrap" >
                                                    <div className="font-semibold text-left" onClick={() => handleSorting('episode_id')}>Episode No</div>
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
                                            filterMovielist?.map((item: any) => (
                                                <tbody className="text-sm divide-y divide-gray-100 cursor-pointer">
                                                    <tr onClick={() => handleClick(item)}>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="font-medium text-gray-800">{"EPISODE " + item.episode_id}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">{"EPISODE " + item.episode_id}-{item.title}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap flex flex-row">
                                                            <ReactStars
                                                                count={10}
                                                                size={18}
                                                                edit={false}
                                                                value={9}
                                                                color2={'#ffd700'} />

                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
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
                        <div className="w-full max-w-2xl  bg-white shadow-lg rounded-sm border border-gray-200">
                            <header className="px-5 py-4 border-b border-gray-100">
                                <h2 className="font-semibold text-gray-800">Movie Details</h2>
                            </header>
                            <div className="p-3">
                                <div className="overflow-x-auto">

                                    {
                                        selectedMovieDetail.title ? <div>
                                            <div className="font-large text-gray-800">{"EPISODE " + selectedMovieDetail.episode_id} -{selectedMovieDetail.title}</div>

                                            <div className='flex flex-column my-8'>
                                                <div className="w-30  flex-shrink-0 mr-2 sm:mr-3"><img className="rounded-none" src={selectedMovieDetail.poster} width="120" height="400" alt="Alex Shatov" /></div>
                                                <div className="font-small text-gray-800">{selectedMovieDetail.opening_crawl}</div>

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
                                            <div className='flex flex-row'>
                                                <div
                                                    data-te-chip-init
                                                    data-te-ripple-init
                                                    className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                                                    data-te-close="true">
                                                    Internet Movie Database : 78%
                                                </div>
                                                <div
                                                    data-te-chip-init
                                                    data-te-ripple-init
                                                    className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                                                    data-te-close="true">
                                                    Rotten Tomatoes : 79%
                                                </div>
                                                <div
                                                    data-te-chip-init
                                                    data-te-ripple-init
                                                    className="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px] bg-[#eceff1] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                                                    data-te-close="true">
                                                    MetaCritics : 68%
                                                </div>
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