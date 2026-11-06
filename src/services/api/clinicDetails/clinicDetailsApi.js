import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";


export const getClinicDetailsApi = async ({
    startDate = "",
    endDate = "",
    search = '',
    page = '',
    limit = '',
    approved = '',
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