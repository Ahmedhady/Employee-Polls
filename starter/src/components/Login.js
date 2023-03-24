import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = (props) => {

    const navigate = useNavigate();
    const state = useLocation();
  
    const [userName, setUserName] = useState("");
    const [password, setUserPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const autheduser = Object.values(props.users).filter((user) => user.id === userName && user.password === password);
  
    const handleLogIn = (event) => {
      event.preventDefault();
      if (!autheduser || userName === "" || password === "" || autheduser.length === 0) {
        setErrorMessage("Please try to login again.");
      } else {props.dispatch(setAuthedUser(autheduser[0].id));
        navigate(state?.path || "/");
      }
    };
  
    const handleUserName = (event) => {
        setUserName(event.target.value);
    };
  
    const handleUserPassword = (event) => {
        setUserPassword(event.target.value);
    };

    const isEmpty = () => userName === "" || password === "";
  
    return (
      <p className="center">
        Login & join us
        <form onSubmit={handleLogIn}>
            <p>
          <input type="text" placeholder={"id"} onChange={handleUserName}/>
          </p>
          <p>
          <input type="password" placeholder={"password"} onChange={handleUserPassword}/>
          </p>
          <p>
          <button disabled={isEmpty()}>Login</button>
          </p>
          <p>
            {errorMessage}
          </p>
        </form>
      </p>
    );
  };
  
  const mapStateToProps = ( props ) => (
    props
)
  
  export default connect(mapStateToProps)(Login);