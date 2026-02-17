import axios from "@/utils/axios";
export const apiRequest = async ({ url, method = "GET", data, params, }) => {
    const response = await axios({ url, method, data, params });
    return response.data;
};
