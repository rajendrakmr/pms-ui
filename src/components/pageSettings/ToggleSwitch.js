import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./ToggleSwitch.css";
const ToggleSwitch = ({ checked, onChange }) => {
    return (_jsxs("label", { className: "switch", children: [_jsx("input", { type: "checkbox", checked: checked, onChange: onChange }), _jsx("span", { className: "slider round" })] }));
};
export default ToggleSwitch;
