import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import MovieSearch from "../../components/ComponentMovieSearch"

// Mock useNavigate
const mockNavigate = vi.fn();

// Mock React Router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("MovieSearch Component", () => {
  it("Render dengan benar", () => {
    render(
      <MemoryRouter>
        <MovieSearch query="" setQuery={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Search film...")).toBeInTheDocument();
  });

  it("Input menerima nilai dari query", () => {
    render(
      <MemoryRouter>
        <MovieSearch query="Avengers" setQuery={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText("Search film...")).toHaveValue("Avengers");
  });

  it("Mengubah nilai input memanggil setQuery", () => {
    const mockSetQuery = vi.fn();
    render(
      <MemoryRouter>
        <MovieSearch query="" setQuery={mockSetQuery} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search film...");
    fireEvent.change(input, { target: { value: "Batman" } });

    expect(mockSetQuery).toHaveBeenCalledWith("Batman");
  });

  it("Menekan tombol Enter saat di halaman bukan '/' akan memanggil navigate('/')", () => {
    render(
      <MemoryRouter initialEntries={["/movies"]}>
        <MovieSearch query="" setQuery={() => {}} />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText("Search film...");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("Menekan tombol search menampilkan input di mode mobile", () => {
    render(
      <MemoryRouter>
        <MovieSearch query="" setQuery={() => {}} />
      </MemoryRouter>
    );

    const searchButton = screen.getAllByRole("button")[0]; // Ambil tombol pertama (button search)
    fireEvent.click(searchButton);

    // Periksa apakah input menjadi terlihat
    expect(screen.getByPlaceholderText("Search film...")).toBeVisible();
  });
});
