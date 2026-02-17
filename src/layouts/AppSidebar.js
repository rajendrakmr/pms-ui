import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-bootstrap";
import { useSelector, shallowEqual } from "react-redux";
import "./AppSidebar.css";
const Sidebar = ({ isToggle }) => {
    const menu = useSelector((state) => state.menu.items, shallowEqual);
    const location = useLocation();
    const currentPath = location.pathname;
    const [openMenus, setOpenMenus] = useState({});
    const [activeMenus, setActiveMenus] = useState({});
    const toggleMenu = useCallback((path) => {
        setOpenMenus(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    }, []);
    const auth = JSON.parse(localStorage.getItem("auth_data") || "null");
    useEffect(() => {
        const openState = {};
        const activeState = {};
        const traverse = (items, level = 0, parentKey = "") => {
            return items?.some((item, index) => {
                const key = `${parentKey}${level}-${index}-${item.name}`;
                const selfActive = currentPath === item.menuLinkName;
                let childActive = false;
                if (item.children?.length) {
                    childActive = traverse(item.children, level + 1, key + "-");
                    if (childActive)
                        openState[key] = true;
                }
                if (selfActive || childActive) {
                    activeState[key] = true;
                    return true;
                }
                return false;
            });
        };
        traverse(menu);
        setOpenMenus(openState);
        setActiveMenus(activeState);
    }, [currentPath, menu]);
    // 🔁 recursive render
    const renderMenu = (items, level = 0, parentKey = "") => (_jsx("ul", { className: `menu-level menu-level-${level}`, children: items?.map((item, index) => {
            const key = `${parentKey}${level}-${index}-${item.name}`;
            const hasChildren = !!item.children?.length;
            const isOpen = openMenus[key];
            const isActive = activeMenus[key];
            return (_jsxs("li", { children: [_jsx("div", { className: `menu-item ${hasChildren ? "parent" : "child"} ${isActive ? "active" : ""}`, onClick: () => hasChildren && toggleMenu(key), children: hasChildren ? (_jsxs(_Fragment, { children: [_jsx("span", { children: item.menuNameTree }), _jsx(FontAwesomeIcon, { icon: isOpen ? faAngleDown : faAngleRight, className: "menu-arrow" })] })) : (_jsx(Link, { to: item.menuLinkName, className: "menu-link", children: item?.menuNameTree })) }), hasChildren && (_jsx(Collapse, { in: isOpen, children: _jsx("div", { children: renderMenu(item.children, level + 1, key + "-") }) }))] }, key));
        }) }));
    return (_jsx("aside", { className: `rk_sidebar ${isToggle ? "sidebarToogleCls" : ""}`, children: _jsxs("div", { className: "sidebar_fixed", children: [_jsxs("div", { className: "sidebar_logo_container text-center", children: [_jsx("img", { src: "/public/logo.png", alt: "Logo", className: "sidebar-logo" }), _jsx("strong", { className: "user-name", children: "V.O. Chidambaranar Port Authority" }), _jsxs("p", { className: "user-role", children: ["Welcome, ", auth?.username] })] }), _jsx("div", { className: "sidebar_routes_container", children: renderMenu(menu) })] }) }));
};
export default React.memo(Sidebar);
