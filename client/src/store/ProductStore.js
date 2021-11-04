import { makeAutoObservable } from "mobx";
export default class ProductStore {
  constructor() {
    this._glasses = [];
    this._frames = [];
    this._lenses = [];
    this._accessories = [];
    this._selectedProducts = [];
    this._displayedProducts = [];

    makeAutoObservable(this);
  }
  setAccessories(accessories) {
    for (let elem in accessories) {
      accessories[elem] = { ...accessories[elem], type: "accessories" };
    }

    this._accessories = accessories.sort((a, b) => (a.id > b.id ? 1 : -1));
    if (!this._selectedProducts.includes("accessories")) {
      this._selectedProducts.push("accessories");
    } else {
      this._displayedProducts = this._displayedProducts.filter(
        (item) => item.type !== "accessories"
      );
    }
    this._displayedProducts.push(...this._accessories);
  } // для каждого поля конструктора

  get accessories() {
    return this._accessories;
  }

  getAccessoriesById(id) {
    return this._accessories.filter((accessories) => accessories.id === id)[0];
    // return filtered ? filtered.name : "No accessories";
  }

  setGlasses(glasses) {
    for (let elem in glasses) {
      glasses[elem] = { ...glasses[elem], type: "glasses" };
    }
    this._glasses = glasses;
    if (!this._selectedProducts.includes("glasses")) {
      this._selectedProducts.push("glasses");
    } else {
      this._displayedProducts = this._displayedProducts.filter(
        (item) => item.type !== "glasses"
      );
    }
    this._displayedProducts.push(...this._glasses);
  }

  get glasses() {
    return this._glasses;
  }

  getGlassesById(id) {
    return this._glasses.filter((glasses) => glasses.id === id)[0];
    // return filtered ? filtered.name : "No glasses";
  }

  setLenses(lenses) {
    for (let elem in lenses) {
      lenses[elem] = { ...lenses[elem], type: "lenses" };
    }
    this._lenses = lenses;
    if (!this._selectedProducts.includes("lenses")) {
      this._selectedProducts.push("lenses");
    } else {
      this._displayedProducts = this._displayedProducts.filter(
        (item) => item.type !== "lenses"
      );
    }
    this._displayedProducts.push(...this._lenses);
  }

  get lenses() {
    return this._lenses;
  }

  getLensesById(id) {
    return this._lenses.filter((lenses) => lenses.id === id)[0];
    // return filtered ? filtered.name : "No lenses";
  }

  addSelectedProducts(name) {
    this._selectedProducts.push(name);
    if (name === "glasses") this._displayedProducts.push(...this._glasses);
    else if (name === "lenses") this._displayedProducts.push(...this._lenses);
    else this._displayedProducts.push(...this._accessories);
  } // для каждого поля конструктора
  removeSelectedProducts(name) {
    this._selectedProducts = this._selectedProducts.filter(
      (elem) => elem !== name
    );
    this._displayedProducts = this._displayedProducts.filter(
      (item) => item.type !== name
    );
  }

  get displayedProducts() {
    return this._displayedProducts;
  }
  get selectedProducts() {
    return this._selectedProducts;
  }
}
