
module.exports = function(
  results, currentPage, itemsPerPage
){
  
  const countResult = results[0];
  const itemsResult = results[1];
  const totalItems = countResult[0].total;
  const totalPages= Math.ceil(totalItems/itemsPerPage);
  const items = itemsResult.map(movie => {
    movie.watchList = movie.watchList === 1;
    return movie;
  });
  
  return {
    totalItems: totalItems,
    totalPages: totalPages,
    itemsPerPage: itemsPerPage,
    currentPage: currentPage,
    pages: items
  };

}