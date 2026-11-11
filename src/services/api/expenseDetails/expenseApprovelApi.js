
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";



export const approveExpensesApi = async (expenses = []) => {




    const response = await ApiService.post(
        ApiEndpoints.expenseApprovel,
        {
            body: expenses,
        }
    );

    return response;
};