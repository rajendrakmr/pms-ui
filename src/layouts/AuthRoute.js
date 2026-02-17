import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
const AuthRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
export default AuthRoute;
