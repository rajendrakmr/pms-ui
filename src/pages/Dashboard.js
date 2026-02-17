import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { setBreadcrumbs } from "@/store/slice/bredCrumbs";
import { useGetMenuQuery } from "@/store/apiSlice";
// import { setMenu } from "@/store/slice/menuSlice";
import { extractUserId } from "@/utils/commonHelper";
import { setMenu } from "@/store/slice/menuSlice";
// import { RootState } from "@reduxjs/toolkit/query";
const Dashboard = () => {
    const dispatch = useDispatch();
    const currentId = useSelector((state) => state.auth.userId);
    const cleanedUserId = extractUserId(currentId);
    const { data, isLoading } = useGetMenuQuery(cleanedUserId, { skip: !cleanedUserId, });
    const menus = useSelector((state) => state);
    console.log('menusmenus', menus);
    useEffect(() => {
        if (data?.success?.length) {
            dispatch(setMenu(data?.success));
        }
    }, [data, dispatch]);
    console.log(data, "menu data");
    useEffect(() => {
        dispatch(setBreadcrumbs([]));
    }, [dispatch]);
    return (_jsx("div", { className: "_rkContentBorder row py-3", children: _jsx("div", { className: "d-flex justify-content-between align-items-center flex-wrap grid-margin mb-3", children: _jsxs("div", { children: [_jsx("h4", { className: "mb-1", children: "V.O. Chidambaranar Port Authority" }), _jsx("p", { className: "text-muted mb-0", children: "Welcome, ADMIN Tester (DCI)" })] }) }) }));
};
export default Dashboard;
