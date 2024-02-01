import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const new_user = params.get("new_user");
    const verify = params.get("verify");
    console.log({ new_user, verify });
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
    navigate("/");
  }, [navigate, params]);
  return <div>Login</div>;
};

export default Login;
