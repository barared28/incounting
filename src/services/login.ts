import fetch from "@/utils/fetch";

export const loginService = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/login",
      method: "post",
      payload,
      contentType: "multipart/form-data",
      tokenRequired: false,
    });
    return res?.data;
  } catch {}
};

export const meService = async () => {
  try {
    const res = await fetch({
      path: "admin/me",
      method: "get",
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const verifyService = async (params: any) => {
  try {
    const res = await fetch({
      path: "user/check",
      method: "get",
      params,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};

export const generateKeyService = async (payload: any) => {
  try {
    const res = await fetch({
      path: "admin/generate-key",
      method: "post",
      payload,
    });
    return res?.data;
  } catch (error) {
    throw error;
  }
};
