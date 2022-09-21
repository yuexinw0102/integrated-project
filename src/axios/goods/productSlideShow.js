import $http from "../http.js";
const suffix = "/goodsslideshow";

export default new (class {
  get_all() {
    return $http.get(`${suffix}/get_all.do`);
  }
  /* getById(id) {
    console.log("getById ", id)
    return $http.get(`${suffix}/getById.do`, {
      params: { id: id }
    });
  } */
  add(form) {
    console.log("slideshow add -- ", form)
    return $http.post(`${suffix}/add.do`, form);
  }
})();
