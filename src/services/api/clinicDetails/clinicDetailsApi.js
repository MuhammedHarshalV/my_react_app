import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";


export const getClinicDetailsApi = async ({
    startDate = null,
    endDate = null,
    search = null,
    page = 1,
    limit = 6,
    approved = null,
} = {}) => {



    const queryParams = {
        startDate,
        endDate,
        search,
        page,
        limit,
        approved,
    };

    const response = await ApiService.get(
        ApiEndpoints.clinicDetails,
        { queryParams }
    );

    return response;
};