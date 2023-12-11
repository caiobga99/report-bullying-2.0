import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id_usuario } = useParams();
  return (
    <div>
      <div>{id_usuario}</div>
    </div>
  );
};

export default UserDetails;
