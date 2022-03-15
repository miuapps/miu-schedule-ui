import React, { Component } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { history } from '../helpers/history';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
class AuthVerify extends Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const decodedJwt = parseJwt(user.accessToken);
        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    });
  }
  render() {
    return <div></div>;
  }
}
export default withRouter(AuthVerify);

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}