import './Card.css';

export default function Card({ name, image, onClick }) {
  return (
    <button onClick={() => onClick(name)} className="card">
      <img src={image} alt={name} />
      <p>{name}</p>
    </button>
  );
}
