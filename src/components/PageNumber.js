import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const PageNumber = ({ currentPage, totalPages, handlePageChange, handleFilter, totalCount = 0 }) => {
    const maxPagesToShow = 5;
    const getPageNumbers = () => {
        let pages = [];
        if (totalPages <= maxPagesToShow) {
            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        else {
            if (currentPage < maxPagesToShow - 1) {
                pages = [1, 2, 3, 4, 5, "...", totalPages];
            }
            else if (currentPage > totalPages - maxPagesToShow) {
                pages = [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            }
            else {
                pages = [1, "...", currentPage, currentPage + 1, currentPage + 2, "...", totalPages];
            }
        }
        return pages;
    };
    const handlePageClick = (page) => {
        handlePageChange(page);
        handleFilter(page);
    };
    return (_jsxs("div", { className: "pagination d-flex align-items-center gap-2", children: [_jsx("button", { className: `btn btn-sm ${currentPage === 1 ? "disabled" : "btn-outline-primary"}`, onClick: () => handlePageClick(currentPage - 1), disabled: currentPage === 1, children: _jsx(FontAwesomeIcon, { icon: faCaretLeft }) }), getPageNumbers().map((page, index) => (_jsx("button", { className: `btn btn-sm ${page === currentPage ? "btn-primary" : "btn-outline-primary"}`, onClick: () => typeof page === "number" && handlePageClick(page), disabled: page === "...", children: page }, index))), _jsx("button", { className: `btn btn-sm ${currentPage === totalPages ? "disabled" : "btn-outline-primary"}`, onClick: () => handlePageClick(currentPage + 1), disabled: currentPage === totalPages, children: _jsx(FontAwesomeIcon, { icon: faCaretRight }) })] }));
};
export default PageNumber;
