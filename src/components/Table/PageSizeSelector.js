import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const pageSizes = [10, 25, 50, 75, 100];
const PageSizeSelector = ({ pageSize, setPageSize }) => {
    return (_jsx("div", { style: { marginBottom: "8px" }, children: pageSizes.map((size) => (_jsxs("label", { style: { marginRight: "16px" }, children: [_jsx("input", { type: "radio", value: size, checked: pageSize === size, onChange: () => setPageSize(size), style: { marginRight: "4px" } }), size, " resources"] }, size))) }));
};
export default PageSizeSelector;
