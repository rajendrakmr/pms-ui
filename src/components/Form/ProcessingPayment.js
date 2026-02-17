import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const ProcessingPayment = ({ isOpen, message = "Waiting for POS Payment" }) => {
    const [dotIndex, setDotIndex] = useState(0);
    useEffect(() => {
        if (!isOpen)
            return;
        const interval = setInterval(() => {
            setDotIndex((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, [isOpen]);
    if (!isOpen)
        return null;
    const dots = ".".repeat(dotIndex + 1);
    return (_jsxs(_Fragment, { children: [_jsx("div", { style: {
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1000
                } }), _jsxs("div", { style: {
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "25px 35px",
                    borderRadius: "8px",
                    zIndex: 1001,
                    minWidth: "320px",
                    // textAlign: "center",
                    fontWeight: "bold",
                    color: "#023e8a"
                }, children: [_jsxs("div", { style: { fontSize: "18px" }, children: [message, _jsx("span", { children: dots })] }), _jsx("div", { style: {
                            marginTop: "12px",
                            fontSize: "13px",
                            fontWeight: "normal",
                            color: "#d00000"
                        }, children: "\u26A0 Please do not refresh or close this page." })] })] }));
};
export default ProcessingPayment;
