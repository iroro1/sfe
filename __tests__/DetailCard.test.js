import React from "react";
import { render, screen } from "@testing-library/react";
import DetailCard from "@/components/DetailCard";

describe("DetailCard Component", () => {
  it("renders the component with default props", () => {
    render(<DetailCard />);

    // Check if the default title and sub props are displayed
    const defaultTitle = screen.getByText("12%");
    const defaultSub = screen.getByText("1%");

    expect(defaultTitle).toBeInTheDocument();
    expect(defaultSub).toBeInTheDocument();
  });

  it("renders the component with provided title and sub", () => {
    const customTitle = "Custom Title";
    const customSub = "Custom Subtitle";

    render(<DetailCard title={customTitle} sub={customSub} />);

    // Check if the custom title and sub props are displayed
    const customTitleElement = screen.getByText(customTitle);
    const customSubElement = screen.getByText(customSub);

    expect(customTitleElement).toBeInTheDocument();
    expect(customSubElement).toBeInTheDocument();
  });

  // You can add more test cases for other aspects of the component
});
