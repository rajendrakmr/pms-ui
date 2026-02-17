import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DataTable } from "primereact/datatable";
import { Column as PrimeColumn } from "primereact/column";
import { Paginator } from "primereact/paginator";
import "./PopUpCheckBox.css";
import { RadioButton } from "primereact/radiobutton";
import { toast } from "react-toastify";
import { validationRequest } from "@/utils/validationRequest";
import moment from "moment";
import { calculateDays } from "@/utils/commonHelper";
const PopUpCheckBox = ({ isOpen, onClose, itemsPerPage = 12, apiRequest, config, setFormData, setIsEdit }) => {
    const [loading, setLoading] = useState(false);
    const [first, setFirst] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [rowItems, setRowItems] = useState([]);
    const [queryData, setQueryData] = useState({});
    const [errors, setErrors] = useState({});
    /* ---------------- FILTER COLUMNS ---------------- */
    const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
    const validationRules = {
        q: { required: true, minLength: 2, maxLength: 50 }
    };
    const fetchChitNoData = async (params, query = "", page = 0, size = itemsPerPage) => {
        try {
            setLoading(true);
            const exc = params?.exec ? params?.exec : '';
            const url = `${params?.url}?page=${page}&size=${size}${exc}${query}`;
            const response = await apiRequest({ url: url, method: "GET" });
            if (response?.content?.length > 0) {
                setRowItems(response.content);
                setFirst(page);
                setTotalElements(response.totalElements);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const query = `&q=${config?.search}`;
        fetchChitNoData(config, query, 0, itemsPerPage);
        setQueryData((prev) => ({
            ...prev,
            q: config?.search
        }));
    }, [config]);
    const searchItem = useCallback(async () => {
        const { isValid, errors } = validationRequest(queryData, validationRules);
        setErrors(errors);
        if (!isValid) {
            toast.error("Search key is missing. Please check and try again.", {
                position: "top-right",
                autoClose: 4000,
            });
            return;
        }
        setFirst(0);
        const query = `&q=${queryData.q}`;
        fetchChitNoData(config, query, 0, itemsPerPage);
    }, [config, queryData]);
    const resetItem = useCallback(async () => {
        setErrors({});
        setQueryData({});
        setFirst(0);
        const query = `&q=`;
        fetchChitNoData(config, query, 0, itemsPerPage);
    }, [config]);
    const onPageChange = useCallback(async (e) => {
        setFirst(e.first);
        setRowsPerPage(e.rows);
        const query = `&q=`;
        fetchChitNoData(config, query, e.page, e.rows);
    }, [config]);
    const [selectedKey, setSelectedKey] = useState("");
    useEffect(() => {
        if (config?.search) {
            setSelectedKey(config.search);
        }
    }, [config]);
    const onchangeRequest = useCallback(async (config, rowData) => {
        try {
            if (config?.field === "containerNo") {
                setIsEdit?.(true);
                const containerNo = rowData?.[config?.columns?.[0]?.field || ""];
                const response = await apiRequest({
                    url: `/api/containerInPortDetails?containerNo=${containerNo}`,
                    method: "GET",
                });
                const responseDetail = await apiRequest({
                    url: `/service/charge/search?chitNo=${response?.chitNo}&containerNo=${response?.containerNo}`,
                    method: "GET",
                });
                const detail = responseDetail?.success && responseDetail?.success?.serviceDetails?.length
                    ? responseDetail?.success?.serviceDetails.map((item) => {
                        const rate = Number(item.rate) || 0;
                        const days = calculateDays(moment(item.serviceFromDate, "DD/MM/YYYY").format("YYYY-MM-DD"), moment(item.serviceToDate, "DD/MM/YYYY").format("YYYY-MM-DD"));
                        const amount = rate * days;
                        const gstRate = 0.18;
                        const gstAmount = amount * gstRate;
                        return {
                            id: item?.id ? item?.id : "",
                            cfsNo: item?.cfsNo ? item?.cfsNo : "",
                            cfsDate: item.cfsDate ? moment(item.cfsDate, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
                            service: item?.serviceTypeCd,
                            from: item.serviceFromDate ? moment(item.serviceFromDate, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
                            to: item.serviceToDate ? moment(item.serviceToDate, "DD/MM/YYYY").format("YYYY-MM-DD") : "",
                            rate: item?.rate ? item?.rate : 0,
                            amount: item?.amount ? item?.amount : 0,
                            sgst: item?.sgst ? item?.sgst : 0,
                            cgst: item?.cgst ? item?.cgst : 0,
                            igst: item?.igst ? item?.igst : 0,
                            gst: Number(gstAmount.toFixed(2)) || 0,
                            totalVal: item?.totalVal ? item?.totalVal : 0,
                            paymentNo: item?.paymentNo ? item?.paymentNo : "",
                            paymentDate: item.paymentDate ? item?.paymentDate : "",
                            remarks: item?.serviceRemarks ? item?.serviceRemarks : "",
                            cancelFlag: "N",
                        };
                    }) : [];
                setFormData((prev) => ({
                    ...prev,
                    ...rowData,
                    details: detail,
                    adChitNo: response?.chitNo,
                    adTime: response?.gateInDateTime ? moment(response.gateInDateTime).format("YYYY-MM-DD") : "",
                    containerNo: response?.containerNo,
                    chAgentCode: response?.agentCode,
                    chAgentName: response?.agentName,
                    shipBillNo: response?.boeNo,
                    containerSize: response?.containerSize,
                    loadingStatus: response?.loadingStatus,
                    foreignCoastalFlag: response?.foreignCoastalFlag,
                    delDateTentive: "",
                    delDateActual: "",
                }));
            }
            else {
                const value = rowData?.[config?.columns?.[0]?.field || ""];
                setFormData((prev) => ({
                    ...prev,
                    ...rowData,
                    [config?.field || ""]: value,
                    ...(config?.columns?.length > 1 &&
                        config?.columns?.[1]?.field && {
                        [config.dispField || ""]: rowData?.[config.columns[1].field],
                    }),
                }));
            }
            onClose?.();
        }
        catch (error) {
            console.error("onchangeRequest error:", error);
        }
    }, []);
    return (_jsxs(_Fragment, { children: [isOpen && _jsx("div", { className: "modal-overlay", onClick: onClose }), _jsxs(motion.div, { initial: { x: 1000 }, animate: { x: isOpen ? 0 : 1000 }, transition: { duration: 0.3 }, className: "modal-right", children: [_jsxs("div", { className: "modal-content", children: [_jsxs("div", { className: "p-3 d-flex justify-content-between align-items-center", style: { backgroundColor: "#023e8a" }, children: [_jsx("h5", { className: "mb-0 text-white", children: config?.title }), _jsx("button", { className: "btn btn-outline-light btn-sm", onClick: onClose, children: "Back" })] }), _jsxs("div", { className: "input-group mb-3 mt-2", children: [_jsx("input", { type: "text", name: "q", value: queryData?.q || "", onChange: (e) => {
                                            setQueryData((prev) => ({
                                                ...prev,
                                                q: e.target.value,
                                            }));
                                            setErrors({});
                                        }, className: `form-control ${errors?.q ? "is-invalid" : ""}`, style: { borderRadius: "0px" }, placeholder: "Type to search..." }), _jsx("div", { className: "input-group-append pl-2", onClick: !loading ? searchItem : undefined, children: _jsx("span", { className: "input-group-text", style: { borderRadius: "0px", cursor: loading ? "not-allowed" : "pointer" }, children: loading ? "Searching..." : "Search 🔍" }) }), _jsx("div", { className: "input-group-append", onClick: !loading ? resetItem : undefined, children: _jsx("span", { className: "input-group-text", style: { borderRadius: "0px", cursor: loading ? "not-allowed" : "pointer" }, children: "Reset \uD83D\uDD04" }) })] }), _jsxs(DataTable, { value: rowItems, emptyMessage: loading ? (_jsx("div", { className: "tablee-loader", children: _jsx("i", { className: "pi pi-spin pi-spinner", style: { fontSize: '2rem' } }) })) : ("No records found"), size: "small", stripedRows: true, loading: loading, showGridlines: true, className: "p-datatable-sm shadow-sm", children: [_jsx(PrimeColumn, { header: "Select", style: { width: "3rem" }, headerStyle: { backgroundColor: "#023e8a", color: "#fff", fontWeight: "bold" }, body: (rowData) => {
                                            let rowKey = rowData[config?.columns?.[0].field];
                                            if (config?.columns.length && config?.columns?.[1]?.field) {
                                                rowKey = rowData[config?.columns?.[1].field];
                                            }
                                            return (_jsx(RadioButton, { inputId: rowKey, checked: selectedKey === rowKey, onChange: (e) => { e.preventDefault(); onchangeRequest(config, rowData); } }));
                                        } }), config?.columns?.map((col) => (_jsx(PrimeColumn, { field: col.field, header: col.header, headerStyle: { backgroundColor: "#023e8a", color: "#fff", fontWeight: "bold" } }, col.field)))] }), rowItems && _jsxs("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [_jsxs("div", { children: ["Total Records: ", totalElements] }), rowItems.length > 0 &&
                                        _jsx(Paginator, { first: first, rows: rowsPerPage, totalRecords: totalElements, rowsPerPageOptions: [5, 10, 20], onPageChange: onPageChange, template: "FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink" })] })] }), _jsx("footer", { className: "footer d-flex flex-column flex-md-row align-items-end justify-content-between px-4 py-3 border-top small", children: _jsx("p", { className: "text-muted mb-1 mb-md-0", children: "\u00A9 2026 DCG Data-Core Systems (India) Private Limited. All rights reserved." }) })] })] }));
};
export default PopUpCheckBox;
