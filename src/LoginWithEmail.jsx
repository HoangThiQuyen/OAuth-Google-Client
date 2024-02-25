import axios from "axios";
import { useState } from "react";

const LoginWithEmail = () => {
  const [info, setInfo] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("access_token"))
  );
  const handleChange = (e) => {
    const { value, name } = e.target;
    setInfo((info) => ({ ...info, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "/users/login",
      {
        email: info.email,
        password: info.password,
      },
      {
        baseURL: import.meta.env.VITE_API_URL,
      }
    );
    const { access_token, refresh_token } = result.data.result;
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    setIsAuthenticated(true);

    const infoMe = await axios.get("/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      baseURL: import.meta.env.VITE_API_URL,
    });
    localStorage.setItem("user_info", JSON.stringify(infoMe.data.result));
  };

  const hanldeLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
  return (
    <div>
      {!isAuthenticated ? (
        <>
          <div style={{ width: 200, height: 25 }}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              style={{ width: "100%", height: "100%" }}
              onChange={handleChange}
            />
          </div>
          <br />
          <div style={{ width: 200, height: 25 }}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              style={{ width: "100%", height: "100%" }}
              onChange={handleChange}
            />
          </div>
          <button style={{ marginTop: 20 }} onClick={handleSubmit}>
            Login
          </button>
        </>
      ) : (
        <>
          <div>
            Hello{" "}
            <strong>
              {JSON.parse(localStorage.getItem("user_info"))?.email}
            </strong>
            ! You are login already
          </div>
          <button style={{ marginTop: 20 }} onClick={hanldeLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};
export default LoginWithEmail;
