import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

describe("Button Component", () => {
  it("Label dirender dengan benar", () => {
    render(<Button label="Click M" />);
    expect(screen.getByText("Click M")).toBeInTheDocument();
  });

  it("Memanggil onClick saat diklik", async () => {
    const handleClick = vi.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    await userEvent.click(screen.getByText("Click Me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
