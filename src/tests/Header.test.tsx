/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import { ChangeEvent } from "react";
import Header from "../components/Header/Header";

describe("<Header />", () => {
  beforeEach(() =>
    render(
      <Header
        showNew={false}
        showNewPokemonInputs={function (value: boolean): void {
          throw new Error("Function not implemented.");
        }}
        handleSearch={function (event: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
      />,
    ),
  );

  it("Should render Header main container", () => {
    expect(screen.getByTestId("header-container")).toBeInTheDocument();
  });

  it("Should render search box container", () => {
    expect(screen.getByTestId("search-box")).toBeInTheDocument();
  });

  it("Should render search input", () => {
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  it("Should render add new pokemon button", () => {
    expect(screen.getByTestId("new-button")).toBeInTheDocument();
  });
});
