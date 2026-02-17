import { jsx as _jsx } from "react/jsx-runtime";
const AppFooter = () => {
    return _jsx("footer", { className: "footer mt-2 d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small", style: {
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            // marginTop:""
            backgroundColor: "#f8f9fa", // optional: footer background
            zIndex: 1000,
        }, children: _jsx("p", { className: "text-muted mb-1 mb-md-0", children: "\u00A9 2026 DCG Data-Core Systems (India) Private Limited. All rights reserved." }) });
};
export default AppFooter;
