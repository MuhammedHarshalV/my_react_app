
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const getUsersNameApi = async ({
    page = 1,
    limit = 10,

} = {}) => {
    const queryParams = { page, limit };



    const response = await ApiService.get(
        ApiEndpoints.getUsersName,
        { queryParams },
    );

    return response;
};