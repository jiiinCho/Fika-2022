import { createContext, useContext } from "react";
import { AuthServiceI } from "@interface/index";

export const AuthContext = createContext<AuthServiceI | undefined>(undefined);
export const useAuthContext = () => useContext(AuthContext);
