import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "@/components/WeatherCard";

describe("WeatherCard Component", () => {
  const mockData = {
    location: {
      country: "Test Country",
      name: "Test City",
    },
    current: {
      condition: {
        text: "Test Condition",
      },
      temp_c: 25,
      condition: {
        icon: "http://test-icon-url.com/test-icon.png",
      },
    },
  };

  it('renders the loading section when "load" is true', () => {
    render(<WeatherCard data={mockData} load={true} />);

    // Check if the loading section is displayed
    const loadingSection = screen.getByTestId("loading-section");
    expect(loadingSection).toBeInTheDocument();
  });

  it('renders the weather card when "load" is false', () => {
    render(<WeatherCard data={mockData} load={false} />);

    // Check if the weather card elements are displayed
    const country = screen.getByText("Test Country");
    const city = screen.getByText("Test City");
    const condition = screen.getByText("Test Condition");
    const temperature = screen.getByText("25℃");

    expect(country).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(condition).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
  });

  it("calls the provided functions when clicked", () => {
    const onClick = jest.fn();
    const favClick = jest.fn();
    const deleteClick = jest.fn();

    render(
      <WeatherCard
        data={mockData}
        load={false}
        onClick={onClick}
        favClick={favClick}
        deleteClick={deleteClick}
      />
    );

    // Click the elements that trigger functions
    const cityElement = screen.getByText("Test City");
    const deleteButton = screen.getByTestId("delete-button");
    const favButton = screen.getByTestId("fav-button");

    fireEvent.click(cityElement);
    fireEvent.click(deleteButton);
    fireEvent.click(favButton);

    // Check if the functions are called
    expect(onClick).toHaveBeenCalled();
    expect(deleteClick).toHaveBeenCalled();
    expect(favClick).toHaveBeenCalled();
  });

  // You can add more test cases to cover other aspects of the component
});
