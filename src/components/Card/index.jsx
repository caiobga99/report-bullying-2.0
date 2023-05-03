import "./styles.css";

const Card = ({ title, content }) => {
  return (
    <div className="card-container">
      <div className="title-card">{title}</div>
      <div className="content-card">{content}</div>
    </div>
  );
};

export default Card;
