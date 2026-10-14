import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingScreen from "./LoadingScreen";

describe("LoadingScreen", () => {
  it("is announced to assistive tech as a loading status", () => {
    render(<LoadingScreen />);
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-label", "Loading");
  });

  it("shows the NAN wordmark", () => {
    const { container } = render(<LoadingScreen />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("does not show placeholder text", () => {
    render(<LoadingScreen />);
    expect(screen.queryByText(/loading\.\.\./i)).not.toBeInTheDocument();
  });
});
