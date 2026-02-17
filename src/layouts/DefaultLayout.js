import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import AppHeader from "@/layouts/AppHeader";
import AppSidebar from "@/layouts/AppSidebar";
import AppContent from "@/layouts/AppContent";
import AppFooter from './AppFooter';
const DefaultLayout = () => {
    const [isToggle, setIsToggle] = useState(() => {
        return localStorage.getItem("sidebarToggle") === "true";
    });
    useEffect(() => {
        console.log("console .log ", isToggle);
        localStorage.setItem("sidebarToggle", String(isToggle));
    }, [isToggle]);
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, { isToggle: isToggle, setIsToggle: setIsToggle }), _jsx(AppSidebar, { isToggle: isToggle }), _jsx(AppContent, { isToggle: isToggle }), _jsx(AppFooter, {})] }));
};
export default DefaultLayout;
