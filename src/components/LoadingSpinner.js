import { jsx as _jsx } from "react/jsx-runtime";
// LoadingSpinner.tsx
import "./LoadingSpinner.css";
export const LoadingSpinner = ({ size = 40 }) => {
    return (_jsx("div", { className: "internet-loader", style: {
            width: size,
            height: size
        } }));
};
