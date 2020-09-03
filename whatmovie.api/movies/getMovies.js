const utils = require('./utils');
const ApiResponse = require('./domain/apiResponse');
const createConnection = require('./database/createConnection');

module.exports = (event, context, callback) => {

  const genre = utils.getQuerystringParam(event, 'genre');
  const searchTerm = utils.getQuerystringParam(event, 'searchTerm');
  let itemsPerPage = utils.getQuerystringParam(event, 'itemsPerPage');
  let currentPage = utils.getQuerystringParam(event, 'currentPage');
  
  if(!utils.hasValue(currentPage)) {
    currentPage = 0;
  }
  
  if(typeof currentPage === 'string') {
    currentPage = parseInt(currentPage);
  }
  
  if(!utils.hasValue(itemsPerPage)) {
    itemsPerPage = 20;
  }
  
   if(typeof itemsPerPage === 'string') {
    itemsPerPage = parseInt(itemsPerPage);
  }

  
  const conditions = [];
  
  if(utils.hasValue(genre)) {
    conditions.push('LOWER(REPLACE(genres, " ", "")) LIKE LOWER(REPLACE(' + connection.escape('%' + genre + '%') + ', " ", ""))');
  }
  
  if(utils.hasValue(searchTerm)) {
    conditions.push('LOWER(REPLACE(CONCAT(genres,title,cast,director), " ", "")) LIKE LOWER(REPLACE(' + connection.escape('%' + searchTerm + '%') + ', " ", ""))');
  }
  
  let where = '';
  if(conditions.length > 0) {
    where = 'WHERE ' + conditions.join(' AND ');
  }
  
  const query = 'SELECT COUNT(*) as total FROM movies ' + where + '; SELECT * FROM movies ' + where + ' LIMIT ? OFFSET ?';
  const queryParams = [itemsPerPage, currentPage * itemsPerPage];
  createConnection(true)
    .then(function (connection) {

      connection.query(query, queryParams,
        function (error, results) {
          if (error) {
            connection.destroy();
            callback(null, new ApiResponse(500, JSON.stringify(error)));
          } else {
            
            const countResult = results[0];
            const itemsResult = results[1];
            const totalItems = countResult[0].total;
            const totalPages= Math.ceil(totalItems/itemsPerPage);
            const response = {
              totalItems: totalItems,
              totalPages: totalPages,
              itemsPerPage: itemsPerPage,
              currentPage: parseInt(currentPage),
              pages: itemsResult
            }

            connection.end(function (err) {
              callback(null, new ApiResponse(200, JSON.stringify(response)));
            });
          }
      });

    })
    .catch(function(error){
      callback(null, new ApiResponse(500, JSON.stringify(error)));
    });

};