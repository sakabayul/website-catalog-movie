import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
    include_image_language: "en,null",
  },
});

// ✅ Interceptor untuk request
apiClient?.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// ✅ Interceptor untuk response
apiClient?.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server merespon dengan error
      console.error(
        `[API ERROR] ${error.response.status} - ${error.response.statusText}: ${error.response.data?.message || "No detailed message"}`
      );
    } else if (error.request) {
      // Tidak ada response dari server
      console.error("[API ERROR] No response received:", error.request);
    } else {
      // Error lainnya (misalnya kesalahan dalam konfigurasi request)
      console.error("[API ERROR] Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);
