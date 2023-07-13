import { Flex, Select, Text } from "@mantine/core";
import { ReactComponent as LogoEn } from "@/assets/svg/en-icon.svg";
import { ReactComponent as LogoId } from "@/assets/svg/id-icon.svg";
import { useState, forwardRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useStylesLang } from "./styles";
interface IPropsItem extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  label: string;
  component: JSX.Element;
}

const SelectItem = forwardRef<HTMLDivElement, IPropsItem>(
  ({ value, label, component, ...restProps }: IPropsItem, ref) => (
    <div ref={ref} {...restProps}>
      <Flex py={2} px={0} gap={6} align="center">
        {component}
        <Text size="xs">{label}</Text>
      </Flex>
    </div>
  )
);

const SelectLanguage = () => {
  const { i18n } = useTranslation();
  const { classes } = useStylesLang();
  const [lang, setLang] = useState(i18n.language || "en-EN");

  const DATA_SELECT = [
    {
      value: "en-EN",
      label: "EN",
      component: <LogoEn className={classes.logo} />,
    },
    {
      value: "id-ID",
      label: "ID",
      component: <LogoId className={classes.logo} />,
    },
  ];

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
      Cookies.set("language", lang);
    }
  }, [lang]);

  return (
    <Select
      data={DATA_SELECT}
      variant="unstyled"
      itemComponent={SelectItem}
      size="xs"
      value={lang}
      className={classes.select}
      onChange={(val) => setLang(val || "")}
      icon={
        lang === "id-ID" ? (
          <LogoId className={classes.logo} />
        ) : (
          <LogoEn className={classes.logo} />
        )
      }
    />
  );
};

export default SelectLanguage;
