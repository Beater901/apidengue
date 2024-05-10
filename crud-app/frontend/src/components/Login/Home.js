import { Link } from "react-router-dom";
import App from '../../App';

const Home = () => {
  return (
    <div>
        <App />
        <Link to='/login' className="btn btn-light my-5">Logout</Link>
    </div>
  )
};

export default Home;