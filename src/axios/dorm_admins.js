import $http from "./http.js";
const suffix = "/dorm_admins";

export default new (class {
  search(form) {
    const args = Object.assign({}, form);
    if (args.gender == -1) delete args.gender;
    if (args.dorm_id == -1) delete args.dorm_id;
    return $http.get(`${suffix}/get_by_page.do`, {
      params: args,
    });
  }
  get_by_id(id) {
    return $http.get(`${suffix}/get_by_id.do`, {
      params: {
        id: id
      },
    })
  }
  update_save(form) {
    return $http.post(`${suffix}/update_save.do`, form)
  }
  add_save(form) {
    return $http.post(`${suffix}/add_save.do`, form)
  }
})();
