
import { ApiEndpoints } from "../../../constants/apiConstants";
import { ApiService } from "../../core/apiServices";


export const removeDeviceApi = async ({
    DeviceID = "",
} = {}) => {
    const queryParams = {};

    if (DeviceID) {
        queryParams.device_id = DeviceID;
    }

    const response = await ApiService.delete(
        ApiEndpoints.deleteDevice,
        { queryParams }
    );

    return response;
};