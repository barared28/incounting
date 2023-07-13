import { useForm, yupResolver } from "@mantine/form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import RoleData from "@/config/role";

interface IDataRole {
  key: string;
  value: boolean;
  menu: {
    key: string;
    value: boolean;
    actions: {
      key: string;
      value: boolean;
    }[];
  }[];
}

interface IExistedRole {
  accesses: {
    key: string;
    actions: string;
  }[];
  id: string;
  display_name: string;
}

const generatePermissions = () => {
  let result: IDataRole[] = [];
  RoleData.forEach((item) => {
    const res: IDataRole[] = item.group.parent.map((group) => ({
      key: group.key,
      value: false,
      menu: group.menu.map((menu) => ({
        key: menu.key,
        value: false,
        actions:
          menu?.actions?.map((action) => ({
            key: action.value,
            value: false,
          })) || [],
      })),
    }));
    result.push(...res);
  });
  return result;
};

const useFormRole = (data: IExistedRole) => {
  const [permissions, setPermissions] = useState<IDataRole[]>(
    generatePermissions()
  );
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
  });

  const form = useForm({
    initialValues: {
      name: "",
    },
    transformValues: (values) => {
      let access: {
        key: string;
        actions: string[];
      }[] = [];
      permissions?.forEach((item) => {
        const menu =
          item.menu
            ?.filter((menu) => menu.value)
            ?.map((menu) => ({
              key: menu.key,
              actions:
                menu.actions
                  ?.filter((action) => action.value)
                  ?.map((action) => action.key) || [],
            })) || [];
        access.push(...menu);
      });
      return {
        display_name: values?.name,
        access,
      };
    },
    validate: yupResolver(schema),
  });

  const findValue = (
    type: "group" | "menu" | "action",
    keyGroup: string,
    keyMenu?: string,
    keyAction?: string
  ): boolean => {
    const group = permissions?.find((item) => item.key === keyGroup);
    if (type === "group") {
      return !!group?.value;
    }
    const menu = group?.menu?.find((item) => item.key === keyMenu);
    if (type === "menu") {
      return !!menu?.value;
    }
    const action = menu?.actions?.find((item) => item.key === keyAction);
    if (type === "action") {
      return !!action?.value;
    }
    return false;
  };

  const countActiveMenu = (keyGroup: string): number => {
    const group = permissions?.find((item) => item.key === keyGroup);
    return group?.menu?.filter((item) => item.value)?.length || 0;
  };

  const countActiveAction = (keyGroup: string, keyMenu: string): number => {
    const group = permissions?.find((item) => item.key === keyGroup);
    const menu = group?.menu?.find((item) => item.key === keyMenu);
    return menu?.actions?.filter((item) => item.value)?.length || 0;
  };

  useEffect(() => {
    if (data) {
      form.setValues({
        name: data?.display_name || "",
      });
    }
    if (data?.accesses?.length > 0) {
      const newPermissions = [...permissions];
      data?.accesses?.forEach((item) => {
        const findGroup = newPermissions.findIndex((group) =>
          group.menu.some((menu) => menu.key === item.key)
        );
        if (findGroup !== -1) {
          const findMenu = newPermissions[findGroup].menu.findIndex(
            (menu) => menu.key === item.key
          );
          if (findMenu !== -1) {
            newPermissions[findGroup].menu[findMenu].value = true;
            const actions = item.actions.split(",") || [];
            actions.forEach((action) => {
              const findAction = newPermissions[findGroup].menu[
                findMenu
              ].actions.findIndex((a) => a.key === action);
              if (findAction !== -1) {
                newPermissions[findGroup].menu[findMenu].actions[
                  findAction
                ].value = true;
              }
            });
            const activeMenu = countActiveMenu(item.key);
            if (activeMenu === 0) {
              newPermissions[findGroup].value = false;
            } else {
              newPermissions[findGroup].value = true;
            }
          }
          newPermissions[findGroup].value = true;
        }
      });
      setPermissions(newPermissions);
    }
  }, [data]);

  const handleChangeGroup = (key: string, value: boolean) => {
    const newPermissions = [...permissions];
    const index = newPermissions.findIndex((item) => item.key === key);
    newPermissions[index].value = value;
    newPermissions[index].menu.forEach((menu) => {
      menu.value = value;
      menu.actions.forEach((action) => {
        action.value = value;
      });
    });
    setPermissions(newPermissions);
  };

  const handleChangeMenu = (
    keyGroup: string,
    keyMenu: string,
    value: boolean
  ) => {
    const newPermissions = [...permissions];
    const indexGroup = newPermissions.findIndex(
      (item) => item.key === keyGroup
    );
    const indexMenu = newPermissions[indexGroup].menu.findIndex(
      (item) => item.key === keyMenu
    );
    newPermissions[indexGroup].menu[indexMenu].value = value;
    newPermissions[indexGroup].menu[indexMenu].actions.forEach((action) => {
      action.value = value;
    });
    const activeMenu = newPermissions[indexGroup].menu.filter(
      (item) => item.value
    ).length;
    if (activeMenu === 0) {
      newPermissions[indexGroup].value = false;
    } else {
      newPermissions[indexGroup].value = true;
    }
    setPermissions(newPermissions);
  };

  const handleChangeAction = (
    keyGroup: string,
    keyMenu: string,
    keyAction: string,
    value: boolean
  ) => {
    const newPermissions = [...permissions];
    const indexGroup = newPermissions.findIndex(
      (item) => item.key === keyGroup
    );
    const indexMenu = newPermissions[indexGroup].menu.findIndex(
      (item) => item.key === keyMenu
    );
    const indexAction = newPermissions[indexGroup].menu[
      indexMenu
    ].actions.findIndex((item) => item.key === keyAction);
    newPermissions[indexGroup].menu[indexMenu].actions[indexAction].value =
      value;
    const activeAction = newPermissions[indexGroup].menu[
      indexMenu
    ].actions.filter((item) => item.value).length;
    if (activeAction === 0) {
      newPermissions[indexGroup].menu[indexMenu].value = false;
    } else {
      newPermissions[indexGroup].menu[indexMenu].value = true;
    }
    if (activeAction === 1) {
      newPermissions[indexGroup].menu[indexMenu].actions[0].value = true;
    }
    const activeMenu = newPermissions[indexGroup].menu.filter(
      (item) => item.value
    ).length;
    if (activeMenu === 0) {
      newPermissions[indexGroup].value = false;
    } else {
      newPermissions[indexGroup].value = true;
    }
    setPermissions(newPermissions);
  };

  const handleCloseForm = () => {
    form.reset();
    setPermissions(generatePermissions());
  };

  return {
    form,
    permissions,
    findValue,
    handleChangeGroup,
    handleChangeMenu,
    handleChangeAction,
    countActiveMenu,
    countActiveAction,
    handleCloseForm,
  };
};

export default useFormRole;
