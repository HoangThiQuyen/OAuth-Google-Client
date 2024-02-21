import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";
import ProfileContext from "./ProfileContext";

function App() {
  const profile = JSON.parse(localStorage.getItem("user_info"));
  const usernames = [
    {
      name: "user1",
      value: "user65c4d375f6df80528431a369",
    },
    {
      name: "user2",
      value: "quyenhoangthi",
    },
  ];

  const LIMIT = 10;
  const PAGE = 1;
  return (
    <>
      <ProfileContext.Provider
        value={{ profile, usernames, page: PAGE, limit: LIMIT }}
      >
        <RouterProvider router={router} />
      </ProfileContext.Provider>
    </>
  );
}

export default App;
