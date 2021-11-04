import { makeAutoObservable } from "mobx";
export default class FrameStore {
  constructor() {
    this._types = [
      // {
      //   id: "1",
      //   name: "cat",
      // },
      // {
      //   id: "2",
      //   name: "dog",
      // },
    ];
    this._selectedTypes = this._types.map((t) => t.id);

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  } // для каждого поля конструктора
  get names() {
    return this._types.map((type) => type.name);
  }
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
  getFrameById(id) {
    return this._types.filter((type) => type.id === id)[0].name;
  }
}
