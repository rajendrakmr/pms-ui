import { jsx as _jsx } from "react/jsx-runtime";
// SortableItem.tsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
        padding: "8px",
        backgroundColor: "#f8f9fa",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: "4px",
        touchAction: "manipulation",
    };
    return (_jsx("div", { ref: setNodeRef, style: style, ...attributes, ...listeners, onPointerDown: (e) => {
            // Only stop propagation if the target is an input (to allow checkbox clicks)
            if (e.target.tagName.toLowerCase() === "input") {
                e.stopPropagation();
            }
        }, children: children }));
};
export default SortableItem;
