import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";
export const createAccessories = async (formData) => {
  const { data } = await $authHost.post("api/accessories", formData);
  return data;
};

export const editAccessories = async (formData) => {
  const { id } = formData;
  const { data } = await $authHost.put("api/accessories/" + id, formData); // id ?
  return data;
};

export const fetchAccessories = async () => {
  const { data } = await $host.get("api/accessories");

  return data;
};

export const fetchOneAccessories = async (id) => {
  const { data } = await $host.get("api/accessories/" + id);
  return data;
};

export const deleteAccessories = async (id) => {
  const { data } = await $authHost.delete("api/accessories/" + id);
  return data;
};

export const createGlasses = async (formData) => {
  const { data } = await $authHost.post("api/glasses", formData);
  return data;
};
export const fetchGlasses = async () => {
  const { data } = await $host.get("api/glasses");

  return data;
};

export const fetchOneGlasses = async (id) => {
  const { data } = await $host.get("api/glasses/" + id);
  return data;
};

export const createLenses = async (formData) => {
  const { data } = await $authHost.post("api/lenses", formData);
  return data;
};

export const fetchLenses = async () => {
  const { data } = await $host.get("api/lenses");

  return data;
};

export const editLenses = async (formData) => {
  const { id } = formData;
  const { data } = await $authHost.put("api/lenses/" + id, formData);
  return data;
};

export const deleteLenses = async (id) => {
  const { data } = await $authHost.delete("api/lenses/" + id);
  return data;
};

export const fetchOneLenses = async (id) => {
  const { data } = await $host.get("api/lenses/" + id);
  return data;
};

export const fetchFrames = async () => {
  const { data } = await $host.get("api/frames");

  return data;
};

export const createFrames = async (formData) => {
  const { data } = await $authHost.post("api/frames", formData);
  return data;
};

export const editFrames = async (formData) => {
  const { id } = formData;
  const { data } = await $authHost.put("api/frames/" + id, formData);
  return data;
};

export const deleteFrames = async (id) => {
  const { data } = await $authHost.delete("api/frames/" + id);
  return data;
};

export const editGlasses = async (formData) => {
  const { id } = formData;
  const { data } = await $authHost.put("api/glasses/" + id, formData);
  return data;
};

export const deleteGlasses = async (id) => {
  const { data } = await $authHost.delete("api/glasses/" + id);
  return data;
};
