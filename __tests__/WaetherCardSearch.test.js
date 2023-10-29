/** @jest-environment jsdom */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCardSearch from "../components/WeatherCardSearch";

describe("WeatherCardSearch", () => {
  const sampleData = {
    location: {
      country: "Sample Country",
      name: "Sample City",
    },
    current: {
      condition: {
        text: "Sample Condition",
        icon: "sample-icon-url",
      },
      temp_c: "25",
    },
  };

  it("renders the component with provided data", () => {
    render(<WeatherCardSearch data={sampleData} />);

    // Test that the component renders with the correct data
    expect(screen.getByText("Sample Country")).toBeInTheDocument();
    expect(screen.getByText("Sample City")).toBeInTheDocument();
    expect(screen.getByText("Sample Condition")).toBeInTheDocument();
    expect(screen.getByText("25℃")).toBeInTheDocument();
  });
});
