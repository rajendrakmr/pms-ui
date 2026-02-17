import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: "5px",
        backgroundColor: "#f8f9fa",
        borderRadius: "5px",
        marginBottom: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };
    return (_jsxs("div", { ref: setNodeRef, style: style, children: [children, _jsx("span", { ...attributes, ...listeners, style: { cursor: "grab", padding: "5px" }, children: "\u2630" })] }));
};
export default SortableItem;
