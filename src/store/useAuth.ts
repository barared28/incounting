import Cookies from "js-cookie";
import { create } from "zustand";

interface IStoreAuth {
  token: string;
  setToken: (token: string) => void;
  removeToken: () => void;
}

const useAuth = create<IStoreAuth>()((set) => ({
  token: Cookies.get("token") || "",
  setToken: (token) => {
    Cookies.set("token", token);
    set(() => ({ token }));
  },
  removeToken: () => {
    Cookies.remove("token");
    set(() => ({ token: "" }));
  },
}));

export default useAuth;
