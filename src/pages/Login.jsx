import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../Login.module.css";

import { AuthContext } from "../context/Auth";
const Login = () => {
  const [error, setError] = useState("");
  const [logInCredentials, setLogInCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const onChangeHanlder = (e) => {
    setLogInCredentials({
      ...logInCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInCredentials),
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            authContext.login(data.user, data.token);
            navigate("/");
          });
        } else if (!res.ok && res.status === 400) {
          return res.json().then((data) => {
            setError(data.non_field_errors[0]);
          });
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <>
      <section className={classes.auth}>
        <h1>Login to your account</h1>
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              required
              onChange={onChangeHanlder}
              value={logInCredentials.username}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              onChange={onChangeHanlder}
              value={logInCredentials.password}
            />
          </div>
          <div className={classes.control}>
            <button>Login</button>
          </div>
        </form>
      </section>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default Login;
