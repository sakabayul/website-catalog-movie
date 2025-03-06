import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../components/ComponentFooter";

describe("Footer Component", () => {
  it("Menampilkan judul MovieApp", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("MovieApp")).toBeInTheDocument();
  });

  it("Menampilkan tautan navigasi", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("TV Shows")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
  });

  it("Menyajikan informasi kontak", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("support@movieapp.com")).toBeInTheDocument();
    expect(screen.getByText("+62 812-3456-7890")).toBeInTheDocument();
  });

  it("Membuat bagian media sosial", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("Follow Us")).toBeInTheDocument();
    expect(screen.getByText("Website")).toBeInTheDocument();
  });

  it("Menampilkan teks hak cipta", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} MovieApp`, "i"))
    ).toBeInTheDocument();
  });
});
