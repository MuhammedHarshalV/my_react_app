import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";


export const getExpenseComparisonApi = async ({
    compareMonth = "",
    compareYear = "",
} = {}) => {

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1;
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
        currentMonth,
        currentYear,
    };

    const response = await ApiService.get(
        ApiEndpoints.dashExpenseCompare,
        { queryParams }
    );

    return response;
};