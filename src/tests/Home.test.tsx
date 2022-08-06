/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import Home from "../components/Home/Home";

describe("<Home />", () => {
  beforeEach(() => render(<Home />));

  it("Should render Home main container", () => {
    expect(screen.getByTestId("home-container")).toBeInTheDocument();
  });
});
