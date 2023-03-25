import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children , props}) => {

    const location = useLocation();

    const isUserAuthorized = props.authedUser !== null;

    return isUserAuthorized ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
    {!isUserAuthorized ? null : <Navbar />}
  }

  const mapStateToProps = ({authedUser}) => ({
    authedUser,
  })

  export default connect(mapStateToProps)(ProtectedRoute)