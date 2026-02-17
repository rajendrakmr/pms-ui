import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingFetchLoader from './components/LoadingFetchLoader';
const AuthRoute = lazy(() => import('@/layouts/AuthRoute'));
const DefaultLayout = lazy(() => import('@/layouts/DefaultLayout'));
const AuthLogin = lazy(() => import('@/pages/authentication/Index'));
// import { persistor } from "./store";
const App = () => {
    const isAuthenticated = true;
    return (_jsx(Router, { basename: "/apps", children: _jsx(Suspense, { fallback: _jsx(LoadingFetchLoader, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(AuthLogin, {}) }), _jsx(Route, { path: "*", element: _jsx(AuthRoute, { isAuthenticated: isAuthenticated, children: _jsx(DefaultLayout, {}) }) })] }) }) }));
};
export default App;
