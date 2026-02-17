import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ColumnSelector.tsx
import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
const ColumnSelector = ({ allColumns, selectedColumnKeys, setSelectedColumnKeys, saveColumnsToBackend, }) => {
    // Local state for working on selection & ordering.
    const [tempSelectedKeys, setTempSelectedKeys] = useState(selectedColumnKeys);
    // Update local state when parent's selection changes.
    useEffect(() => {
        setTempSelectedKeys(selectedColumnKeys);
    }, [selectedColumnKeys]);
    // Handle vertical drag-and-drop ordering.
    const handleDragEnd = (event) => {
        console.log("handleDragEnd triggered:", event);
        const { active, over } = event;
        if (!over || active.id === over.id)
            return;
        const oldIndex = tempSelectedKeys.findIndex((key) => key === active.id);
        const newIndex = tempSelectedKeys.findIndex((key) => key === over.id);
        const newOrder = arrayMove(tempSelectedKeys, oldIndex, newIndex);
        console.log("Old Order:", tempSelectedKeys);
        console.log("New Order:", newOrder);
        setTempSelectedKeys(newOrder);
    };
    // Toggle a column's selection.
    const handleCheckboxChange = (col) => {
        setTempSelectedKeys((prev) => prev.includes(col.key) ? prev.filter((key) => key !== col.key) : [...prev, col.key]);
    };
    // Save changes to parent state and backend.
    const handleSaveChanges = async () => {
        setSelectedColumnKeys(tempSelectedKeys);
        await saveColumnsToBackend(tempSelectedKeys);
    };
    return (_jsxs("div", { className: "mb-3", children: [_jsx("label", { children: _jsx("b", { children: "Select & Arrange Columns:" }) }), _jsx("div", { className: "sortable-container", style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                }, children: _jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: _jsx(SortableContext, { items: tempSelectedKeys, strategy: verticalListSortingStrategy, children: allColumns
                            .filter((col) => tempSelectedKeys.includes(col.key))
                            .map((col) => (_jsx(SortableItem, { id: col.key, children: _jsxs("label", { className: "d-flex align-items-center mx-2", children: [_jsx("input", { type: "checkbox", checked: true, onChange: (e) => {
                                            e.stopPropagation();
                                            handleCheckboxChange(col);
                                        } }), col.label] }) }, col.key))) }) }) }), _jsx("div", { children: allColumns
                    .filter((col) => !tempSelectedKeys.includes(col.key))
                    .map((col) => (_jsxs("label", { className: "d-flex align-items-center mx-2", children: [_jsx("input", { type: "checkbox", checked: false, onChange: () => handleCheckboxChange(col) }), col.label] }, col.key))) }), _jsx("button", { onClick: handleSaveChanges, className: "btn btn-primary mt-2", children: "Save Changes" })] }));
};
export default ColumnSelector;
