// WeatherCard.test.js

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "@/components/WeatherCard";

describe("WeatherCard", () => {
  const mockData = {
    location: {
      country: "United States",
      name: "California",
    },
    current: {
      condition: {
        text: "Clear",
        icon: "http://example.com/icon.png",
      },
      temp_c: "25",
    },
    isFav: false,
  };

  const mockOnClick = jest.fn();
  const mockFavClick = jest.fn();
  const mockDeleteClick = jest.fn();

  it("renders WeatherCard component correctly", () => {
    render(
      <WeatherCard
        data={mockData}
        onClick={mockOnClick}
        favClick={mockFavClick}
        deleteClick={mockDeleteClick}
        load={false}
      />
    );

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("California")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByAltText("Weather Icon")).toBeInTheDocument();
    expect(screen.getByText("25℃")).toBeInTheDocument();
  });

  it("calls the onClick function when the component is clicked", () => {
    render(
      <WeatherCard
        data={mockData}
        onClick={mockOnClick}
        favClick={mockFavClick}
        deleteClick={mockDeleteClick}
        load={false}
      />
    );

    fireEvent.click(screen.getByText("United States")); // Click on any element within the WeatherCard to trigger onClick
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("calls the favClick function when the Heart icon is clicked", () => {
    render(
      <WeatherCard
        data={mockData}
        onClick={mockOnClick}
        favClick={mockFavClick}
        deleteClick={mockDeleteClick}
        load={false}
      />
    );

    fireEvent.click(screen.getByText("Heart"));
    expect(mockFavClick).toHaveBeenCalled();
  });

  it("calls the deleteClick function when the CloseCircle icon is clicked", () => {
    render(
      <WeatherCard
        data={mockData}
        onClick={mockOnClick}
        favClick={mockFavClick}
        deleteClick={mockDeleteClick}
        load={false}
      />
    );

    fireEvent.click(screen.getByText("CloseCircle"));
    expect(mockDeleteClick).toHaveBeenCalled();
  });
});
