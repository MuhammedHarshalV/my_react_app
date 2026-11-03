
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const getAllEmployeesApi = async ({
    page = 1,
    limit = 2,
    search = "",
} = {}) => {
    const queryParams = { page, limit };

    const text = search.trim();
    if (text) queryParams.search = text;

    const response = await ApiService.get(
        ApiEndpoints.getAllEmployees,
        { queryParams },
    );

    return response;
};