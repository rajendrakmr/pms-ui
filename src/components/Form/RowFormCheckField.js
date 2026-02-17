import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
const RowFormCheckField = memo(({ label, placeholder, type = 'text', name, inputValue, onChange, error, isDefault = false, onBlur, required = false, max = 250, onKeyUp, row = "col-md-4", col1 = "col-sm-5 col-4", col2 = "col-sm-7 col-8", click }) => {
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
    return (_jsxs("div", { className: `form-group ${row} d-flex `, children: [_jsxs("label", { htmlFor: name, className: `col-form-label ${col1}`, style: { padding: '0px', fontSize: "10px", fontWeight: 'bold' }, children: [label, required && (_jsx("span", { className: "text-danger text-bold", children: "*" }))] }), _jsxs("div", { className: col2, style: { padding: '0px 3px 3px 0px' }, children: [_jsxs("div", { className: "input-group", style: { width: "105%" }, children: [_jsx("input", { type: inputType, className: `form-control valid ${error ? 'is-invalid' : ''}`, id: name, disabled: isDefault, name: name, value: inputValue ?? '', onBlur: onBlur, onKeyUp: handleKeyUp, onChange: handleNumberInput, maxLength: max, min: 0, "aria-describedby": "validationTooltipUsernamePrepend", 
                                // placeholder={placeholder || `Enter ${label}`}
                                style: {
                                    // width:'100%', 
                                    padding: "0 0 0 4px",
                                    borderRadius: "0px",
                                    ...(required
                                        ? {
                                            fontWeight: "400",
                                            backgroundColor: isDefault ? "#fff" : "#fff",
                                        }
                                        : {}),
                                } }), _jsx("div", { className: "input-group-prepend", onClick: click, children: _jsx("span", { className: "input-group-text", style: {
                                        // width:'110%', 
                                        padding: "0 0 0 4px",
                                        cursor: "pointer",
                                        borderRadius: "0px"
                                    }, id: "validationTooltipUsernamePrepend", children: "\uD83D\uDD0D" }) })] }), error && _jsx("span", { className: "text-danger", style: { fontSize: "11px", marginTop: "0" }, children: error })] })] }));
});
const areEqual = (prevProps, nextProps) => {
    return (prevProps.name === nextProps.name &&
        prevProps.error === nextProps.error &&
        prevProps.inputValue === nextProps.inputValue);
};
export default memo(RowFormCheckField, areEqual);
