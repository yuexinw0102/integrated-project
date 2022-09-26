import $http from "./http.js";
const suffix = "/orderRouter";

export default new (class {
  search(form) {
    return $http.get(`${suffix}/getAll.do`, {
      params: form,
    });
  }

  doSearch(form) {
    return $http.get(`${suffix}/getByPage.do`, {
      params: form,
    });
  }
})();
