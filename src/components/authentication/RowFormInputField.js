import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
const RowFormInputField = memo(({ label, placeholder, type = 'text', name, inputValue, onChange, error, isDefault = false, onBlur, required = false, max = 250, onKeyUp, col = "col-md-3", row1 = "col-sm-5 col-4", row2 = "col-sm-7 col-8" }) => {
    const handleNumberInput = (e) => {
        let value = e.target.value;
        if (type === "number") {
            const numericValue = value.replace(/[^0-9.]/g, '');
            if (value !== numericValue || (numericValue.match(/\./g) || []).length > 1) {
                return;
            }
            e.target.value = numericValue;
        }
        else if (type === "str" || type === "string") {
            const alphanumericValue = value.replace(/[^a-zA-Z0-9-]/g, '');
            e.target.value = alphanumericValue.toUpperCase().trim();
        }
        if (onChange) {
            onChange(e);
        }
    };
    const inputType = type === "number" && max !== 250 ? 'text' : type;
    const handleKeyUp = (e) => { if (onKeyUp)
        onKeyUp(e); };
    return (_jsx("div", { className: "col-md-12 mt-3", children: _jsx("div", { className: "row", children: _jsxs("div", { className: "col-sm-12 col-md-12 col-xl-12", children: [_jsx("input", { type: inputType, className: `form-control valid ${error ? 'is-invalid' : ''}`, id: name, disabled: isDefault, name: name, value: inputValue ?? '', onBlur: onBlur, onKeyUp: handleKeyUp, onChange: handleNumberInput, maxLength: max, min: 0, placeholder: placeholder || `Enter ${label}`, style: required ? {
                            fontWeight: '400',
                            backgroundColor: isDefault ? '#fff' : '#fff',
                        } : {} }), error && _jsx("span", { className: "text-danger", style: { fontSize: "11px", marginTop: "0" }, children: error })] }) }) }));
});
const areEqual = (prevProps, nextProps) => {
    return (prevProps.name === nextProps.name &&
        prevProps.error === nextProps.error &&
        prevProps.inputValue === nextProps.inputValue);
};
export default memo(RowFormInputField, areEqual);
