import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const Tracks = () => {

  const params = useParams();
  let navigate = useNavigate();
  const {user} = useContext(AuthContext);

  const [data, setData] = useState({});

  
  return (
      <>
      <h1>Tracks</h1>
      </>
  )
}

export default Tracks