import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./Header.css";

interface HeaderProps {
  showNew: boolean;
  showNewPokemonInputs(value: boolean): void;
  handleSearch(event: React.ChangeEvent<HTMLInputElement>): void;
}

const Header: React.FC<HeaderProps> = ({
  showNew,
  handleSearch,
  showNewPokemonInputs,
}) => {
  const showInputs = () => {
    showNewPokemonInputs(!showNew);
  };
  return (
    <div className="header-container" data-testid="header-container">
      <div className="search-container">
        <h4>Listado de Pokemon</h4>
        <div className="search-box" data-testid="search-box">
          <FontAwesomeIcon className="magnifying" icon={faMagnifyingGlass} />
          <input
            data-testid="search-input"
            onChange={(e) => handleSearch(e)}
            type="text"
            className="search-input"
            placeholder="Buscar"
          />
        </div>
      </div>
      <div className="new-container">
        <button type="button" onClick={showInputs} data-testid="new-button">
          <FontAwesomeIcon className="plus" icon={faPlus} />
          <h4>Nuevo</h4>
        </button>
      </div>
    </div>
  );
};

export default Header;
