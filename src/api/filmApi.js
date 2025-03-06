import axios from "axios";

// Mengambil API Key dan Base URL dari environment variables
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

// Membuat instance Axios dengan konfigurasi dasar
export const apiClient = axios.create({
  baseURL: BASE_URL, // Base URL untuk semua request API
  params: {
    api_key: API_KEY, // API key yang diperlukan untuk autentikasi TMDB API
    language: "en-US", // Default bahasa untuk response
    include_image_language: "en,null", // Menyertakan bahasa gambar dalam response
  },
});

// Interceptor untuk menangani request sebelum dikirim ke server
apiClient?.interceptors.request.use(
  (config) => {
    // Bisa digunakan untuk menambahkan header atau logging sebelum request dikirim
    return config;
  },
  (error) => {
    // Menangani error sebelum request dikirim
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani response dari server
apiClient?.interceptors.response.use(
  (response) => {
    // Mengembalikan response jika berhasil
    return response;
  },
  (error) => {
    // Menangani error response dari server
    if (error.response) {
      // Server mengembalikan response dengan status error
      console.error(
        `[API ERROR] ${error.response.status} - ${error.response.statusText}: ${error.response.data?.message || "No detailed message"}`
      );
    } else if (error.request) {
      // Request dikirim tapi tidak mendapat response dari server
      console.error("[API ERROR] No response received:", error.request);
    } else {
      // Kesalahan dalam konfigurasi request
      console.error("[API ERROR] Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);
