import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const RowFormDateField = memo(({ label, placeholder, name, inputValue, onChange, error, isDefault = false, onBlur, required = false, onKeyUp, row = "col-md-4", col1 = "col-sm-5 col-4", col2 = "col-sm-7 col-8" }) => {
    return (_jsxs("div", { className: `form-group ${row} d-flex`, children: [_jsxs("label", { htmlFor: name, className: `col-form-label ${col1}`, style: { padding: '0px', fontSize: "10px", fontWeight: 'bold' }, children: [label, required && _jsx("span", { className: "text-danger", children: "*" })] }), _jsxs("div", { className: col2, style: { padding: '0px 3px 3px 0px' }, children: [_jsx(DatePicker, { id: name, selected: inputValue, onChange: onChange, onBlur: onBlur, 
                        // onKeyUp={onKeyUp}
                        disabled: isDefault, placeholderText: placeholder, dateFormat: "yyyy-MM-dd", className: `form-control ${error ? 'is-invalid' : ''}`, wrapperClassName: "w-100", style: {
                            width: '105%',
                            paddingLeft: '4px',
                            borderRadius: '0px'
                        } }), error && (_jsx("span", { className: "text-danger", style: { fontSize: "11px" }, children: error }))] })] }));
});
const areEqual = (prev, next) => (prev.name === next.name &&
    prev.error === next.error &&
    prev.inputValue === next.inputValue);
export default memo(RowFormDateField, areEqual);
