import useAuth from "@/store/useAuth";
import useBusiness from "@/store/useBusiness";
import useUser from "@/store/useUser";
import { AuthType } from "@/types";
import { useState, useEffect } from "react";

interface IAuthHooks {
  type: AuthType;
  logout: () => void;
  removeToken: () => void;
  token: string;
  setToken: (token: string) => void;
  removeUser: () => void;
  setUser: (user: any) => void;
  user: any;
}

const useAuthHooks = (): IAuthHooks => {
  const [type, setType] = useState<AuthType>("not-login");
  const { removeToken, token, setToken } = useAuth();
  const { removeUser, setUser, user } = useUser();
  const { business, removeBusiness } = useBusiness();

  const logout = () => {
    removeToken();
    removeUser();
    removeBusiness();
  };

  useEffect(() => {
    if (token && user && business) {
      setType("have-business");
    } else if (token && user) {
      setType("logined");
    } else {
      setType("not-login");
    }
  }, [user, token, business]);

  return {
    logout,
    type,
    removeToken,
    token,
    setToken,
    removeUser,
    setUser,
    user,
  };
};

export default useAuthHooks;
