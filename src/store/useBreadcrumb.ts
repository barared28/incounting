import { IBreadcrumb } from "@/types";
import { create } from "zustand";

interface IStoreBreadcrumb {
  breadcrumb: IBreadcrumb[];
  setBreadcrumb: (breadcrumb: any) => void;
}

const useBreadcrumb = create<IStoreBreadcrumb>((set) => ({
  breadcrumb: [],
  setBreadcrumb: (val) => set({ breadcrumb: val }),
  pushBreadcrumb: (val: any) =>
    set((prev) => ({ breadcrumb: [...prev?.breadcrumb, val] })),
}));

export default useBreadcrumb;
