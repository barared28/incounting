import {
  IPropertyResponse,
  createProperty,
  getProperty,
  updateProperty,
} from "@/services/property";
import { TPageDialogType } from "@/types";
import { useForm, yupResolver } from "@mantine/form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import * as Yup from "yup";

interface IPropsData {
  page: number;
  limit: number;
}

export const useDataProperty = (
  props: IPropsData
): UseQueryResult<IPropertyResponse, any> => {
  const { page = 1, limit = 10 } = props;
  const query = useQuery(["property"], async () =>
    getProperty({ page, limit, include: "business,category" })
  );

  useEffect(() => {
    query.refetch();
  }, [page, limit]);

  return query;
};

interface IPropsForm {
  [key: string]: any;
}

export const useFormProperty = (props: IPropsForm) => {
  const { t } = useTranslation();
  const schema = Yup.object({
    name: Yup.string().required(t("required", { key: "Name" }) || ""),
    code: Yup.string().required(t("required", { key: "Code" }) || ""),
    product_category_id: Yup.string().required(
      t("required", { key: "Type" }) || ""
    ),
  });
  const form = useForm({
    initialValues: {
      name: "",
      code: "",
      product_category_id: "",
    },
    validate: yupResolver(schema),
  });
  useEffect(() => {
    if (props) {
      Object.keys(props).forEach((key) => {
        form.setFieldValue(key, props[key]);
      });
    }
  }, [props]);
  return form;
};

interface IPropsSave {
  payload: any;
  id?: number;
  type: TPageDialogType;
  callback?: any;
}

export const useSaveProperty = () => {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: loadingCreate } = useMutation(
    (payload) => createProperty(payload)
  );
  const { mutate: mutateSave, isLoading: loadingSave } = useMutation(
    ({ payload, id }: any) => updateProperty(payload, id)
  );

  const handleSave = (props: IPropsSave) => {
    const { type, id, payload, callback } = props;
    const formData: any = new FormData();
    Object.keys(payload).forEach((key) => {
      if (key === "type") return;
      formData.append(key, payload[key]);
    });
    if (type === "create") {
      mutateCreate(formData, {
        onSuccess: () => {
          callback();
          queryClient.invalidateQueries("property");
        },
      });
    } else if (type === "update") {
      mutateSave(
        { payload: formData, id },
        {
          onSuccess: () => {
            callback();
            queryClient.invalidateQueries("property");
          },
        }
      );
    }
  };

  return { handleSave, loading: loadingCreate || loadingSave };
};
