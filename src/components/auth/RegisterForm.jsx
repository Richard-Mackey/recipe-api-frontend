import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import background from "../../assets/Background.jpg";

export const RegisterForm = () => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, logout, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (usernameInput.length < 3 || usernameInput.length > 20) {
      setError("Username must be between 3 and 20 characters");
      return;
    }

    if (passwordInput.length < 6 || passwordInput.length > 100) {
      setError("Password must be between 6 and 100 characters");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailInput)) {
      setError("Invalid email address");
      return;
    }

    if (passwordInput !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await register(usernameInput, emailInput, passwordInput);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div>
        <h2>Welcome, {user.username}</h2>
        <p>Registration succesful</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return (
    <div
      className="m-5 registration-page"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-center">Registration</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="username">
            Username
          </span>
          <input
            type="text"
            className="form-control"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="username">
            Email
          </span>
          <input
            type="text"
            className="form-control"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="username">
            Password
          </span>
          <input
            type="password"
            className="form-control"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text col-2" id="username">
            Confirm Password
          </span>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button className="btn btn-light mb-3" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/" className="text-light">
          Login here
        </Link>
      </p>
    </div>
  );
};
