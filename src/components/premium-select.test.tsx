import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PremiumSelect } from "./premium-select";

afterEach(cleanup);

const options = [
  { value: "all", label: "Todos los modelos" },
  { value: "terra-s5", label: "Terra S5" },
  { value: "alto-x7", label: "Alto X7" },
];

describe("PremiumSelect", () => {
  it("opens its custom list and selects an option", () => {
    const onChange = vi.fn();
    render(<PremiumSelect ariaLabel="Modelo" value="all" options={options} onChange={onChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Modelo" }));
    expect(screen.getByRole("listbox", { name: "Modelo" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("option", { name: "Terra S5" }));
    expect(onChange).toHaveBeenCalledWith("terra-s5");
    expect(screen.queryByRole("listbox", { name: "Modelo" })).not.toBeInTheDocument();
  });

  it("supports arrow navigation and keyboard selection", () => {
    const onChange = vi.fn();
    render(<PremiumSelect ariaLabel="Modelo" value="all" options={options} onChange={onChange} />);
    const trigger = screen.getByRole("button", { name: "Modelo" });

    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    fireEvent.keyDown(trigger, { key: "Enter" });

    expect(onChange).toHaveBeenCalledWith("terra-s5");
  });
});
