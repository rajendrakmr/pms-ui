import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Select from "react-select";
import { customSelectOption, SelectOption } from "@/utils/helper";
const InputSelectField = ({ name, label, options, value, onChange, isEdit = false, error, required = false, isLoading = false, pgNo, formData, onMenuScroll = () => console.log("Default"), col = "col-md-3", isTrue = false, onKeyDown, childCol = "col-sm-5 col-4", chiCol = "col-sm-7 col-8" }) => {
    const [copySuccess, setCopySuccess] = useState("");
    //   const handleCopy = async () => {
    //     const selectedValue = isEdit
    //       ? value
    //       : options.find((option) => option.value === value)?.label || "";
    //     if (selectedValue) {
    //       try {
    //         const permission = await navigator.permissions.query({ name: "clipboard-write" as PermissionName });
    //         if (permission.state === "granted" || permission.state === "prompt") {
    //           await navigator.clipboard.writeText(selectedValue);
    //           setCopySuccess("Copied!");
    //           setTimeout(() => setCopySuccess(""), 2000);
    //         } else {
    //           setCopySuccess("Clipboard access denied");
    //         }
    //       } catch (err) {
    //         console.error("Clipboard error:", err);
    //         setCopySuccess("Failed to copy");
    //       }
    //     } else {
    //       console.warn("No value to copy");
    //     }
    //   };
    return (_jsxs("div", { className: `form-group ${col} d-flex align-items-center mt-1`, children: [_jsx("div", { className: childCol, children: _jsxs("label", { htmlFor: name, className: "mr-3 pe-7", children: [label, required && _jsx("span", { className: "text-danger text-bold", children: "*" })] }) }), _jsxs("div", { className: chiCol, style: { position: "relative" }, children: [_jsx(Select, { className: `select_height w-100 custome-border ${error ? "is-invalid" : ""}`, id: name, name: name, options: options, value: isEdit
                            ? { value: value, label: value }
                            : options.find((option) => option.value === value) || null, onChange: (selectedOption) => onChange(selectedOption, name), menuPortalTarget: document.body, styles: name === "selectedLoginId" ? SelectOption : customSelectOption, onMenuScrollToBottom: () => onMenuScroll(formData, pgNo), isLoading: isLoading, isDisabled: isTrue, onKeyDown: onKeyDown }), copySuccess && _jsx("span", { className: "text-success ms-2", children: copySuccess }), error && _jsx("span", { className: "text-danger", style: { fontSize: "11px", marginTop: "0" }, children: error })] })] }));
};
export default InputSelectField;
