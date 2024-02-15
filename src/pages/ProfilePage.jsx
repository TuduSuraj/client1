import { Navigate, useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";
import axios from "axios";
import OwnerListings from "./OwnerListings";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    // console.log(subpage, "->subpage");
    subpage = "profile";
    console.log(subpage, "->subpage");
    console.log(ready, "ready-->16");
  }

  async function logout() {
    await axios
      .post("/logout")
      .then(() => {
        navigate("/");
        setUser(null);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        }
        console.log(err);
      });
  }

  if (!ready) {
    return "Loading...";
  }

  if (!user && ready) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          {" "}
          Logged in as {user.name} ({user.email})
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <OwnerListings />}
    </div>
  );
}
