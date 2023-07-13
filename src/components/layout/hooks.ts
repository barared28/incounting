import { useEffect } from "react";
import { changeTitlePage } from "@/utils";
import { useTranslation } from "react-i18next";
import useBreadcrumb from "@/store/useBreadcrumb";
import { IMenusMain } from "@/config/menu";
import { useLocation } from "react-router-dom";
import useSidebar from "@/store/useSidebar";
import { useViewportSize } from "@mantine/hooks";
import { useMutation } from "react-query";
import { generateKeyService } from "@/services/login";
import { ClientJS } from "clientjs";

interface IProps {
  title?: string;
  isTranslated?: boolean;
  menus: IMenusMain[];
}

export const useCustomLayout = ({ isTranslated, title, menus }: IProps) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { setBreadcrumb } = useBreadcrumb();
  const { expanded, toggleExpanded } = useSidebar();
  const { width } = useViewportSize();

  useEffect(() => {
    changeTitlePage(isTranslated ? t(title || "") : title);
    return () => {
      changeTitlePage();
    };
  }, [i18n.language]);

  useEffect(() => {
    if (width <= 1024 && expanded) toggleExpanded();
    if (width > 1024 && !expanded) toggleExpanded();
  }, [width]);

  useEffect(() => {
    const locPath = location?.pathname;
    const findMenu = menus.find((val) =>
      val.menus?.find((it) => it.subs?.find((sub) => sub.path === locPath))
    );
    if (findMenu) {
      const res = {
        ...findMenu,
        menus: findMenu?.menus.find((val) =>
          val.subs.find((it) => it.path === locPath)
        ),
      };
      const finalResult = {
        ...res,
        menus: {
          ...res.menus,
          subs: res?.menus?.subs?.find((val) => val.path === locPath),
        },
      };
      if (finalResult) {
        const breadcrumb = [];
        if (finalResult?.breadcrumb) breadcrumb.push(finalResult?.breadcrumb);
        if (finalResult?.menus?.breadcrumb)
          breadcrumb?.push(finalResult?.menus?.breadcrumb);
        if (finalResult?.menus?.subs?.breadcrumb)
          breadcrumb?.push(finalResult?.menus?.subs?.breadcrumb);
        setBreadcrumb(breadcrumb);
      }
    }
  }, [menus, location.pathname]);

  return { expanded };
};

interface IPropsRedirect {
  path: string;
}

const OLD_PAGE = import.meta.env.VITE_OLD_PAGE_URL;

export const useRedirectOldVersion = () => {
  const { mutate, isLoading } = useMutation((payload: any) =>
    generateKeyService(payload)
  );
  const handleRedirect = (props: IPropsRedirect) => {
    const { path } = props;
    const client = new ClientJS();
    const visitorId = client.getFingerprint();
    const payload = {
      visitor_id: String(visitorId),
    };
    mutate(payload, {
      onSuccess: (data) => {
        const signature = data?.signature_browser;
        const key = signature?.split(".")[0] || "";
        const encodedKey = encodeURIComponent(key);
        const resPath = path[0] === "/" ? path.slice(1) : path;
        const url = `${OLD_PAGE}/verify?key=${encodedKey}&path=${resPath}`;
        window.open(url, "_self");
      },
    });
  };
  return { handleRedirect, loading: isLoading };
};
