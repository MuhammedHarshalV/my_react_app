import apiClient from "./apiClient";
import { AlertService } from "../../components/common/alert/AlertService";

const handleResponse = (response) => {
    const isValidStatus =
        response.status >= 200 &&
        response.status < 300;

    const isSuccess =
        response.data?.success === true;

    if (isValidStatus && isSuccess) {
        return response.data;
    }
    else {
        AlertService.show({
            message:
                response.data?.message ||
                "Something went wrong",
            type: "error",
        });
    }


    return null;
};

export const ApiService = {

    // =========================
    // GET
    // =========================
    get: async (
        url,
        {
            queryParams = {},
            headers = {},
        } = {}
    ) => {

        const response = await apiClient.get(
            url,
            {
                params: queryParams,
                headers,
            }
        );

        return handleResponse(response);
    },


    // =========================
    // POST
    // =========================
    post: async (
        url,
        {
            body = {},
            queryParams = {},
            headers = {},
        } = {}
    ) => {
        const response = await apiClient.post(
            url,
            body,
            {
                params: queryParams,
                headers,
            }
        );

        return handleResponse(response);
    },


    // =========================
    // PUT
    // =========================
    put: async (
        url,
        {
            body = {},
            queryParams = {},
            headers = {},
        } = {}
    ) => {

        const response = await apiClient.put(
            url,
            body,
            {
                params: queryParams,
                headers,
            }
        );

        return handleResponse(response);
    },


    // =========================
    // PATCH
    // =========================
    patch: async (
        url,
        {
            body = {},
            queryParams = {},
            headers = {},
        } = {}
    ) => {

        const response = await apiClient.patch(
            url,
            body,
            {
                params: queryParams,
                headers,
            }
        );

        return handleResponse(response);
    },


    // =========================
    // DELETE
    // =========================
    delete: async (
        url,
        {
            body = {},
            queryParams = {},
            headers = {},
        } = {}
    ) => {

        const response = await apiClient.delete(
            url,
            {
                data: body,
                params: queryParams,
                headers,
            }
        );

        return handleResponse(response);
    },
};