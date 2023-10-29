import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "@/components/Search";

describe("Search Component", () => {
  it("renders the component with search input and button hidden by default", () => {
    render(<Search />);

    // Check if the search input and button are hidden by default
    const searchInput = screen.queryByPlaceholderText("Search term");
    const searchButton = screen.queryByTestId("search-button");

    expect(searchInput).not.toBeInTheDocument();
    expect(searchButton).not.toBeInTheDocument();
  });

  it('displays the search input and button when "SearchFavorite" icon is clicked', () => {
    render(<Search />);

    // Click the "SearchFavorite" icon
    const searchFavoriteIcon = screen.getByTestId("search-favorite-icon");
    fireEvent.click(searchFavoriteIcon);

    // Check if the search input and button are displayed
    const searchInput = screen.getByPlaceholderText("Search term");
    const searchButton = screen.getByTestId("search-button");

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it("calls searchFn when the Enter key is pressed in the search input", () => {
    render(<Search />);

    // Click the "SearchFavorite" icon to show the search input
    const searchFavoriteIcon = screen.getByTestId("search-favorite-icon");
    fireEvent.click(searchFavoriteIcon);

    // Get the search input element
    const searchInput = screen.getByPlaceholderText("Search term");

    // Mock the searchFn function
    const searchFn = jest.fn();

    // Attach the mock function to the component
    const { getByPlaceholderText } = render(<Search searchFn={searchFn} />);

    // Simulate pressing the Enter key in the search input
    fireEvent.keyDown(getByPlaceholderText("Search term"), {
      key: "Enter",
      code: 13,
      charCode: 13,
    });

    // Check if searchFn is called
    expect(searchFn).toHaveBeenCalled();
  });

  // You can add more test cases for other interactions and functionalities of the component
});
