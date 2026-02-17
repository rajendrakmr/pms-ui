import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "./TableComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "react-bootstrap";
import LoadingLoader from "../LoadingLoader";
const TableComponent = ({ setFormData, data, allColumns, isFetching, setOpenSliderForm, setSelectedIds, selectedIds, setSelectedItems }) => {
    const activeColumns = allColumns
        .filter((col) => col.isActive)
        .sort((a, b) => a.order - b.order);
    const [dropdownVisible, setDropdownVisible] = useState(null);
    // Toggle the dropdown for an action column
    const toggleDropdown = (id) => {
        setDropdownVisible(dropdownVisible === id ? null : id);
    };
    // Handle the header checkbox to select/deselect all rows
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = data.map((item) => item.id.toString());
            setSelectedIds(allIds);
        }
        else {
            setSelectedIds([]);
        }
    };
    // Handle individual row checkbox selection
    const handleSelectRow = (e, item) => {
        const id = item.id.toString();
        if (e.target.checked) {
            setSelectedIds((prev) => [...prev, id]);
            setSelectedItems((prev) => [...prev, item]);
        }
        else {
            setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
            setSelectedItems((prev) => prev.filter((selectedItem) => selectedItem.id.toString() !== id));
        }
    };
    const getBadgeColor = (status) => {
        switch (status) {
            case "active":
                return "bg-success"; // Green
            case "inactive":
                return "bg-warning"; // Yellow
            case "terminated":
                return "bg-danger"; // Red
            default:
                return "bg-secondary"; // Gray (default if status is unknown)
        }
    };
    return (_jsx("div", { children: _jsx("div", { className: "table-container table-responsive tableReponsivecontainer", children: _jsxs("table", { className: "table table-bordered", children: [_jsx("thead", { className: "table-header-bg text-white", style: { position: "sticky", top: 0, backgroundColor: "#32ab9b" }, children: _jsxs("tr", { children: [_jsx("th", { children: _jsx("input", { type: "checkbox", onChange: handleSelectAll, checked: data.length > 0 && selectedIds.length === data.length }) }), activeColumns.map((col) => (_jsx("th", { children: col.label }, col.key)))] }) }), _jsx("tbody", { children: isFetching ? (_jsx("tr", { children: _jsx("td", { colSpan: activeColumns.length + 1, className: "text-center", children: _jsx("div", { className: "d-flex justify-content-center align-items-center", style: { height: "200px", width: "100%" }, children: _jsx(LoadingLoader, {}) }) }) })) : data.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: activeColumns.length + 1, className: "text-center", children: "No records found." }) })) : (data.map((item) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("input", { type: "checkbox", onChange: (e) => handleSelectRow(e, item), checked: selectedIds.includes(item.id.toString()) }) }), activeColumns.map((col) => (_jsx("td", { className: "p-2", children: col.key === "action" ? (_jsxs("div", { className: "custom-dropdown", children: [_jsx("span", { className: "cursor-pointer px-2 cursoredit", onClick: () => {
                                                    setOpenSliderForm(true);
                                                    setFormData(item);
                                                }, children: _jsx(FontAwesomeIcon, { icon: faPenToSquare }) }), _jsxs(Dropdown, { align: "end", children: [_jsx(Dropdown.Toggle, { id: "dropdown-profile", className: "profile-dropdown-toggle", children: "\u22EE" }), _jsx(Dropdown.Menu, { children: _jsx(Dropdown.Item, { children: "Delete" }) })] })] })) : col.key === "status" ? (
                                    // Display badge for status with consistent styling
                                    _jsx("span", { className: `badge ${getBadgeColor(item[col.key])} status-badge`, children: item[col.key].charAt(0).toUpperCase() + item[col.key].slice(1) })) : (item[col.key]) }, col.key)))] }, item.id)))) })] }) }) }));
};
export default TableComponent;
