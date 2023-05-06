import "./styles.css";

const Card = ({ title, content, children }) => {
  return (
    <div
      className={!children ? "card-container" : "card-container-about"}
    >
      <div className="title-card">{title}</div>

      <div className="content-card">{!children ? content : children}</div>
    </div>
  );
};

export default Card;
