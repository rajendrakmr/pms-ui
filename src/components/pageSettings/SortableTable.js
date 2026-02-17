import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SortableTable = ({ data, allColumns, selectedColumnKeys }) => {
    // Build the list of columns to display based on selected keys.
    const displayedColumns = selectedColumnKeys
        .map((key) => allColumns.find((col) => col.key === key))
        .filter((col) => Boolean(col));
    return (_jsx("div", { className: "table-container table-responsive", children: _jsxs("table", { className: "table table-bordered", children: [_jsx("thead", { children: _jsx("tr", { children: displayedColumns.map((col) => (_jsx("th", { children: col.label }, col.key))) }) }), _jsx("tbody", { children: data.map((item) => (_jsx("tr", { children: displayedColumns.map((col) => (_jsx("td", { children: item[col.key] ?? "N/A" }, col.key))) }, item.id))) })] }) }));
};
export default SortableTable;
