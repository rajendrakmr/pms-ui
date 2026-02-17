import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, useRef } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import ToggleSwitch from "@/components/pageSettings/ToggleSwitch";
const ColumnDefault = ({ allColumns, setSelectedColumns }) => {
    const [tempColumns, setTempColumns] = useState(allColumns);
    const prevColumnsRef = useRef(allColumns);
    useEffect(() => {
        if (JSON.stringify(allColumns) !== JSON.stringify(prevColumnsRef.current)) {
            setTempColumns([...allColumns]);
            prevColumnsRef.current = allColumns;
        }
    }, [allColumns]);
    useEffect(() => {
        console.log('tempColumnstempColumnstempColumnstempColumns', tempColumns);
        if (JSON.stringify(tempColumns) !== JSON.stringify(prevColumnsRef.current)) {
            setSelectedColumns(tempColumns);
            prevColumnsRef.current = tempColumns;
        }
    }, [tempColumns, setSelectedColumns]);
    const handleCheckboxChange = (colKey, isActive) => {
        setTempColumns((prevColumns) => prevColumns.map((col) => col.key === colKey ? { ...col, isActive: !isActive } : col));
    };
    // const handleDragEnd = (event: DragEndEvent) => {
    //     const { active, over } = event;
    //     console.log("active",active, 'over',over)
    //     if (!over || active.id === over.id) return; 
    //     setTempColumns((prevColumns) => {
    //         const oldIndex = prevColumns.findIndex((col) => col.key === active.id);
    //         const newIndex = prevColumns.findIndex((col) => col.key === over.id);
    //         return arrayMove(prevColumns, oldIndex, newIndex);
    //     });
    // };
    const handleDragEnd = (event) => {
        const { active, over } = event;
        console.log("active", active, "over", over);
        if (!over || active.id === over.id)
            return;
        setTempColumns((prevColumns) => {
            const oldIndex = prevColumns.findIndex((col) => col.key === active.id);
            const newIndex = prevColumns.findIndex((col) => col.key === over.id);
            const newColumns = arrayMove(prevColumns, oldIndex, newIndex);
            // Update the order property based on new array position
            return newColumns.map((col, index) => ({
                ...col,
                order: index + 1, // or simply index if you prefer starting at 0
            }));
        });
    };
    return (_jsx("div", { style: { maxHeight: "300px", overflowY: "auto" }, children: _jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: _jsx(SortableContext, { items: tempColumns.map(({ key }) => key), strategy: verticalListSortingStrategy, children: tempColumns.map((col) => (_jsx(SortableItem, { id: col.key, children: _jsxs("label", { style: { display: "flex", alignItems: "center", marginBottom: "4px" }, children: [_jsx(ToggleSwitch, { checked: col.isActive, onChange: (e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange(col.key, col.isActive);
                                } }), col.label] }) }, col.key))) }) }) }));
};
export default React.memo(ColumnDefault);
