import Cookies from "js-cookie";
import { create } from "zustand";

interface IStoreBusiness {
  business: any;
  setBusiness: (business: any) => void;
  removeBusiness: () => void;
}

const useBusiness = create<IStoreBusiness>()((set) => ({
  business: Cookies.get("business")
    ? JSON.parse(Cookies.get("business") || "")
    : null,
  setBusiness: (business) => {
    Cookies.set("business", JSON.stringify(business));
    set(() => ({ business }));
  },
  removeBusiness: () => {
    Cookies.remove("business");
    set(() => ({ business: null }));
  },
}));

export default useBusiness;
