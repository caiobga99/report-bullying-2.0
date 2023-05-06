import "./styles.css";
import Card from "../../components/Card/index";
import setaDireita from "../../assets/images/seta-direita-submit.svg";

const SobreNos = () => {
  return (
    <div className="container-about">
      <Card title="Um pouco sobre nós">
        <p>texto sobre o site</p>
        <p>texto sobre o site</p>
        <p>texto sobre o site</p>
        <p>texto sobre o site</p>
        <p>texto sobre o site</p>
        <p>texto sobre o site</p>
        <p>texto sobre o site</p>
      </Card>
        <img
          src={setaDireita}
          alt="seta indicando abaixo"
          className="seta-abaixo"
        />
    </div>
  );
};

export default SobreNos;
