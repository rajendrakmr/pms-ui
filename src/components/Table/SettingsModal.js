import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./settingsModal.css";
import ColumnDefault from "./ColumnDefault";
import PageSizeSelector from "./PageSizeSelector";
const SettingsModal = ({ isOpen, onClose, itemsPerPage = 10, setItemsPerPage, allColumns }) => {
    const [tempItemsPerPage, setTempItemsPerPage] = useState(itemsPerPage);
    const [selectedColumns, setSelectedColumns] = useState(allColumns);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const savedColumns = localStorage.getItem("selectedColumns");
        if (savedColumns) {
            setSelectedColumns(JSON.parse(savedColumns));
        }
        else {
            setSelectedColumns(allColumns);
        }
    }, [allColumns]);
    useEffect(() => {
        localStorage.setItem("selectedColumns", JSON.stringify(selectedColumns));
    }, [selectedColumns]);
    const filteredColumns = selectedColumns.filter((col) => col.label.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleSave = () => {
        if (setItemsPerPage) {
            setItemsPerPage(tempItemsPerPage);
        }
        console.log('setItemsPerPagesetItemsPerPage', tempItemsPerPage, selectedColumns);
        localStorage.setItem("selectedColumns", JSON.stringify(selectedColumns));
        onClose && onClose();
    };
    return (_jsxs(_Fragment, { children: [isOpen && _jsx("div", { className: "modal-overlay", onClick: onClose }), _jsx(motion.div, { initial: { x: 500 }, animate: { x: isOpen ? 0 : 500 }, exit: { x: 500 }, transition: { duration: 0.3, ease: "easeInOut" }, className: "modal-right", children: _jsxs("div", { className: "modal-content pt-5", children: [_jsxs("div", { className: "modal-buttons", style: { marginTop: "16px" }, children: [_jsx("button", { onClick: onClose, className: "btn btn-secondary", children: "Cancel" }), _jsx("button", { onClick: handleSave, className: "btn btn-sm btn-primary", children: "Save Changes" })] }), _jsx("h5", { children: "Preferences" }), _jsxs("div", { className: "modal-body", style: { display: "flex", flexDirection: "row", gap: "16px", marginTop: "16px" }, children: [_jsxs("div", { className: "left-part", style: { flex: 1, borderRight: "1px solid #ccc", paddingRight: "8px" }, children: [_jsx("h6", { children: "Page size" }), _jsx(PageSizeSelector, { pageSize: tempItemsPerPage, setPageSize: setTempItemsPerPage })] }), _jsxs("div", { className: "right-part", style: { flex: 2, paddingLeft: "1px" }, children: [_jsx("h6", { children: "Attribute columns" }), _jsx("p", { children: "Select visible attribute columns" }), _jsx("input", { type: "text", placeholder: "Search columns...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: { padding: "4px 8px", marginBottom: "8px", width: "100%", boxSizing: "border-box" } }), _jsx(ColumnDefault, { allColumns: filteredColumns, setSelectedColumns: setSelectedColumns })] })] })] }) })] }));
};
export default SettingsModal;
