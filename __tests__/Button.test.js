/** @jest-environment jsdom */
import React from "react";
import "@testing-library/jest-dom";
import Button from "../components/Button";
import { fireEvent, render } from "@testing-library/react";

describe("Button Component", () => {
  it("renders the button with the provided label and classes", () => {
    const label = "Click me";
    const classes = "btn-primary";

    const { getByText, container } = render(
      <Button label={label} classes={classes} />
    );
    // Check if the button is rendered with the correct label and classes
    expect(getByText(label)).toBeInTheDocument();
    expect(container.querySelector(".c-button.btn-primary")).not.toBeNull();
  });

  it("calls the onClick function when the button is clicked", () => {
    const onClickMock = jest.fn();
    const label = "Click me";

    const { getByText } = render(
      <Button label={label} onClick={onClickMock} />
    );

    const button = getByText(label);

    // Simulate a click event on the button
    fireEvent.click(button);

    // Check if the onClick function was called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
