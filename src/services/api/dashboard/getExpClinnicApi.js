import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";


export const getExpClinicApi = async ({
    compareMonth = "",
    compareYear = "",
} = {}) => {

    const currentDate = new Date();


    const currentYear = currentDate.getFullYear();

    const previousDate = new Date(
        currentYear,
        currentDate.getMonth() - 1,
        1
    );

    // If empty, automatically assign previous month/year
    if (!compareMonth) {
        compareMonth = previousDate.getMonth() + 1;
    }

    if (!compareYear) {
        compareYear = previousDate.getFullYear();
    }

    const queryParams = {
        compareMonth,
        compareYear,

    };

    const response = await ApiService.get(
        ApiEndpoints.dashExpenseClinic,
        { queryParams }
    );

    return response;
};