import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import PokemonList from "../PokemonList/PokemonList";
import NewPokemon from "../NewPokemon/NewPokemon";
import { GetPokemons } from "../../services/PokemonServices";
import { Pokemon } from "../../types/Pokemon";

const Home: React.FC = () => {
  const [showNew, setShowNew] = useState<boolean>(false);
  const [allPokemonsList, setAllPokemonsList] = useState<[Pokemon]>();
  const [search, setSearch] = useState<string>("");

  const showNewPokemonInputs = (value: boolean) => {
    setShowNew(value);
  };

  const assingPokemon = async () => {
    const pokemons: [Pokemon] = await GetPokemons();
    setAllPokemonsList(pokemons);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    assingPokemon();
  }, [showNew]);

  return (
    <div className="container" data-testid="home-container">
      <Header
        handleSearch={handleSearch}
        showNew={showNew}
        showNewPokemonInputs={showNewPokemonInputs}
      />
      <PokemonList
        pokemons={allPokemonsList}
        assignPokemon={assingPokemon}
        showNew={showNew}
        search={search}
      />
      {showNew && <NewPokemon showNewPokemonInputs={showNewPokemonInputs} />}
    </div>
  );
};

export default Home;
