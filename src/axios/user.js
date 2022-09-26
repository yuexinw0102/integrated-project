import $http from './http.js';
const suffix = '/user';

export default new (class {
  search(form) {
    return $http.get(`${suffix}/getAll.do`, {
      params: form
    });
  }

  doSearch(form) {
    console.log("doSearch--", form);
    return $http.get(`${suffix}/getByPage.do`, {
      params: form
    });
  }

  find(form) {
    console.log("find--", form);
    return $http.get(`${suffix}/find.do`, {
      params: form
    });
  }

  getById(id) { 
    return $http.get(`${suffix}/getById.do`, {
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
