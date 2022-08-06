import { faSave, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NewPokemon.css";
import React, { useState, useRef, useEffect } from "react";
import { Pokemon, PokemonBody } from "../../types/Pokemon";
import { FailedResponse, PostPokemons } from "../../services/PokemonServices";

interface NewPokemonProps {
  showNewPokemonInputs(value: boolean): void;
}

const NewPokemon: React.FC<NewPokemonProps> = ({ showNewPokemonInputs }) => {
  const [pokemonBody, setPokemonBody] = useState<PokemonBody>({
    name: "",
    image: "",
    attack: 0,
    defense: 0,
    hp: 100,
    type: "Base",
    idAuthor: 10,
  });
  const sliderEl = useRef<HTMLInputElement>(null);
  const sliderEl2 = useRef<HTMLInputElement>(null);

  //Slider effect
  const sliders1ColorsChange = () => {
    if (sliderEl && sliderEl.current) {
      sliderEl.current.addEventListener("mousemove", function () {
        var x = sliderEl.current?.value;
        var color =
          "linear-gradient(90deg, rgba(102, 88, 246, 1)" +
          x +
          "%, rgba(215, 220, 223, 1)" +
          x +
          "%)";
        if (sliderEl && sliderEl.current)
          sliderEl.current.style.background = color;
      });

      return () => {
        if (sliderEl && sliderEl.current)
          sliderEl.current.removeEventListener("mousemove", function () {});
      };
    }
  };
  const sliders2ColorsChange = () => {
    if (sliderEl2 && sliderEl2.current) {
      sliderEl2.current.addEventListener("mousemove", function () {
        var x = sliderEl2.current?.value;
        var color =
          "linear-gradient(90deg, rgba(102, 88, 246, 1)" +
          x +
          "%, rgba(215, 220, 223, 1)" +
          x +
          "%)";
        if (sliderEl2 && sliderEl2.current)
          sliderEl2.current.style.background = color;
      });

      return () => {
        if (sliderEl2 && sliderEl2.current)
          sliderEl2.current.removeEventListener("mousemove", function () {});
      };
    }
  };
  //

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPokemonBody({ ...pokemonBody, [name]: value });
  };

  const uploadPokemon = async () => {
    if (
      pokemonBody.name === "" ||
      pokemonBody.image === "" ||
      pokemonBody.attack === 0 ||
      pokemonBody.defense === 0
    ) {
      alert("Empty Filed! Please fill the form");
      return;
    } else {
      const pokemons: Pokemon | FailedResponse = await PostPokemons(
        pokemonBody,
      );
      if (pokemons) {
        showNewPokemonInputs(false);
      }
    }
  };

  useEffect(() => {
    sliders1ColorsChange();
    sliders2ColorsChange();
  });

  return (
    <div className="newP-container">
      <div className="header">
        <h4>Nuevo Pokemon</h4>
      </div>
      <div className="inputs-container">
        <div className="inputs">
          <div>
            <h4>Nombre: </h4>
            <input
              onChange={(event) => handleChange(event)}
              name="name"
              type="text"
              className="search-input-new"
              placeholder="Nombre"
            />
          </div>
          <div>
            <h4>Imagen: </h4>
            <input
              onChange={(event) => handleChange(event)}
              name="image"
              type="text"
              className="search-input-new"
              placeholder="URL"
            />
          </div>
        </div>
        <div className="inputs">
          <div>
            <h4>Ataque: </h4>
            <h4>0</h4>
            <input
              onChange={(event) => handleChange(event)}
              name="attack"
              ref={sliderEl}
              id="slider"
              type="range"
              min="1"
              max="100"
              className="slider"
              defaultValue={0}
            />
            <h4>100</h4>
          </div>
          <div>
            <h4>Defensa: </h4>
            <h4>0</h4>
            <input
              onChange={(event) => handleChange(event)}
              name="defense"
              ref={sliderEl2}
              id="slider"
              type="range"
              min="1"
              max="100"
              className="slider"
              defaultValue={0}
            />
            <h4>100</h4>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <button type="button" onClick={() => uploadPokemon()}>
          <FontAwesomeIcon className="icon" icon={faSave} />
          <h4>Guardar</h4>
        </button>
        <button type="button" onClick={() => showNewPokemonInputs(false)}>
          <FontAwesomeIcon className="icon" icon={faX} />
          <h4>Cancelar</h4>
        </button>
      </div>
    </div>
  );
};

export default NewPokemon;
