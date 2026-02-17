import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import ToggleSwitch from "@/components/pageSettings/ToggleSwitch";
const ColumnSelector = ({ allColumns, selectedColumns, setSelectedColumns }) => {
    const [tempColumns, setTempColumns] = useState(selectedColumns);
    // ✅ Toggle column selection (true/false)
    const handleCheckboxChange = (col) => {
        setTempColumns((prev) => prev.some((c) => c.key === col.key)
            ? prev.filter((c) => c.key !== col.key) // Remove if exists
            : [...prev, col] // Add if not exists
        );
    };
    // ✅ Drag & Drop Sorting
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id)
            return;
        const oldIndex = tempColumns.findIndex((col) => col.key === active.id);
        const newIndex = tempColumns.findIndex((col) => col.key === over.id);
        const sortedColumns = arrayMove(tempColumns, oldIndex, newIndex);
        setTempColumns(sortedColumns);
    };
    // ✅ Save Changes (Update Table Headers & Order)
    const saveChanges = () => {
        setSelectedColumns(tempColumns);
        localStorage.setItem("selectedColumns", JSON.stringify(tempColumns));
    };
    return (_jsxs("div", { className: "mb-2", children: [_jsx("label", { children: _jsx("b", { children: "Select Columns:" }) }), _jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: _jsx(SortableContext, { items: tempColumns.map(({ key }) => key), strategy: verticalListSortingStrategy, children: tempColumns.map((col) => (_jsx(SortableItem, { id: col.key, children: _jsxs("label", { style: { display: "flex", alignItems: "center", marginBottom: "4px" }, children: [_jsx(ToggleSwitch, { checked: true, onChange: (e) => {
                                        e.stopPropagation();
                                        handleCheckboxChange(col);
                                    } }), col.label] }, col.key) }, col.key))) }) }), allColumns.map((col) => (!tempColumns.some((c) => c.key === col.key) && (_jsxs("label", { className: "d-flex align-items-center mx-2", children: [_jsx(ToggleSwitch, { checked: tempColumns.some((c) => c.key === col.key), onChange: () => handleCheckboxChange(col) }), col.label] }, col.key)))), _jsx("button", { onClick: saveChanges, className: "btn btn-primary mt-2", children: "Save Changes" })] }));
};
export default ColumnSelector;
