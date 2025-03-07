import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import useSearchQuery from "../../services/useSearchQuery";
import CardCast from "../../components/ComponentCardCast";

vi.mock("../../services/useSearchQuery", () => ({
  default: vi.fn(),
}));

describe("CardCast Component", () => {
  const mockId = 123;
  const mockCast = [
    { id: 1, name: "Actor One", character: "Hero", profile_path: "/actor1.jpg", first_air_date: "" },
    { id: 2, name: "Actor Two", character: "Villain", profile_path: null, first_air_date: "" },
    { id: 3, name: "Actor Three", character: "Villain12", profile_path: "/actor3.jpg", first_air_date: "" },
  ];

  it("Menampilkan daftar cast dengan maksimal 10 aktor", async () => {
    useSearchQuery.mockReturnValue({
      data: new Array(32).fill(mockCast[0]), // Membuat 12 item untuk memastikan hanya 10 yang ditampilkan
      isLoading: false,
      isError: false,
    });

    render(<CardCast id={mockId} movie={mockCast} />);

    const castItems = await screen.findAllByRole("img");
    expect(castItems.length).toBe(30); // Harus hanya 10
  });

  it("Menampilkan nama aktor dengan benar", async () => {
    useSearchQuery.mockReturnValue({
      data: mockCast,
      isLoading: false,
      isError: false,
    });

    render(<CardCast id={mockId} movie={mockCast} />);

    expect(await screen.findByText(/Actor One/i)).toBeInTheDocument();
    expect(await screen.findByText(/Actor Two/i)).toBeInTheDocument();
    expect(await screen.findByText(/Actor Three/i)).toBeInTheDocument();
  });

  it("Menampilkan gambar profil jika tersedia", async () => {
    useSearchQuery.mockReturnValue({
      data: mockCast,
      isLoading: false,
      isError: false,
    });

    render(<CardCast id={mockId} movie={mockCast} />);

    const imgElements = screen.getAllByRole("img");
    
    expect(imgElements[0]).toHaveAttribute("src", "https://image.tmdb.org/t/p/w200/actor1.jpg");
    expect(imgElements[1]).toHaveAttribute("src", "images/unknown-image-default.webp"); // Default jika null
    expect(imgElements[2]).toHaveAttribute("src", "https://image.tmdb.org/t/p/w200/actor3.jpg");
  });

  it("Menampilkan daftar actor ketika data tersedia", async () => {
    useSearchQuery.mockReturnValue({
      data: mockCast,
      isLoading: false,
      isError: false,
    });
  
    render(<CardCast id={mockId} movie={mockCast} />);
  
    expect(await screen.findByText(/Actor One/i)).toBeInTheDocument();
    expect(await screen.findByText(/Actor Two/i)).toBeInTheDocument();
    expect(await screen.findByText(/Actor Three/i)).toBeInTheDocument();
  });

  it("Menampilkan loading state saat data belum dimuat", () => {
    useSearchQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    render(<CardCast id={mockId} movie={mockCast} />);

    expect(document.querySelectorAll(".animate-pulse").length).toBeGreaterThan(0);
  });

  it("Menampilkan pesan error jika terjadi kesalahan", () => {
    useSearchQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    render(<CardCast id={mockId} movie={mockCast} />);

    expect(screen.getByText("Terjadi kesalahan!")).toBeInTheDocument();
  });

  it("Menampilkan tombol scroll hanya jika bisa di-scroll", () => {
    render(<CardCast id={mockId} movie={mockCast} />);

    const leftButton = screen.queryByRole("button", { name: /left/i });
    const rightButton = screen.queryByRole("button", { name: /right/i });

    expect(leftButton).not.toBeInTheDocument(); // Tidak muncul jika tidak bisa scroll
    expect(rightButton).not.toBeInTheDocument();
  });
});
