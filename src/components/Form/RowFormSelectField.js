import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import Select from "react-select";
const RowFormSelectField = ({ name, label, options, value, onChange, isEdit = false, error, required = false, isLoading = false, pgNo, formData, onMenuScroll = () => console.log("Default"), isTrue = false, onKeyDown, row = "col-md-4", col1 = "col-sm-5 col-4", col2 = "col-sm-7 col-8" }) => {
    const [copySuccess, setCopySuccess] = useState("");
    const selectStyles = useMemo(() => ({
        container: (base) => ({
            ...base,
            borderRadius: 0,
            minWidth: '100%',
        }),
        control: (base, state) => ({
            ...base,
            borderRadius: "0px",
            minWidth: "103%",
            boxSizing: "border-box",
            height: 'calc(1em + .50rem + 5px)',
            minHeight: 'calc(1em + .50rem + 9px)',
            fontSize: '11px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0',
            borderColor: state.isDisabled
                ? "#4bce86ff"
                : error
                    ? "#dc3545"
                    : state.isFocused
                        ? "#86b7fe"
                        : "#ced4da",
            '&:hover': {
                borderColor: error ? "#dc3545" : "#86b7fe",
                backgroundColor: state.isDisabled
                    ? "#e9ecef"
                    : base.backgroundColor
            },
        }),
        // valueContainer: (base: any) => ({
        //     ...base,
        //     paddingLeft: "20px",   
        //     paddingRight: "2px",
        // }),
        // singleValue: (base: any) => ({
        //     ...base,
        //     marginLeft: 0,        // default margin remove
        //     paddingLeft: "20px",   // ✅ selected text
        //     textAlign: "left",
        // }),
        // input: (base: any) => ({
        //     ...base,
        //     fontSize: "10px", // typing text
        //     paddingLeft: "2px",
        // }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
        }),
        menuList: (base) => ({
            ...base,
            fontSize: "11px", // 🔥 dropdown list container
            padding: 0,
        }),
        dropdownIndicator: (base) => ({
            ...base,
            padding: "0 4px",
            marginTop: "2px",
            alignSelf: "center",
        }),
    }), [error, name]);
    return (_jsxs("div", { className: `form-group ${row} d-flex `, children: [_jsxs("label", { htmlFor: "leave_type", className: `col-form-label ${col1}`, style: { padding: '0px', fontSize: "10px", fontWeight: 'bold' }, children: [label, required && (_jsx("span", { className: "text-danger text-bold", children: "*" }))] }), _jsxs("div", { className: col2, children: [_jsx(Select, { className: `select_height w-100 custome-border ${error ? "is-invalid" : ""}`, id: name, name: name, options: options, value: isEdit
                            ? { value: value, label: value }
                            : options.find((option) => option.value === value) || null, onChange: (selectedOption) => onChange(selectedOption, name), menuPortalTarget: document.body, styles: selectStyles, onMenuScrollToBottom: () => onMenuScroll(formData, pgNo), isLoading: isLoading, isDisabled: isTrue, onKeyDown: onKeyDown }), copySuccess && _jsx("span", { className: "text-success ms-2", children: copySuccess }), error && _jsx("span", { className: "text-danger", style: { fontSize: "11px", marginTop: "0" }, children: error })] })] }));
};
export default RowFormSelectField;
