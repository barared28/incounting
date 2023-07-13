import { Suspense, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoaderLazy from "@/components/loader/lazy";
import MantineProvider from "@/components/provider/mantine";
import useVerifyMe from "@/hooks/useVerifyMe";
import ServerDown from "@/pages/server-down";
import useAuthHooks from "@/hooks/useAuth";
import generateRouter from "./router";

export default function Core() {
  const { t } = useTranslation();
  const { token, type } = useAuthHooks();
  const { isLoading, isError } = useVerifyMe(token);
  const Router = useMemo(() => generateRouter(type, {}), [type]);

  return (
    <MantineProvider>
      {isLoading ? (
        <LoaderLazy message={t("please_wait") || ""} />
      ) : (
        <>
          {isError && token ? (
            <ServerDown />
          ) : (
            <Suspense
              fallback={<LoaderLazy message={t("please_wait") || ""} />}
            >
              <RouterProvider router={Router} />
            </Suspense>
          )}
        </>
      )}
    </MantineProvider>
  );
}
