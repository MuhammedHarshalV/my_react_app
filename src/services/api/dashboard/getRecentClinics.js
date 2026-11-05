import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";


export const getRecentClinicsApi = async () => {



    const response = await ApiService.get(
        ApiEndpoints.recentClinicVisits,

    );

    return response;
};