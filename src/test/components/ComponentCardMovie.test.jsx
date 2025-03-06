import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CardMovie from "../../components/ComponentCardMovie";

const mockNavigate = vi.fn();

// Mock useNavigate dari react-router-dom
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("CardMovie Component", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Movie One",
      poster_path: "/movie1.jpg",
      vote_average: 8.5,
      release_date: "2024-02-15",
    },
    {
      id: 2,
      title: "Movie Two",
      poster_path: "/movie2.jpg",
      vote_average: 7.8,
      release_date: "2023-09-20",
    },
  ];

  it("Menampilkan loading state jika isLoading = true", () => {
    render(<CardMovie isLoading={true} />);

    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("Menampilkan pesan error jika isError = true", () => {
    render(<CardMovie isError={true} />);

    expect(screen.getByText("Terjadi kesalahan!")).toBeInTheDocument();
  });

  it("Menampilkan daftar film jika movies tersedia", () => {
    render(<CardMovie movies={mockMovies} />);

    expect(screen.getByText("Movie One")).toBeInTheDocument();
    expect(screen.getByText("Movie Two")).toBeInTheDocument();
  });

  it("Menampilkan tombol scroll hanya jika bisa di-scroll", () => {
    render(<CardMovie movies={mockMovies} />);

    const leftButton = screen.queryByRole("button", { name: /left/i });
    const rightButton = screen.queryByRole("button", { name: /right/i });

    expect(leftButton).not.toBeInTheDocument(); // Tidak muncul jika tidak bisa scroll
    expect(rightButton).not.toBeInTheDocument();
  });

  it("Navigasi ke halaman detail saat film diklik", () => {
    render(<CardMovie movies={mockMovies} />);

    fireEvent.click(screen.getByText("Movie One"));

    expect(mockNavigate).toHaveBeenCalledWith("/about/1", {
      state: { movie: mockMovies[0] },
    });
  });
});
