//import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPages";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterUser from "./pages/RegisterUser";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import OwnerListings from "./pages/OwnerListings";
import ListingForm from "./pages/ListingForm";
import ListingPage from "./pages/ListingPage";
import UserBookings from "./pages/UserBookings";
import RegisterAsOwner from "./pages/RegisterAsOwner";

axios.defaults.baseURL = "https://api1-flax.vercel.app";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/registerOwner" element={<RegisterAsOwner />}></Route>
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<OwnerListings />} />
          <Route path="/account/places/new" element={<ListingForm />} />
          <Route path="/account/places/:id" element={<ListingForm />} />
          <Route path="/place/:id" element={<ListingPage />} />
          <Route path="/account/bookings" element={<UserBookings />}></Route>

        </Route>
      </Routes>
    </UserContextProvider>
  );
}
export default App;

