import { makeAutoObservable } from "mobx";
export default class ColorStore {
  constructor() {
    this._types = [
      {
        id: "1",
        name: "black",
      },
      {
        id: "2",
        name: "yellow",
      },
    ];
    this._selectedTypes = this._types.map((t) => t.id);

    makeAutoObservable(this);
  }

  setType(types) {
    this._types = types;
  } // для каждого поля конструктора

  get types() {
    return this._types;
  } // для каждого поля конструктора
  addSelectedType(id) {
    this._selectedTypes[this._selectedTypes.length] = id;
  } // для каждого поля конструктора
  removeSelectedType(id) {
    // this._selectedTypes.map((elem) => console.log("id", id));
    this._selectedTypes = this._selectedTypes.filter((elem) => elem !== id);
  }

  get selectedTypes() {
    return this._selectedTypes;
  }
}
