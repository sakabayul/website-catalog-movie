import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css';
import App from "./App";

/**
 * Membuat instance `QueryClient` untuk mengelola caching dan state data yang di-fetch menggunakan React Query.
 */
const queryClient = new QueryClient();

// Merender aplikasi React ke dalam elemen root di HTML
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Membungkus aplikasi dengan `QueryClientProvider` agar React Query bisa digunakan di seluruh aplikasi */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
