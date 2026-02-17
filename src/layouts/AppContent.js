import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NotFoundPage from '@/pages/NotFoundPage';
import routes from '@/router/routes';
const AppContent = ({ isToggle }) => {
    return (_jsx("div", { className: `rk_content ${isToggle ? "rkToogleContent" : ""}`, id: "kt_app_main", children: _jsx(Suspense, { fallback: _jsx("div", { className: "w-full h-screen text-gray-300 dark:text-gray-200 bg-base-100", children: "Loading..." }), children: _jsxs(Routes, { children: [routes.map((route, idx) => {
                        return (route.component && (_jsx(Route, { path: route.url, element: _jsx(route.component, {}) }, idx)));
                    }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: "backend/dashboard", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }) }) }));
};
export default AppContent;
