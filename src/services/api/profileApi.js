
import { ApiEndpoints } from "../../constants/apiConstants";
import { ApiService } from "../core/apiServices";



export const getProfileApi = async () => {
    const response = await ApiService.get(
        ApiEndpoints.getProfile,

    );


    return response;
};