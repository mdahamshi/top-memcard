import './Card.css';

export default function Card({ name, image, onClick }) {
  return (
    <button
      onClick={(e) => {
        onClick(name);
        e.currentTarget.blur();
      }}
      className="card"
    >
      <img src={image} alt={name} />
      <p>{name}</p>
    </button>
  );
}
