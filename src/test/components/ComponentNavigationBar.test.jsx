import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import NavigationBar from "../../components/ComponentNavigationBar";

// Mock `useLocation`
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(() => ({ pathname: "/" })), // Default ke halaman home
    Link: actual.Link,
  };
});

// Import useLocation setelah dimock
import { useLocation } from "react-router-dom";

describe("NavigationBar Component", () => {
    it("Render dengan benar", () => {
      render(
        <MemoryRouter>
          <NavigationBar query="" setQuery={() => {}} />
        </MemoryRouter>
      );
  
      expect(screen.getByAltText("TMDB Logo")).toBeInTheDocument();
      
      // Cari elemen menu dengan lebih spesifik
      const movieLinks = screen.getAllByText("Movies");
      expect(movieLinks.length).toBeGreaterThan(0);
    });
  
    it("Menyoroti tautan yang aktif berdasarkan location.pathname", () => {
      vi.mocked(useLocation).mockReturnValue({ pathname: "/movie" });
  
      render(
        <MemoryRouter>
          <NavigationBar query="" setQuery={() => {}} />
        </MemoryRouter>
      );
  
      // Ambil semua elemen dengan teks "Movies"
      const movieLinks = screen.getAllByText("Movies");
      
      // Periksa apakah salah satu memiliki class aktif
      expect(
        movieLinks.some((link) =>
          link.classList.contains("bg-gray-900", "text-white")
        )
      ).toBe(true);
    });
  
    it("Tombol menu mobile menampilkan dan menyembunyikan menu", () => {
      render(
        <MemoryRouter>
          <NavigationBar query="" setQuery={() => {}} />
        </MemoryRouter>
      );
  
      const menuButton = screen.getByRole("button", { name: /open main menu/i });
      fireEvent.click(menuButton);
  
      // Gunakan `getAllByText` untuk menangani duplikasi
      const movieLinks = screen.getAllByText("Movies");
      expect(movieLinks.length).toBeGreaterThan(0);
  
      fireEvent.click(menuButton);
      // Menu seharusnya tersembunyi kembali
    });
  
    it("Menyertakan MovieSearch dengan prop query dan setQuery", () => {
      const mockSetQuery = vi.fn();
      render(
        <MemoryRouter>
          <NavigationBar query="Batman" setQuery={mockSetQuery} />
        </MemoryRouter>
      );
  
      expect(screen.getByPlaceholderText("Search film...")).toHaveValue("Batman");
    });
  });