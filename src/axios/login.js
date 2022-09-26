import $http from "./http.js";

export default new (class {
  login(form) {
    return $http.post("/login.do", form);
  }
  logout() { }
})();
