import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, exact, path, authedUser }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authedUser ? (
          <Component {...props} />
        ) : (
          <redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
  
  const mapStateToProps = ({ authedUser }) => ({
    authedUser,
  })
  
  export default connect()(ProtectedRoute);