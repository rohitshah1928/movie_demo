import React from 'react'
import { useSelector } from 'react-redux';

export const filterBySearch = (query:string,movieData:any) => {

    console.log("ok",movieData)
    // Access input value

    // Create copy of item list
    var updatedList = [...movieData];
    console.log(updatedList)
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item:any) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    return updatedList
    console.log(updatedList)
    // setFilteredList(updatedList);
  };


  export const handleSortingUtils = (order:any,sortField: any,filterMovielist:any) => {

    if (sortField) {
        const sorted = [...filterMovielist].sort((a, b) => {
            return (
                a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
                    numeric: true,
                }) * (order === 'asc' ? 1 : -1)
            );
        });

        return sorted;
    }
    return filterMovielist
};


