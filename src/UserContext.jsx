import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [places, setPlaces] = useState([]);
  const [cityflag, setCityflag] = useState(false);
  const [city, setCity] = useState('')


  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <UserContext.Provider value={{ user, setUser, ready, places, setPlaces, cityflag, setCityflag, city, setCity }}>
      {children}
    </UserContext.Provider>
  );
}
