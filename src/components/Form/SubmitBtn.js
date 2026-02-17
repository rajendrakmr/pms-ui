import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SubmitBtn = ({ loading, disabled, children, className = "", onClick, type = "button", }) => {
    const isLoading = loading && !disabled;
    return (_jsxs("button", { type: type, disabled: disabled || loading, onClick: onClick, className: className, style: { position: "relative" }, children: [isLoading && _jsx("span", { className: "quad-loader" }), _jsx("span", { style: { visibility: isLoading ? "hidden" : "visible" }, children: children })] }));
};
export default SubmitBtn;
