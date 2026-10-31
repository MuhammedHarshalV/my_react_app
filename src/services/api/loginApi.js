
import { ApiEndpoints } from "../../constants/apiConstants";
import { ApiService } from "../core/apiServices";

import { TokenStorage } from "../core/tokenStorage";

export const adminLoginApi = async (username, password) => {
    const response = await ApiService.post(
        ApiEndpoints.adminLogin,
        {
            queryParams: {
                name: username,
                password: password,
            },
        }
    );

    if (response?.success === true) {
        TokenStorage.saveTokens(
            response.access_token,
            response.refresh_token
        );
    }
    console.log("LOGIN SUCCESS");
    console.log(
        "Access token saved:",
        !!TokenStorage.getAccessToken()
    );
    console.log(
        "Refresh token saved:",
        !!TokenStorage.getRefreshToken()
    );
    return response;
};