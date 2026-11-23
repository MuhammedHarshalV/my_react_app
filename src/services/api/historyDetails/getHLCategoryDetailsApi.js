
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const getHLcategoryDetailsApi = async () => {




    const response = await ApiService.get(
        ApiEndpoints.getHLcategoryDetails,

    );

    return response;
};