
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const getAllDevicesApi = async ({
    page = 1,
    limit = 10,
    search = "",
} = {}) => {
    const queryParams = { page, limit };

    const text = search.trim();
    if (text) queryParams.search = text;

    const response = await ApiService.get(
        ApiEndpoints.getAllDevices,
        { queryParams },
    );

    return response;
};