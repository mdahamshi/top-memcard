import './GameBoard.css';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { useState } from 'react';
import { shuffleArray } from '../../utils/shuffle.js';

import { usePokemonData } from '../../hooks/usePokemonData';

export default function GameBoard({ onResChange }) {
  const { pokemonList, loading } = usePokemonData(22);
  const [clickedCards, setClickedCards] = useState([]);
  const [open, setOpen] = useState(false);

  const currentScore = clickedCards.length;

  const roundList = shuffleArray(pokemonList).slice(0, 4);

  const handleClickedCard = (name) => {
    if (clickedCards.includes(name)) {
      onResChange(0);
      setClickedCards([]);
      setOpen(true);
      return;
    }
    setClickedCards([name, ...clickedCards]);
    onResChange(currentScore + 1);
  };

  if (loading)
    return (
      <div className="gameboard">
        <p>Loading Pokémon...</p>
      </div>
    );

  return (
    <div className="gameboard">
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={
          <span class="modal-title-content">
            Oh Noo !
            <svg
              width={32}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <title>emoticon-sad</title>
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,9.5C7,8.7 7.7,8 8.5,8C9.3,8 10,8.7 10,9.5C10,10.3 9.3,11 8.5,11C7.7,11 7,10.3 7,9.5M14.77,17.23C14.32,16.5 13.25,16 12,16C10.75,16 9.68,16.5 9.23,17.23L7.81,15.81C8.71,14.72 10.25,14 12,14C13.75,14 15.29,14.72 16.19,15.81L14.77,17.23M15.5,11C14.7,11 14,10.3 14,9.5C14,8.7 14.7,8 15.5,8C16.3,8 17,8.7 17,9.5C17,10.3 16.3,11 15.5,11Z" />
            </svg>
          </span>
        }
      >
        <p>Unfortunately, you clicked this already :(</p>
      </Modal>
      {roundList.map((poke) => (
        <Card
          key={poke.name}
          name={poke.name}
          image={poke.image}
          onClick={handleClickedCard}
        />
      ))}
    </div>
  );
}
