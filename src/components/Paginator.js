import { jsx as _jsx } from "react/jsx-runtime";
import ReactPagination from "react-js-pagination";
const Paginator = ({ currentPage, totalCount, pageSize = 10, onPageChange, }) => {
    if (totalCount <= pageSize)
        return null;
    return (_jsx("div", { className: "d-flex justify-content-center mt-3", children: _jsx(ReactPagination, { activePage: currentPage + 1, itemsCountPerPage: pageSize, totalItemsCount: totalCount, pageRangeDisplayed: 5, onChange: onPageChange, itemClass: "page-item", linkClass: "page-link", firstPageText: "First", lastPageText: "Last", prevPageText: "Prev", nextPageText: "Next" }) }));
};
export default Paginator;
