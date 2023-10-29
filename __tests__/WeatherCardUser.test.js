import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCardUser from "@/components/WeatherCardUser";

describe("WeatherCardUser Component", () => {
  it("renders with default values when data is not provided", () => {
    render(<WeatherCardUser />);
    // Add assertions for default values
    expect(screen.getByText("United states")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText("5℃")).toBeInTheDocument();
  });

  it("renders with provided data", () => {
    const data = {
      location: {
        country: "Canada",
        name: "Toronto",
      },
      current: {
        condition: {
          text: "Partly Cloudy",
        },
        temp_c: 20,
      },
    };

    render(<WeatherCardUser data={data} />);
    // Add assertions for the provided data
    expect(screen.getByText("Canada")).toBeInTheDocument();
    expect(screen.getByText("Toronto")).toBeInTheDocument();
    expect(screen.getByText("Partly Cloudy")).toBeInTheDocument();
    expect(screen.getByText("20℃")).toBeInTheDocument();
  });
});
