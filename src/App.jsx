import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.css";
import ProfileContext from "./ProfileContext";

function App() {
  const profile = JSON.parse(localStorage.getItem("user_info"));
  return (
    <>
      <ProfileContext.Provider value={profile}>
        <RouterProvider router={router} />
      </ProfileContext.Provider>
    </>
  );
}

export default App;
