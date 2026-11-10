
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const getAllExpensesApi = async ({
    page = 1,
    limit = 10,
    startDate = null,
    endDate = null,
    search = null,
    isApproved = null,
    expenseType = null,

} = {}) => {
    const queryParams = { page, limit, startDate, endDate, search, isApproved, expenseType };



    const response = await ApiService.get(
        ApiEndpoints.getAllExpenses,
        { queryParams },
    );

    return response;
};