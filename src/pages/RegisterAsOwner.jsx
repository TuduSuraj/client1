import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const RegisterAsOwner = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  function registerUser(ev) {
    ev.preventDefault();
    axios
      .post("/register", {
        name,
        email,
        password,
        type: "OWNER",
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Registration successful. Now can log in ");
          setRedirect(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 422) {
          alert("something went wrong");
        }
      });
  }

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-44">
        <h1 className="text-4xl text-center mb-4"> Register As Owner </h1>
        <form className="max-w-md mx-auto " onSubmit={registerUser}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
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
          <button className="primary">Register</button>

          <div className="text-center py-2 text-gray-500">
            Aready have an Account?
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsOwner;
