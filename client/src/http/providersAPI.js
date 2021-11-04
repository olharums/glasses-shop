import { $authHost, $host } from "./index";
export const fetchProviders = async () => {
  const { data } = await $host.get("api/providers");

  return data;
};

export const createProviders = async (formData) => {
  const { data } = await $authHost.post("api/providers", formData);
  return data;
};

export const editProviders = async (formData) => {
  const { id } = formData;
  const { data } = await $authHost.put("api/providers/" + id, formData);
  return data;
};

export const deleteProviders = async (id) => {
  const { data } = await $authHost.delete("api/providers/" + id);
  return data;
};
