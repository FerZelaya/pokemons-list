import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import "./PokemonList.css";
import { Pokemon } from "../../types/Pokemon";
import { DeletePokemon } from "../../services/PokemonServices";
import EditPokemon from "../EditPokemon/EditPokemon";

interface PokemonListPorps {
  pokemons: [Pokemon] | undefined;
  assignPokemon(): void;
  showNew: boolean;
  search: string;
}

const PokemonList: React.FC<PokemonListPorps> = ({
  pokemons,
  assignPokemon,
  showNew,
  search,
}) => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editPoekmon, setEditPokemon] = useState<Pokemon | undefined>();

  const deletePokemon = async (id: number) => {
    const response = await DeletePokemon(id);
    if (response.success) {
      assignPokemon();
    } else {
      alert("Error deleting Pokemon!");
    }
  };

  const showEditPokemonInputs = (value: boolean, pokemon?: Pokemon) => {
    setShowEdit(value);
    setEditPokemon(pokemon);
  };

  useEffect(() => {
    if (showNew) {
      setShowEdit(false);
    }
  }, [showNew]);

  return (
    <div className="list-container" data-testid="list-container">
      <table data-testid="pokemon-table">
        <thead data-testid="pokemon-header">
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Ataque</th>
            <th>Defensa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody data-testid="pokemon-body">
          {pokemons &&
            pokemons
              .filter((pokemon) =>
                pokemon.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((pokemon) => {
                return (
                  <tr key={pokemon.id} data-testid="pokemon-row">
                    <td>{pokemon.name}</td>
                    <td>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={pokemon.image}
                        className="image-box"
                      >
                        <FontAwesomeIcon icon={faImage} />
                      </a>
                    </td>
                    <td>{pokemon.attack}</td>
                    <td>{pokemon.defense}</td>
                    <td>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faPenToSquare}
                        onClick={() => showEditPokemonInputs(true, pokemon)}
                      />
                      <FontAwesomeIcon
                        className="icon"
                        icon={faTrash}
                        onClick={() => deletePokemon(pokemon.id)}
                      />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      {showEdit && !showNew && (
        <EditPokemon
          pokemon={editPoekmon}
          showEditPokemonInputs={showEditPokemonInputs}
          assignPokemon={assignPokemon}
        />
      )}
    </div>
  );
};

export default PokemonList;
