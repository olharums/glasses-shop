import { $authHost, $host } from "./index";
export const fetchAllOrders = async () => {
  const { data } = await $host.get("api/orders");

  return data;
};

export const createOrders = async (formData) => {
  const { data } = await $authHost.post("api/orders", formData);
  return data;
};

export const editOrders = async (formData) => {
  const { id } = formData;
  const { data } = await $authHost.put("api/orders/" + id, formData);
  return data;
};

export const deleteOrders = async (id) => {
  const { data } = await $authHost.delete("api/orders/" + id);
  return data;
};
