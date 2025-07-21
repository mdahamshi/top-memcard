import './Scoreboard.css';

export default function Scoreboard({ best, current }) {
  return (
    <div className="scoreboard">
      <div>Best score: {best}</div>
      <div>Score: {current}</div>
    </div>
  );
}
