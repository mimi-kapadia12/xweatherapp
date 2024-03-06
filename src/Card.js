import "./App.css";

function Card({ title, value }) {
  return (
    <div className="card text-center m-1 weather-card">
      <div className="card-body">
        <p>{title}</p>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default Card;
