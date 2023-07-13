import Cookies from "js-cookie";
import { create } from "zustand";

interface IStoreUser {
  user: any;
  setUser: (user: any) => void;
  removeUser: () => void;
}

const useUser = create<IStoreUser>()((set) => ({
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") || "") : null,
  setUser: (user) => {
    Cookies.set("user", JSON.stringify(user));
    set(() => ({ user }));
  },
  removeUser: () => {
    Cookies.remove("user");
    set(() => ({ user: null }));
  },
}));

export default useUser;
