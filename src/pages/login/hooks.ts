import { useForm, yupResolver } from "@mantine/form";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { loginService } from "@/services/login";
import useAuth from "@/store/useAuth";
import useUser from "@/store/useUser";

export const useFormLogin = () => {
  const { t } = useTranslation();
  const schema = Yup.object({
    username: Yup.string().required(t("required", { key: "Email" }) || ""),
    password: Yup.string()
      .min(6, t("min", { key: t("login.password"), val: 6 }) || "")
      .required(t("required", { key: t("login.password") }) || ""),
  });
  return useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: yupResolver(schema),
    validateInputOnBlur: true,
  });
};

export const useHandleLogin = () => {
  const setToken = useAuth((state) => state.setToken);
  const setUser = useUser((state) => state.setUser);
  const { mutate, isLoading } = useMutation((data) => {
    return loginService(data);
  });

  const handleLogin = (data: any) => {
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
      },
    });
  };

  return { handleLogin, isLoading };
};
