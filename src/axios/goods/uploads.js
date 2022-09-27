import $http from "../http.js";
const suffix = "/upload";

export default new (class {
  upload(form) {
    console.log("slideshow upload -- ", form)
    return $http.post(`${suffix}`, form);
  }
})();
