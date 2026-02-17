import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelector } from "react-redux";
// import { useAppSelector } from "../store/hooks";
const BreadCrumbs = () => {
    const items = useSelector((state) => state.breadcrumbs.items);
    return (_jsx("nav", { "aria-label": "breadcrumb", children: _jsxs("ol", { className: "breadcrumb mb-0", children: [_jsx("li", { className: "breadcrumb-item", children: _jsx("a", { href: "/apps/dashboard", children: "Dashboard" }) }), items?.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (_jsx("li", { className: `breadcrumb-item ${isLast ? "active" : ""}`, "aria-current": isLast ? "page" : undefined, children: item.path && !isLast ? (_jsx("a", { href: item.path, children: item.label })) : (item.label) }, index));
                })] }) }));
};
export default BreadCrumbs;
