import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "framer-motion";
import "./AdvancedFilter.css";
const AdvancedFilter = ({ isOpen, onClose, children }) => {
    ;
    const handleSave = () => {
        // setItemsPerPage(tempItemsPerPage);
        // setSelectedColumns(tempSelectedColumns);
        // onClose();
    };
    return (_jsx(_Fragment, { children: _jsx(motion.div, { initial: { x: 300 }, animate: { x: isOpen ? 0 : -300 }, exit: { x: -300 }, transition: { duration: 0.3, ease: "easeInOut" }, className: `preferences-panel ${isOpen ? 'visible' : 'hidden'}`, children: _jsxs("div", { className: "preferences-content ", children: [_jsx("h5", { children: "Advanced Filter" }), _jsxs("div", { className: "advanced-search-container shadow-lg p-4", style: {
                            border: "1px solid"
                        }, children: [children, _jsxs("div", { className: "preferences-buttons", children: [_jsx("button", { className: "cbtn-sm cbtn-c", onClick: onClose, children: "Cancel" }), _jsx("button", { className: "cbtn-sm cbtn-s", onClick: handleSave, children: "Save" })] })] })] }) }) }));
};
export default AdvancedFilter;
