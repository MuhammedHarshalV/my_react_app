
import { ApiEndpoints } from "../../constants/apiConstants";
import { ApiService } from "../core/apiServices";
import { TokenStorage } from "../core/tokenStorage";

export const adminLoginApi = async (username, password) => {
    const response = await ApiService.post(
        ApiEndpoints.adminLogin,
        {
            body: {
                "refresh_token": TokenStorage.getRefreshToken
            }
        }
    );
    if (response?.success === true) {
        TokenStorage.saveTokens(
            response.data["access_token"],
            response.data["refresh_token"]
        );
    }

    return response;
};