import { makeAutoObservable } from "mobx";
export default class OrderStore {
  constructor() {
    // this._types = [
    //   {
    //     id: "1",
    //     name: "cat",
    //   },
    //   {
    //     id: "2",
    //     name: "dog",
    //   },
    // ];
    // this._selectedTypes = this._types.map((t) => t.id);

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types.sort((a, b) => (a.id > b.id ? 1 : -1));
  } // для каждого поля конструктора
  //   get names() {
  //     return this._types.map((type) => type.name);
  //   }
  get types() {
    return this._types;
  } // для каждого поля конструктора
  //   addSelectedType(id) {
  //     this._selectedTypes[this._selectedTypes.length] = id;
  //   } // для каждого поля конструктора
  //   removeSelectedType(id) {
  //     // this._selectedTypes.map((elem) => console.log("id", id));
  //     this._selectedTypes = this._selectedTypes.filter((elem) => elem !== id);
  //   }

  //   get selectedTypes() {
  //     return this._selectedTypes;
  //   }
}
