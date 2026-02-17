import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Select from "react-select";
import { customSelectOption1, rowSelectdOption } from "@/utils/helper";
const RowFormSelectField = ({ name, label, options, value, onChange, isEdit = false, error, required = false, isLoading = false, pgNo, formData, onMenuScroll = () => console.log("Default"), col = "col-md-3", isTrue = false, onKeyDown, childCol = "col-sm-5 col-4", chiCol = "col-sm-7 col-8" }) => {
    const [copySuccess, setCopySuccess] = useState("");
    return (_jsx("div", { className: "row pt-2", children: _jsxs("div", { className: "col-sm-9 col-md-12 col-xl-9", children: [_jsx(Select, { className: `select_height w-100 custome-border ${error ? "is-invalid" : ""}`, id: name, name: name, options: options, value: isEdit
                        ? { value: value, label: value }
                        : options.find((option) => option.value === value) || null, onChange: (selectedOption) => onChange(selectedOption, name), menuPortalTarget: document.body, styles: name === "selectedLoginId" ? rowSelectdOption : customSelectOption1, onMenuScrollToBottom: () => onMenuScroll(formData, pgNo), isLoading: isLoading, isDisabled: isTrue, onKeyDown: onKeyDown }), copySuccess && _jsx("span", { className: "text-success ms-2", children: copySuccess }), error && _jsx("span", { className: "text-danger", style: { fontSize: "11px", marginTop: "0" }, children: error })] }) }));
};
export default RowFormSelectField;
