export interface Pagination {
  /** Fired when pagination buttons are clicked.
   *  Update page number then reload component.
   *
   * @param n if postive increment / if negative decrement page number
   */
  updatePage(n: number) : void;
    // this.paginationService.page = this.page + n;
    // this.ngOnInit();
}
