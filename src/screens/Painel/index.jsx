import "./styles.css";
import setaDireita from "../../assets/images/seta-direita-submit.svg";

const Painel = () => {
  return (
    <div className="container-painel">
      <div className="box-title-painel">
        <h1 className="title-painel">Painel de Denúncias</h1>
      </div>
      <div className="box">
        <img alt="seta esquerda" src={setaDireita} className="seta-painel" />
        <div className="content-painel">
          <div className="title-box">
            <h4>texto exemplo</h4>
          </div>
          <div className="content-box">
            <textarea disabled className="textarea-painel">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              maxime, Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Magnam maxime, Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Magnam maxime, Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Magnam maxime, Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Magnam maxime, Lorem ipsum dolor
              sit amet consectetur, adipisiLorem ipsum dolor sit amet
              consectetur, adipisicing elit. Magnam maxime, Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Magnam maxime, Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Magnam maxime, Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Magnam maxime,
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              maxime, Lorem ipsum dolor sit amet consectetur, adipisiLorem ipsum
              dolor sit amet consectetur, adipisicing elit. Magnam maxime, Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Magnam maxime,
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
              maxime, Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Magnam maxime, Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Magnam maxime, Lorem ipsum dolor sit amet consectetur,
              adipisiLorem ipsum dolor sit amet consectetur, adipisicing elit.
              Magnam maxime, Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Magnam maxime, Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Magnam maxime, Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Magnam maxime, Lorem ipsum dolor
              sit amet consectetur, adipisicing elit. Magnam maxime, Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Magnam maxime, Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Magnam maxime,
            </textarea>
          </div>
        </div>
        <img alt="seta direita" src={setaDireita} className="seta-painel" />
      </div>
    </div>
  );
};

export default Painel;
