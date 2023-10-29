import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CityList from "@/components/CityList";

// Mock the useRouter hook
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock your API functions (getTopCitiesApi and getWeatherApi)
jest.mock("@/services/weatherService", () => ({
  getTopCitiesApi: jest.fn(() => Promise.resolve([])),
  getWeatherApi: jest.fn(() => Promise.resolve({})),
}));

describe("CityList Component", () => {
  it("should render loading message when userWeather is undefined", () => {
    const { container } = render(<CityList />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should render the component with userWeather data", () => {
    const userWeatherData = {
      location: { name: "Test City", tz_id: "TestTZ" },
      current: { temperature: 25 },
    };

    window.localStorage.setItem(
      "userLocation",
      JSON.stringify(userWeatherData)
    );

    const { container } = render(<CityList />);
    expect(screen.getByText("Get Updated data")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should trigger reload when "Get Updated data" is clicked', () => {
    const { container } = render(<CityList />);
    const reloadButton = screen.getByText("Get Updated data");
    fireEvent.click(reloadButton);
    expect(container).toMatchSnapshot();
  });
});
