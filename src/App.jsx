import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { addCopyRight } from '@sarawebs/sb-utils';

import Card from './components/Card/Card';
import Scoreboard from './components/Scoreboard/Scoreboard';
import GameBoard from './components/GameBoard/GameBoard';
import Header from './components/Header/Header';
let copyRightAdded = false;
function App() {
  useEffect(() => {
    if (copyRightAdded) return;
    copyRightAdded = true;
    addCopyRight({ title: 'SaraMem' });
  }, []);
  const [score, setScore] = useState({ current: 0, best: 0 });

  const updateRes = (current) => {
    let best = Math.max(current, score.best);
    setScore({ best, current });
  };
  return (
    <>
      <Header
        subtitle="Match all the cards without repeating!"
        left={
          <div className="header-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>card-account-details-outline</title>
              <path d="M22,3H2C0.91,3.04 0.04,3.91 0,5V19C0.04,20.09 0.91,20.96 2,21H22C23.09,20.96 23.96,20.09 24,19V5C23.96,3.91 23.09,3.04 22,3M22,19H2V5H22V19M14,17V15.75C14,14.09 10.66,13.25 9,13.25C7.34,13.25 4,14.09 4,15.75V17H14M9,7A2.5,2.5 0 0,0 6.5,9.5A2.5,2.5 0 0,0 9,12A2.5,2.5 0 0,0 11.5,9.5A2.5,2.5 0 0,0 9,7M14,7V8H20V7H14M14,9V10H20V9H14M14,11V12H18V11H14" />
            </svg>
            SaraMem
          </div>
        }
        right={<Scoreboard current={score.current} best={score.best} />}
      />
      <GameBoard onResChange={updateRes} />
    </>
  );
}

export default App;
