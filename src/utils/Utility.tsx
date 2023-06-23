export const filterBySearch = (query:string,movieData:any) => {

    // Create copy of item list
    var updatedList = [...movieData];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item:any) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    return updatedList


  };


  export const handleSortingUtils = (order:string,sortField: string,filterMovielist:any) => {

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


