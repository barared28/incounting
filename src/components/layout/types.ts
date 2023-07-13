interface IMenuSidebarSub {
  label: string;
  logo: JSX.Element;
}

export interface IMenuSidebar {
  label: string;
  logo: JSX.Element;
  sub?: IMenuSidebarSub[];
}
