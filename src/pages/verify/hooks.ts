import { verifyService } from "@/services/login";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "@/store/useAuth";
import useUser from "@/store/useUser";
import useBusiness from "@/store/useBusiness";
import { ClientJS } from "clientjs";

const useCustomHook = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setToken = useAuth((state) => state.setToken);
  const setUser = useUser((state) => state.setUser);
  const setBusiness = useBusiness((state) => state.setBusiness);
  const params = new URLSearchParams(location?.search);
  const key = params.get("key");
  const path = params.get("path");
  const { mutate } = useMutation((params: any) => verifyService(params));
  const handleVerify = async (key: string, path: string) => {
    const client = new ClientJS();
    const visitorId = client.getFingerprint();
    const payload = { key, visitor_id: visitorId };
    mutate(payload, {
      onSuccess: (data) => {
        if (data?.token) {
          setToken(data?.token);
          setUser(data?.user);
          setBusiness(data?.business);
          const resPath = `/${path}`;
          setTimeout(() => {
            window.location.href = resPath;
          }, 1000);
        }
      },
      onError: () => {
        navigate("/");
      },
    });
  };
  useEffect(() => {
    if (key && path) {
      handleVerify(key, path);
    }
  }, [key, path]);
};

export default useCustomHook;
