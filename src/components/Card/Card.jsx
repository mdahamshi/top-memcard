import './Card.css';

export default function Card({ name, image, onClick }) {
  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        onClick(name);
      }}
      className="card"
    >
      <img src={image} alt={name} />
      <p>{name}</p>
    </button>
  );
}
