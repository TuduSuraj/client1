import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
// import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    await axios
      .post("/login", { email, password })
      .then((data) => {
        console.log(data, "data from login");
        setUser(data);
        alert("login successful");
        navigate("/");
        window.location.reload();
        //  setRedirect(true);
      })
      .catch((err) => {
        if (err.response.status === 422) {
          alert("form fields can't be empty");
        }
        if (err.response.status === 403) {
          alert(" password didn't match");
        }
        if (err.response.status === 401) {
          alert(" email didn't match");
        }
        console.log(err);
      });
  }

  // if (redirect) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-44">
        <h1 className="text-4xl text-center mb-4"> Login </h1>
        <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com "
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary ">Login</button>

          <div className="text-center py-2 text-gray-500">
            Dont have an account yet?
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
