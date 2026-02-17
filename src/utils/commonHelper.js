// src/utils/menuUtils.ts
import { apiRequest } from "@/store/services/api";
export const flattenMenus = (menus, moduleId, moduleName) => {
    let result = [];
    for (const menu of menus) {
        result.push({
            moduleId,
            moduleName,
            menuId: menu.menuId,
            menuName: menu.menuNameTree,
        });
        if (menu.children?.length) {
            result = result.concat(flattenMenus(menu.children, moduleId, moduleName));
        }
    }
    return result;
};
export const searchConfig = {
    container: {
        title: 'Select Conatainer No',
        url: '/api/containerNoForServiceAdd',
        field: "containerNo",
        dispField: "containerNo",
        columns: [
            { field: 'name', header: 'Container No' },
        ]
    },
    port: {
        title: 'Select Port of Destination',
        url: '/api/ports',
        field: "portCode",
        dispField: "portName",
        columns: [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
        ]
    },
    shipper: {
        title: 'Select Shipper',
        url: '/api/shippers',
        field: "shipperName",
        dispField: "shipperName",
        columns: [
            { field: 'name', header: 'Name' }
        ]
    },
    vessel: {
        title: 'Select Vessel',
        url: '/api/vessels',
        field: "vesselName",
        dispField: "vesselNo",
        columns: [
            { field: 'vesselName', header: 'Vessel Name' },
            { field: 'vesselNo', header: 'Vessel No' },
            { field: 'voyageNumber', header: 'Voyage No' }
        ]
    },
    location: {
        title: 'Select To Location',
        url: '/api/locations',
        exec: "&exclude=LOC001",
        field: "locationCode",
        dispField: "locationName",
        columns: [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
        ]
    },
    agent: {
        title: 'Select CH Agent',
        url: '/api/agents',
        field: "agentNames",
        dispField: "agentCode",
        columns: [
            { field: 'name', header: 'Agent Name' },
            { field: 'code', header: 'Agent Code' },
        ]
    },
    cargo: {
        title: 'Select Cargo',
        url: '/api/cargo',
        field: "cargoCode",
        dispField: "cargoName",
        columns: [
            { field: 'code', header: 'Cargo Code' },
            { field: 'name', header: 'Cargo Name' },
        ]
    },
    liner: {
        title: 'Select Liner',
        url: '/api/liners',
        field: "linerCode",
        dispField: "linerName",
        columns: [
            { field: 'partyCode', header: 'Code' },
            { field: 'agentName', header: 'Name' },
        ]
    }
};
export const extractUserId = (value) => {
    if (!value)
        return "";
    const parts = value.split("/");
    return parts.length > 1 ? parts[1] : value;
};
export const isCheckedChild = async (row, menuId) => { return row.some((element) => element.menuId !== menuId && element.checked === 1 && element.leaf === 1); };
export const checkParentMenuCheck = async (row, menuId) => {
    return row.some((element) => element.menuId !== menuId && element.checked === 1 && element.leaf === 1);
};
export const fetchCommonData = async ({ url, setForm, t_field_a, t_field_b, t_field_c, field_a, field_b, field_c, }) => {
    try {
        const response = await apiRequest({ url, method: "GET" });
        const records = response?.content ?? [];
        const count = records.length;
        if (count === 0)
            return;
        const data = records[0];
        setForm((prev) => ({
            ...prev,
            ...(field_a && t_field_a && data[field_a] !== undefined && {
                [t_field_a]: data[field_a],
            }),
            ...(field_b && t_field_b && data[field_b] !== undefined && {
                [t_field_b]: data[field_b],
            }),
            ...(field_c && t_field_c && data[field_c] !== undefined && {
                [t_field_c]: data[field_c],
            }),
        }));
    }
    catch (error) {
        console.error(error);
    }
};
export const calculateDays = (from, to) => {
    if (!from || !to)
        return 0;
    const start = new Date(from);
    const end = new Date(to);
    if (isNaN(start.getTime()) || isNaN(end.getTime()))
        return 0;
    if (end < start)
        return 0;
    const diff = end.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
};
