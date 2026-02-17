import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const CustomPosModal = ({ isOpen, amount = 0, processing = false, title = "POS Payment", onConfirm, onCancel, }) => {
    if (!isOpen)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { style: {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1000,
                } }), _jsx("div", { style: {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "25px 35px",
                    borderRadius: "8px",
                    zIndex: 1001,
                    minWidth: "320px",
                    textAlign: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }, children: !processing ? (_jsxs(_Fragment, { children: [_jsxs("p", { style: { marginBottom: "20px", color: "#023e8a" }, children: ["Please confirm to pay ", _jsxs("strong", { children: ["\u20B9", amount] }), " via POS."] }), _jsxs("div", { style: { display: "flex", justifyContent: "center", gap: "15px" }, children: [_jsx("button", { style: {
                                        padding: "8px 20px",
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }, onClick: onCancel, children: "No" }), _jsx("button", { style: {
                                        padding: "8px 20px",
                                        backgroundColor: "#28a745",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }, onClick: onConfirm, children: "Yes" })] })] })) : (_jsx("div", { style: { fontWeight: "bold", color: "#023e8a" }, children: "Processing Payment..." })) })] }));
};
export default CustomPosModal;
