import { makeAutoObservable } from "mobx";
export default class ProviderStore {
  constructor() {
    this._types = [
      // {
      //   id: "1",
      //   name: "pro1",
      // },
      // {
      //   id: "2",
      //   name: "prov2",
      // },
    ];
    this._selectedProvider = "";

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types.sort((a, b) => (a.id > b.id ? 1 : -1));
  } // для каждого поля конструктора

  get types() {
    return this._types;
  } // для каждого поля конструктора
  get names() {
    return this._types.map((type) => type.name);
  }
  getProviderById(id) {
    const filtered = this._types.filter((type) => type.id === id)[0];
    return filtered ? filtered.name : "No provider";
  }
  setSelectedProvider(provider) {
    this._selectedProvider = provider;
    // console.log("sel", this._selectedProvider);
  }
  get selectedProvider() {
    return this._selectedProvider;
  }
}
