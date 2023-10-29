import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // You may need to use MemoryRouter to simulate routing in Next.js
import CityList from "@/components/CityList";

describe("CityList Component", () => {
  it("renders the component with loading message", () => {
    render(<CityList />, { wrapper: MemoryRouter });

    // Check if the loading message is displayed
    const loadingMessage = screen.getByText("Loading");
    expect(loadingMessage).toBeInTheDocument();
  });

  it('calls loadLocation when "Get Updated data" is clicked', () => {
    const loadLocation = jest.fn();
    render(<CityList />, { wrapper: MemoryRouter });

    // Click the "Get Updated data" button
    const reloadButton = screen.getByText("Get Updated data");
    fireEvent.click(reloadButton);

    // Check if loadLocation function is called
    expect(loadLocation).toHaveBeenCalled();
  });

  // You can add more test cases for other interactions and functionalities of the component
});
