import axios from "axios";
import { Routes } from "../constants/Routes";
import { Pokemon, PokemonBody } from "../types/Pokemon";

export type FailedResponse = {
  success: boolean;
};

export const GetPokemons = async () => {
  const { data } = await axios.get<[Pokemon]>(Routes.GetAllPokemons);
  return data;
};

export const PostPokemons = async (pokemon: PokemonBody) => {
  const { data } = await axios.post<Pokemon | FailedResponse>(
    Routes.PostPokemon,
    pokemon,
  );
  return data;
};

export const DeletePokemon = async (pokemonId: number) => {
  const { data } = await axios.delete<FailedResponse>(
    `${Routes.DeletePokemon}${pokemonId}`,
  );
  return data;
};

export const UpdatePokemon = async (
  pokemon: PokemonBody,
  pokemonId: number,
) => {
  const { data } = await axios.put<Pokemon | FailedResponse>(
    `${Routes.UpdatePokemon}${pokemonId}`,
    pokemon,
  );
  return data;
};
