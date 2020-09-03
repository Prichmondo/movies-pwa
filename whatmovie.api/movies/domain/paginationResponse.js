class PaginationResponse {
  constructor(currentPage, itemsPerPage, totalItems, items) {
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems/itemsPerPage);
    this.items = items;    
  }
}

module.exports = PaginationResponse;