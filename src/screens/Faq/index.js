import "./styles.css";
import Card from "../../components/Card/index";

const Faq = () => {
  const info = [
    {
      title: "titulo de teste",
      content: "counteudo de teste",
    },
    {
      title: "titulo de teste",
      content: "counteudo de teste",
    },
    {
      title: "titulo de teste",
      content: "counteudo de teste",
    }, {
      title: "titulo de teste",
      content: "counteudo de teste",
    },
    {
      title: "titulo de teste",
      content: "counteudo de teste",
    },
    {
      title: "titulo de teste",
      content: "counteudo de teste",
    },
  ];

  return (
    <div className="container-faq">
      <h1 className="faq-title">Perguntas frequentes (FAQ)</h1>
      <div className="card-box">
        {info.map(({ title, content }) => {
          return <Card content={content} title={title} />;
        })}
      </div>
    </div>
  );
};

export default Faq;
