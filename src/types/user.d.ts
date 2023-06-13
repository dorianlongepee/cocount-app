export type User = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type UserContextType = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
};
