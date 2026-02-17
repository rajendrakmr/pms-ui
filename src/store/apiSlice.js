import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENV, DEV_API_URL, PRD_API_URL, LOCAL_API_URL, } from "../utils/config";
let BaseUrl = "";
if (ENV === "dev") {
    BaseUrl = DEV_API_URL;
}
else if (ENV === "prd") {
    BaseUrl = PRD_API_URL;
}
else {
    BaseUrl = LOCAL_API_URL;
}
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: BaseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState()?.auth?.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (body) => ({
                url: "/user/login",
                method: "POST",
                body,
            }),
        }),
        getMenu: builder.query({
            query: (userId) => `/menubyuser/${userId}`,
        }),
    }),
});
export const { useLoginMutation, useGetMenuQuery } = apiSlice;
