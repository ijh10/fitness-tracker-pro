import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";
//import { usePage } from "./PageContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  let navigate = useNavigate();
  //const { setPage } = usePage();
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <a onClick={() => navigate("/activities")}>Activities</a>
        <a onClick={() => navigate("/routines")}>Routines</a>
        {token ? (
          <a onClick={() => logout()}>Log out</a>
        ) : (
          <>
            <a onClick={() => navigate("/register")}>Register</a>
            <a onClick={() => navigate("/login")}>Login</a>
          </>
        )}
      </nav>
    </header>
  );
}
