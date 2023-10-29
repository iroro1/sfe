import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCardSearch from "@/components/WeatherCardSearch";

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

  it("handles the delete button click", () => {
    const deleteClickMock = jest.fn();
    render(
      <WeatherCardSearch data={sampleData} deleteClick={deleteClickMock} />
    );

    // Click the delete button
    const deleteButton = screen.getByTestId("delete-button"); // Add data-testid to your delete button in the component
    fireEvent.click(deleteButton);

    // Test that the deleteClick function was called
    expect(deleteClickMock).toHaveBeenCalled();
  });

  it("handles the click event", () => {
    const onClickMock = jest.fn();
    render(<WeatherCardSearch data={sampleData} onClick={onClickMock} />);

    // Click the component
    const component = screen.getByTestId("weather-card"); // Add data-testid to your component in the component
    fireEvent.click(component);

    // Test that the onClick function was called
    expect(onClickMock).toHaveBeenCalled();
  });

  it("renders loading state when load is true", () => {
    render(<WeatherCardSearch data={sampleData} load={true} />);

    // Test that the loading state is displayed
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});
