import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardMovie2 from "../../components/ComponentCardMovie2";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CardMovie2 Component", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Movie Test",
      poster_path: "/test-image.jpg",
      release_date: "2025-01-01",
    },
  ];

  it("Menampilkan daftar film jika movies tersedia", () => {
    render(<CardMovie2 movies={mockMovies} />);

    expect(screen.getByText("Movie Test")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
  });

  it("Menampilkan loading state jika isLoading = true", () => {
    render(<CardMovie2 isLoading={true} />);

    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("Menampilkan pesan error jika isError = true", () => {
    render(<CardMovie2 isError={true} />);

    expect(screen.getByText("Terjadi kesalahan!")).toBeInTheDocument();
  });

  it("Navigasi ke halaman detail saat film diklik", () => {
    render(<CardMovie2 movies={mockMovies} />);

    fireEvent.click(screen.getByText("Movie Test"));

    expect(mockNavigate).toHaveBeenCalledWith("/about/1", {
      state: { movie: mockMovies[0] },
    });
  });

  it("Menampilkan pesan 'Tidak ada hasil' jika query cukup panjang dan movies kosong", () => {
    render(<CardMovie2 movies={[]} query="Test Movie" />);

    expect(screen.getByText("Tidak ada hasil")).toBeInTheDocument();
  });
});