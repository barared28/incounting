import Cookies from "js-cookie";

export const clearAllAuthCookie = () => {
  Cookies.remove("token");
  Cookies.remove("user");
  Cookies.remove("business");
};
