import { useContext } from "react";
import AuthContext from "../Context/authContext";

export default function useAuth() {
  return useContext(AuthContext);
}
