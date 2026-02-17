import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NotFoundPage = () => {
    return (_jsx("div", { style: {
            minHeight: "82vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }, children: _jsxs("div", { style: {
                border: "1px solid grey",
                padding: "24px",
                textAlign: "center",
            }, children: [_jsx("div", { style: { fontSize: "2rem" }, children: "\uD83D\uDEA7" }), _jsx("h1", { children: "Protected 404" }), _jsx("p", { children: "This page does not exist or is restricted." })] }) }));
};
export default NotFoundPage;
