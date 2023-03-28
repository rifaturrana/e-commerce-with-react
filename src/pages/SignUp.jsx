import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1/8000/api/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/login");
        } else {
          return res.json();
        }
      })
      .then((result) => {
        let errorArray = [];
        for (let error in result) {
          errorArray.push(result[error]);
        }
        setErrors(errorArray);
      });
  };
  return (
    <>
      <div className="signup">
        <h2>Sign Up to our website</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            onChange={onChangeHandler}
            value={user.username}
            className="signup-input"
            type="text"
            name="username"
          />
          <br />
          <br />
          <input
            onChange={onChangeHandler}
            value={user.email}
            className="signup-input"
            type="text"
            name="email"
          />
          <br />
          <br />
          <input
            onChange={onChangeHandler}
            value={user.password}
            className="signup-input"
            type="password"
            name="password"
          />
          <br />
          <br />
          <input className="signup-input" type="submit" value="Sign Up" />
        </form>
      </div>
      {errors.length !== 0 ? (
        <>
          {errors.map((error) => {
            return (
              <p key={error} className="error-message">
                {error}
              </p>
            );
          })}
        </>
      ) : null}
    </>
  );
};

export default SignUp;
