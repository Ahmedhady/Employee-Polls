import { Link } from "react-router-dom";
import LOGO from '../assets/logo.jpeg';
import { setAuthedUser } from "../actions/authedUser";
import { connect } from "react-redux";

const Navbar = (props) => {

    const handleLogOut = () => {
        if (props.userData != null) {
          props.dispatch(setAuthedUser(null));
        }
      };

    return(
     <nav  className="nav" >
        <ul>
            <li>
            <Link to={'/'}><img className="avatar"src={LOGO} alt="logo" /></Link>
            </li>
            <li>
                <Link to="/">Dashboard</Link>
            </li>
            <li>
                <Link to="/new">New Question</Link>
            </li>
            <li>
                <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li><img src={props.userData.avatarURL} alt ={`Avatar of ${props.userData.name}`} className="avatar" /></li>
            <li>{props.userData.name}</li>
            <li>
              <Link to="/login" onClick={handleLogOut}>Log out</Link>
            </li>
        </ul>
    </nav>
    )
}
const mapStateToProps = ({ authedUser, users }) => {
    return { userData: users[authedUser] };
  };
  
  export default connect(mapStateToProps)(Navbar);