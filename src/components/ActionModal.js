import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Modal, Button, Form, Row } from "react-bootstrap";
const ActionModal = ({ show, title, formData, errors, onClose, onSubmit, onChange, children, isSubmitting }) => {
    return (_jsxs(Modal, { show: show, onHide: onClose, fullscreen: true, children: [_jsx(Modal.Header, { closeButton: true, className: "bg-success", children: _jsx(Modal.Title, { children: title }) }), _jsx("div", { className: "px-4 mx-auto text-bold text-end w-100 ", children: _jsx("span", { className: "text-danger mandatorField", children: "(*) Indicates Mandatory Fields." }) }), _jsxs(Modal.Body, { style: { position: "relative", minHeight: "200px" }, children: [isSubmitting && (_jsx("div", { className: "d-flex justify-content-center align-items-center", style: {
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            top: 0,
                            left: 0,
                            background: "rgba(255, 255, 255, 0.5)",
                            zIndex: 10
                        }, children: _jsx("div", { className: "spinner-border text-primary", role: "status", children: _jsx("span", { className: "visually-hidden", children: "Loading..." }) }) })), _jsx(Form, { style: { opacity: isSubmitting ? 0.5 : 1 }, children: _jsx(Row, { className: "mb-3", children: children }) })] }), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "secondary", className: "btn-sm", onClick: onClose, children: "Close" }), _jsx(Button, { variant: "primary", className: "btn-sm d-flex align-items-center justify-content-center", onClick: onSubmit, disabled: isSubmitting, style: { minWidth: "100px" }, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner-border spinner-border-sm me-2", role: "status", "aria-hidden": "true" }), "Saving Changes..."] })) : 'Save Changes' })] })] }));
};
export default ActionModal;
