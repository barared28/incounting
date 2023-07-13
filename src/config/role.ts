import Menus from "./menu";

interface IRole {
  group: {
    key: string;
    label: string;
    parent: {
      key: string;
      label: string;
      Icon?: JSX.Element;
      menu: {
        key: string;
        label: string;
        actions?: {
          label: string;
          value: string;
        }[];
        Icon?: JSX.Element;
      }[];
    }[];
  };
}

const Role: IRole[] = Menus.map((val) => ({
  group: {
    key: val.key,
    label: val.name,
    parent: val.menus.map((menu) => ({
      key: menu.key,
      label: menu.name,
      Icon: menu.Icon,
      menu: menu.subs.map((sub) => ({
        key: sub.key,
        label: sub.name,
        Icon: sub.Icon,
        actions: [
          {
            value: "view",
            label: "View",
          },
          ...(sub.actions || []),
        ],
      })),
    })),
  },
}));

export default Role;
