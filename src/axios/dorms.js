import $http from "./http.js";
const suffix = "/dorms";

export default new (class {
  get_all() {
    return $http.get(`${suffix}/get_all.do`);
  }
})();
