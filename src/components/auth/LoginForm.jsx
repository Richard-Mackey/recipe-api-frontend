import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import background from "../../assets/Background.jpg";

export const LoginForm = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login, logout, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(usernameInput, passwordInput);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.username}</h2>
        <p>Login succesful</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div
      className="m-5 p-4 login-page"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-center">Login</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="mb-3 d-md-none">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="form-control"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group mb-3 d-none d-md-flex">
          <span className="input-group-text col-md-2">Username</span>
          <input
            type="text"
            className="form-control"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-3 d-md-none">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group mb-3 d-none d-md-flex">
          <span className="input-group-text col-md-2">Password</span>
          <input
            type="text"
            className="form-control"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button className="btn btn-light mb-5" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="text-light">
          Register here
        </Link>
      </p>
    </div>
  );
};
