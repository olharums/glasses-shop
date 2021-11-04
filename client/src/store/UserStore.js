import { makeAutoObservable } from "mobx";
export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._currentUser = {};
    this._allUsers = [];
    makeAutoObservable(this);
  }
  setIsAuth(bool) {
    // console.log("store2", this._currentUser);

    this._isAuth = bool;
  }
  setCurrentUser(user) {
    console.log("store", user);
    this._currentUser = user;
  }
  setAllUsers(users) {
    this._allUsers = users.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  get isAuth() {
    return this._isAuth;
  }

  get currentUser() {
    return this._currentUser;
  }
  get allUsers() {
    return this._allUsers;
  }
}
