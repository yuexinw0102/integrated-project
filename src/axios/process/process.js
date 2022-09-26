import $http from "./index.js";

export default new (class { 
  get(val) {
    return $http.get(val);
  }
})()