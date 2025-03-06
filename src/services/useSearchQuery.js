import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook untuk melakukan query data menggunakan React Query.
 * 
 * @param {string} queryKey - Kunci unik untuk query yang digunakan oleh React Query.
 * @param {string} query - Parameter query yang digunakan dalam fungsi fetch.
 * @param {Function} fetchFunction - Fungsi yang akan digunakan untuk mengambil data.
 * @param {boolean} [bolean=true] - Menentukan apakah query akan dijalankan secara otomatis atau tidak.
 * @returns {Object} - Mengembalikan objek hasil dari useQuery React Query.
 */
const useSearchQuery = (queryKey, query, fetchFunction, bolean = true) => {
  return useQuery({
    queryKey: [queryKey, query], // Kunci unik untuk query, terdiri dari queryKey dan query parameter
    queryFn: () => fetchFunction(query), // Fungsi untuk mengambil data berdasarkan query
    enabled: bolean, // Jika false, query tidak akan berjalan otomatis
  });
};

export default useSearchQuery;
