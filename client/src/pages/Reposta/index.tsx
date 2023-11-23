import { useParams } from "react-router-dom";

const Resposta: React.FC = () => {
  const params = useParams();
  const { id } = params;
  return <div>{id}</div>;
};

export default Resposta;
