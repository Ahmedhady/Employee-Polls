import { Link, useNavigate } from "react-router-dom";
import LOGO from '../assets/logo.jpeg';
import { logoutAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

const Navbar = (props) => {

  const navigate = useNavigate();

  const handleLogOut = (e) => {
        e.preventDefault();
        props.dispatch(logoutAuthedUser());
        navigate('/login');
      }

    return(
     <nav  className="nav" >
        <ul>
            <li>
            <Link to="/"><img className="avatar"src={LOGO} alt="logo" /></Link>
            </li>
            <li>
                <Link to="/" className="btn">Home</Link>
            </li>
            <li>
                <Link to="/add" className="btn">New</Link>
            </li>
            <li>
                <Link to="/leaderboard" className="btn">Leaderboard</Link>
            </li>
            <li><img src={props.userData.avatarURL} alt ={`Avatar of ${props.userData.name}`} className="avatar" /></li>
            <li>{props.userData.name}</li>
            <li>
              <Link to="/login" className="btn" onClick={handleLogOut}>Log out</Link>
            </li>
        </ul>
    </nav>
    )
}
const mapStateToProps = ({ authedUser, users }) => {
    return { userData: users[authedUser] };
  };
  
  export default connect(mapStateToProps)(Navbar);