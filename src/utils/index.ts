export * from "./fetch";
export const changeTitlePage = (title?: string | null) => {
  document.title = title ? `${title} | Incounting` : "Incounting";
};

export const convertInitial = (fullName: string) =>
  fullName
    .split(" ")
    ?.filter((_: any, index: number) => index < 2)
    ?.map((val: string) => val[0])
    ?.join("");
