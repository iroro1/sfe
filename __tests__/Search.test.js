import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Search from "@/components/Search";

// Mock dependencies and functions
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
jest.mock("@/services/weatherService", () => ({
  getWeatherApi: jest.fn(),
  searchCity: jest.fn(),
}));

describe("Search Component", () => {
  it("renders without errors", () => {
    render(<Search />);
    // Add assertions to check if the component renders as expected
    expect(screen.getByText("Search term")).toBeInTheDocument();
  });

  it("displays search results when the search button is clicked", async () => {
    searchCity.mockResolvedValue({
      status: 200,
      data: [
        { lat: 35.682839, lon: 139.759455 },
        // Add more data as needed
      ],
    });

    getWeatherApi.mockResolvedValue({
      data: {
        location: { name: "Tokyo" },
        // Add more data as needed
      },
    });

    render(<Search />);

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Wait for the results to be displayed
    await waitFor(() => {
      expect(screen.getByText("Tokyo")).toBeInTheDocument();
    });
  });

  it("clears search results when the close button is clicked", async () => {
    searchCity.mockResolvedValue({
      status: 200,
      data: [
        { lat: 35.682839, lon: 139.759455 },
        // Add more data as needed
      ],
    });

    getWeatherApi.mockResolvedValue({
      data: {
        location: { name: "Tokyo" },
        // Add more data as needed
      },
    });

    render(<Search />);

    const searchButton = screen.getByTestId("search-button");
    fireEvent.click(searchButton);

    // Wait for the results to be displayed
    await waitFor(() => {
      expect(screen.getByText("Tokyo")).toBeInTheDocument();
    });

    // Click the close button
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    // Check that the results are cleared
    expect(screen.queryByText("Tokyo")).toBeNull();
  });
});
