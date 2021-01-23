import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, IAuthState } from "../../redux/authSlice";
import { RootState } from "../../redux/store";

const Landing = () => {
  const authState = useSelector((state: RootState): IAuthState => state.auth);
  const isAuthorized = useSelector(
    (state: RootState) => state.auth.isAuthorized
  );
  const dispatch = useDispatch();

  let history = useHistory();

  const [username, setUsername] = useState("usertest");
  const [password, setPassword] = useState("secret");

  useEffect(() => {
    if (isAuthorized) {
      history.push("/books");
    }
  }, [isAuthorized]);

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100 landing_page">
      <div className="container-md">
        <h2 className="text-white mx-auto mb-5 text-center">
          Welcome to your <br />
          <span className="font-weight-bolder">Book shop</span>
        </h2>

        <div className="card m-auto px-4 py-5">
          {authState.loginError.type ? (
            <div className={`alert alert-${authState.loginError.type}`}>
              {authState.loginError.text}
            </div>
          ) : null}
          <input
            className="form-control form-control-solid mb-3"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="form-control form-control-solid mb-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="btn btn-primary mx-auto mt-4"
            onClick={() => dispatch(loginAction({ username, password }))}
          >
            {authState.isLoadingLogin ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
