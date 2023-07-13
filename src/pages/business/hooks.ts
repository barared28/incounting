import { UseQueryResult, useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IBusinessResponse,
  getOptionBusiness,
  selectBusiness,
} from "@/services/business";
import { changeTitlePage } from "@/utils";
import useBusiness from "@/store/useBusiness";
import useAuth from "@/store/useAuth";
import useUser from "@/store/useUser";

export const useCustomBusiness = () => {
  const [mounted, setMounted] = useState(false);
  const [logined, setLogined] = useState(false);
  const { business } = useBusiness();

  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // check if it from dashboard or not bcs this page have 2 version
    if (location?.pathname === "/select-business" && business) {
      setLogined(true);
    }
  }, [location, location?.pathname]);

  useEffect(() => {
    changeTitlePage(t("login.title"));
    return () => {
      changeTitlePage();
    };
  }, [i18n.language]);

  return {
    mounted,
    setMounted,
    logined,
    setLogined,
    business,
  };
};

export const useOptionBusiness = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}): UseQueryResult<IBusinessResponse, any> => {
  const query = useQuery(["business"], async () =>
    getOptionBusiness({ include: "businesstype", limit, page })
  );
  return query;
};

export const useHandleSelectBusiness = () => {
  const setBusiness = useBusiness((state) => state.setBusiness);
  const setToken = useAuth((state) => state.setToken);
  const setUser = useUser((state) => state.setUser);
  const { mutate } = useMutation((data) => {
    return selectBusiness(data);
  });

  const handleSelect = (data: any, callback?: any) => {
    const formData: any = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    mutate(formData, {
      onSuccess: (data) => {
        if (data?.token) {
          setToken(data.token);
        }
        if (data?.user) {
          setUser(data.user);
        }
        if (data?.business) {
          setBusiness(data.business);
        }
        if (callback) {
          callback();
        }
      },
    });
  };

  return { handleSelect };
};
