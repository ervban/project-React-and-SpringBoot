// tableUtils.js
export const handleChangePage = (page, setPage, newPage) => {
    setPage(newPage);
  };
  
  export const handleChangeRowsPerPage = (event, setRowsPerPage, setPage, rowsPerPage) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };
  export const calculateEmptyRows = (rowsPerPage, filteredData, page) => {
    return rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);
  };
  
  
