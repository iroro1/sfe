import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component", () => {
  it("renders the button with label and classes", () => {
    const label = "Click me";
    const classes = "custom-class";

    render(<Button label={label} classes={classes} />);

    // Check if the button element with the label and custom class is present
    const button = screen.getByText(label);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("c-button");
    expect(button).toHaveClass(classes);
  });

  it("calls the onClick function when clicked", () => {
    const label = "Click me";
    const onClick = jest.fn(); // Mock the onClick function

    render(<Button label={label} onClick={onClick} />);

    const button = screen.getByText(label);
    fireEvent.click(button);

    // Check if the onClick function was called
    expect(onClick).toHaveBeenCalled();
  });
});
