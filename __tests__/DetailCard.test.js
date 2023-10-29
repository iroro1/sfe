/** @jest-environment jsdom */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DetailCard from "../components/DetailCard";

describe("DetailCard Component", () => {
  it("renders with default values", () => {
    render(<DetailCard />);

    expect(screen.getByText("12%")).toBeInTheDocument(); // Default title
    expect(screen.getByText("1%")).toBeInTheDocument(); // Default sub
  });

  it("renders with custom values", () => {
    render(<DetailCard title="Custom Title" sub="Custom Sub" />);
    // Use screen queries to find elements and assert their content
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Sub")).toBeInTheDocument();
  });

  it("renders with an icon", () => {
    const icon = <svg data-testid="custom-icon">Your Icon</svg>;
    render(<DetailCard Icon={icon} />);

    // Use data-testid attribute to find the custom icon
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
