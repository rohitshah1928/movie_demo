import React, { FC } from 'react'

interface InputProps extends React.AllHTMLAttributes<HTMLInputElement>{
    type: 'text' | 'number' | 'email' | 'password' | 'search'
    name: string
    placeholder: string
    
  }

const SearchInput:FC<InputProps> = (props ) => {
    return (
        <div className="relative container text-gray-600 focus-within:text-gray-400  border-rounder border border-slate-300">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
                <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </span>
            <input  className="py-2 pr-4 w-full text-sm rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-800"  autoComplete="off"
               {...props}/>
        </div>

    )
}

export default SearchInput