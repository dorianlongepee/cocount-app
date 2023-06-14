import { createContext, useState } from "react";
import { User, UserContextType } from "@/types/user";

const fallbackUser: User = {
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
};

const defaultUserContext: UserContextType = {
  user: fallbackUser,
  login: () => {},
  logout: () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>(fallbackUser);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(fallbackUser);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
