import $http from "./http.js";

export default new (class {
  /**
   * 根据用户类型获取所有菜单
   * @returns
   */
  get_menus(type) {
    console.log("get_menus type", type);
    return $http.get("/menus/get_by_type.do", {
      params: {
        type: type,
      },
    });
  }
})();
