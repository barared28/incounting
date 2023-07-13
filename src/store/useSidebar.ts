import { create } from "zustand";

interface IStoreSidebar {
  expanded: boolean;
  toggleExpanded: () => void;
}

const useSidebar = create<IStoreSidebar>()((set) => ({
  expanded: true,
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));

export default useSidebar;
