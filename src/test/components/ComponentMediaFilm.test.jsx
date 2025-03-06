import { render, screen } from "@testing-library/react";
import MediaFilm from "../../components/ComponentMediaFilm";
import useSearchQuery from "../../services/useSearchQuery";
import { describe, it, expect, vi } from "vitest";

vi.mock("../../services/useSearchQuery", () => ({
  default: vi.fn(),
}));

const mockMovie = {
  id: 123,
  first_air_date: "",
};

describe("MediaFilm Component", () => {
  it("Menampilkan pesan error jika terjadi kesalahan", () => {
    useSearchQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<MediaFilm id={mockMovie.id} movie={mockMovie} />);

    expect(screen.getByText("Terjadi kesalahan!")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    useSearchQuery.mockReturnValue({
      isLoading: false,
      isError: false,
      data: {},
    });
    render(<MediaFilm id={mockMovie.id} movie={mockMovie} />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("displays loading state", () => {
    useSearchQuery.mockReturnValue({ isLoading: true, isError: false });
    render(<MediaFilm id={mockMovie.id} movie={mockMovie} />);
    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("displays error state", () => {
    useSearchQuery.mockReturnValue({ isLoading: false, isError: true });
    render(<MediaFilm id={mockMovie.id} movie={mockMovie} />);
    expect(screen.getByText("Terjadi kesalahan!")).toBeInTheDocument();
  });
});
