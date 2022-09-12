import $http from '../http.js';
const suffix = '/goodsProduct';

export default new (class {
  search(form) {
    return $http.get(`${suffix}/getAll.do`, {
      params: form
    });
  }

  getById(id) { 
    return $http.get(`${suffix}/getById`, {
      params: {id: id}
    });
  }

  edit(form) {
    console.log("edit--", form);
    return $http.post(`${suffix}/edit.do`, form)
  }

  add(form) {
    console.log("add--", form);
    return $http.post(`${suffix}/add.do`, form)
  }

  deleteById(ids) { 
    return $http.get(`${suffix}/deleteById.do`, {
      params: {
        ids: ids,
      }
    })
  }
})()
