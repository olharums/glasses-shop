import { makeAutoObservable } from "mobx";
export default class BasketStore {
  constructor() {
    this._list = [];

    makeAutoObservable(this);
  }
  setList(list) {
    this._list = list;
  }
  get list() {
    return this._list;
  }
  addItem(product) {
    let notAdded = true;
    if (this._list.length) {
      this._list.forEach((arr) => {
        if (arr.includes(product)) {
          arr[1]++;
          notAdded = false;
        }
      });
    }
    if (notAdded) this._list.push([product, 1]);
  }
  removeItem(product) {
    this._list = this._list.filter((arr) => !arr.includes(product));
  }
  minimizeQuantity(product) {
    this._list.forEach((arr) => {
      if (arr.includes(product)) {
        arr[1]--;
        return;
      }
    });
  }
  //   setTypes(types) {
  //     this._types = types;
  //   } // для каждого поля конструктора
  //   get names() {
  //     return this._types.map((type) => type.name);
  //   }
  //   get types() {
  //     return this._types;
  //   } // для каждого поля конструктора
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
  //   getFrameById(id) {
  //     return this._types.filter((type) => type.id === id)[0].name;
  //   }
}
