import { useTranslation } from "react-i18next";
import LoaderLazy from "@/components/loader/lazy";
import useCustomHook from "./hooks";

const VerifyPage = () => {
  const { t } = useTranslation();
  useCustomHook();
  return <LoaderLazy message={t("verify_loading") || ""} />;
};

export default VerifyPage;
