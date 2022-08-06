/* eslint-disable testing-library/no-render-in-setup */
import { render, screen } from "@testing-library/react";
import PokemonList from "../components/PokemonList/PokemonList";
import { initialPokemons } from "../constants/initialValues";
import { Pokemon } from "../types/Pokemon";

describe("<PokemonList />", () => {
  beforeEach(() =>
    render(
      <PokemonList
        pokemons={initialPokemons as [Pokemon]}
        assignPokemon={function (): void {
          throw new Error("Function not implemented.");
        }}
        showNew={false}
        search={""}
      />,
    ),
  );

  it("Should render Pokemon List main container", () => {
    expect(screen.getByTestId("list-container")).toBeInTheDocument();
  });

  it("Should render Pokemon List table", () => {
    expect(screen.getByTestId("pokemon-table")).toBeInTheDocument();
  });

  it("Should render Pokemon List table header", () => {
    expect(screen.getByTestId("pokemon-header")).toBeInTheDocument();
  });

  it("Should render Pokemon List table body", () => {
    expect(screen.getByTestId("pokemon-body")).toBeInTheDocument();
  });

  it("Should render Pokemon List pokemon row", () => {
    expect(screen.getByTestId("pokemon-row")).toBeInTheDocument();
  });
});
