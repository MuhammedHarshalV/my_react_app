
import axios from "axios";

import { TokenStorage } from "./tokenStorage";
import { ApiEndpoints, BASE_URL } from "../../constants/apiConstants";
import { toast } from "react-toastify";

const showApiError = (error) => {
  // No internet
  if (
    !navigator.onLine ||
    error.message === "NO_INTERNET"
  ) {
    toast.error("No internet connection");
    return;
  }

  // Timeout
  if (
    error.code === "ECONNABORTED" ||
    error.code === "ETIMEDOUT"
  ) {
    toast.warning(
      "Request timed out. Please try again."
    );
    return;
  }

  // Backend error message
  if (error.response?.data?.message) {
    toast.error(
      error.response.data.message
    );
    return;
  }

  // Network / server / CORS
  if (error.message === "Network Error") {
    toast.error(
      "Unable to connect to server"
    );
    return;
  }

  // Default
  toast.error(
    error.message ||
    "Something went wrong"
  );
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});


// ============================================
// REFRESH TOKEN STATE
// ============================================

let isRefreshing = false;
let refreshSubscribers = [];


// ============================================
// SUBSCRIBERS
// ============================================

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const notifySubscribers = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => {
    callback(newAccessToken);
  });

  refreshSubscribers = [];
};


// ============================================
// REQUEST INTERCEPTOR
// ============================================

apiClient.interceptors.request.use(
  (config) => {
    // ==============================
    // API REQUEST LOG
    // ==============================

    console.log("========== API REQUEST ==========");
    console.log(
      "Method:",
      config.method?.toUpperCase()
    );
    console.log(
      "URL:",
      `${config.baseURL || ""}${config.url || ""}`
    );
    console.log(
      "Query Params:",
      config.params || {}
    );
    console.log(
      "Body:",
      config.data || {}
    );
    console.log(
      "Headers:",
      config.headers
    );
    console.log("=================================");


    // Check internet
    if (!navigator.onLine) {
      const error = new Error("NO_INTERNET");

      showApiError(error);

      return Promise.reject(error);
    }

    // Get access token
    const accessToken =
      TokenStorage.getAccessToken();

    // Add access token automatically
    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ============================================
// RESPONSE INTERCEPTOR
// ============================================

apiClient.interceptors.response.use(

  // Success response
  (response) => {
    console.log("========== API SUCCESS ==========");

    console.log("Response:", response.data);
    console.log("=================================");
    return response;
  },


  // Error response
  async (error) => {
    console.log("========== API ERROR ==========");

    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    console.log("Message:", error.message);
    console.log("===============================");

    const originalRequest = error.config;

    if (!originalRequest) {
      showApiError(error);
      return Promise.reject(error);
    }


    // ========================================
    // ACCESS TOKEN EXPIRED
    // ========================================

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;


      // ======================================
      // REFRESH ALREADY RUNNING
      // ======================================

      if (isRefreshing) {
        console.log("bbbbbbbbb");
        return new Promise((resolve, reject) => {

          subscribeTokenRefresh(
            (newAccessToken) => {

              if (!newAccessToken) {
                reject(error);
                return;
              }

              originalRequest.headers.Authorization =
                `Bearer ${newAccessToken}`;

              resolve(
                apiClient(originalRequest)
              );
            }
          );

        });
      }


      // ======================================
      // START REFRESH TOKEN API
      // ======================================

      isRefreshing = true;

      try {

        const refreshToken =
          TokenStorage.getRefreshToken();


        if (!refreshToken) {

          TokenStorage.clearTokens();
          console.log("cccccccccc");

          toast.warning("Your session has expired. Please log in again.");
          // window.location.href = "/";

          return Promise.reject(error);
        }


        // IMPORTANT:
        // Use axios directly here.
        // Do NOT use apiClient.
        // Otherwise refresh API can trigger
        // the same interceptor recursively.

        const refreshResponse =
          await axios.post(
            `${BASE_URL}${ApiEndpoints.refreshToken}`,
            {
              refresh_token: refreshToken,
            },
            {
              timeout: 30000,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        console.log("======== refresh token trigger ========");
        console.log("Refresh Token API Response:", response.data);
        console.log("New Access Token:", response.data.access_token);
        console.log("Status Code:", response.status);
        // ======================================
        // GET NEW ACCESS TOKEN
        // ======================================

        const newAccessToken =
          refreshResponse.data.data["access_token"];


        if (!newAccessToken) {
          throw new Error(
            "Access token not received"
          );
        }


        // ======================================
        // SAVE NEW ACCESS TOKEN
        // ======================================

        TokenStorage.saveAccessToken(
          newAccessToken
        );


        // If your backend also rotates
        // refresh token
        if (
          refreshResponse.data.data["refresh_token"]
        ) {
          TokenStorage.saveRefreshToken(
            refreshResponse.data.data["refresh_token"]
          );
        }


        // ======================================
        // UPDATE FAILED REQUEST
        // ======================================

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;


        // ======================================
        // RELEASE WAITING APIs
        // ======================================

        notifySubscribers(newAccessToken);


        // ======================================
        // CALL ACTUAL API AGAIN
        // ======================================

        return apiClient(originalRequest);

      } catch (refreshError) {

        TokenStorage.clearTokens();
        console.log("ddddddddddd");

        notifySubscribers(null);

        window.location.href = "/";

        return Promise.reject(
          refreshError
        );

      } finally {

        isRefreshing = false;

      }
    }

    showApiError(error);
    return Promise.reject(error);
  }
);


export default apiClient;