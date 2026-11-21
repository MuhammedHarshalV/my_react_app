
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const getClinicalDetailsApi = async ({
    page = 1,
    limit = 10,
    startDate = null,
    endDate = null,
    search = null,


} = {}) => {
    const queryParams = { page, limit, startDate, endDate, search };



    const response = await ApiService.get(
        ApiEndpoints.getClinicalDetails,
        { queryParams },
    );

    return response;
};