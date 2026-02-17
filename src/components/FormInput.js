import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Col, Form } from "react-bootstrap";
const FormInput = ({ label, name, inputType = "text", inputData, onChange, onBlur, handleKeyUp, hasError, errorMsg, required = false, isDefault = false, max, col = "col-", row1 = "", row2 = "", type, value, error, placeholder }) => {
    return (_jsxs(Form.Group, { className: `d-flex align-items-center mt-1 ${col}`, as: Col, md: "3", children: [_jsx("div", { className: row1, children: _jsxs(Form.Label, { className: "pe-3 mb-0", children: [label, ":", required && _jsx("span", { className: "text-danger fw-bold", children: "*" })] }) }), _jsxs("div", { className: row2, children: [_jsx(Form.Control, { type: type, name: name, value: value, onChange: onChange, isInvalid: !!error, required: required, className: "custome-input-height custome-border", placeholder: placeholder || `Enter ${label}`, style: required
                            ? {
                                fontWeight: "bold",
                                backgroundColor: isDefault ? "#e9ecef" : "#eff3a800",
                            }
                            : {} }), error && _jsx(Form.Control.Feedback, { type: "invalid", children: error })] })] }));
};
export default FormInput;
