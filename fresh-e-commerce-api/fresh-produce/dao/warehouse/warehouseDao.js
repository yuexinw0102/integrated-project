// 商品分类列表

const BaseDao = require("../baseDao.js");
const table = "warehouse";

// sql命令配置
function getConfig() {
  return {
    id: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 仓库名称
    name: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 所在城市
    city: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 所在地区
    area: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 地址
    detailedAddress: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 面积
    acreage: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
  };
}

class warehouseDao extends BaseDao {
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }

  // 多字段查询
  findByPage(args) {
    const bean = {
      table: " warehouse a ",
      order_by: " a.id ASC",
    };
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, " a.");
    return super.findByPage(bean, values);
  }

  findCount(args) {
    const baen = {};
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    baen.where = this.getWhereByConfig(config);
    return super.findCount(baen, values);
  }

  communityAll(value) {
    const sql =
      "select a.warehouseId warehouseId, count(1) community from warehousecommunity a GROUP BY a.warehouseId";
    return this.queryWithPromise(sql, value);
  }
  riderAll(value) {
    const sql =
      "select a.warehouseId warehouseId, count(1) rider from warehouserider a GROUP BY a.warehouseId";
    return this.queryWithPromise(sql, value);
  }
  sortingAll(value) {
    const sql =
      "select a.warehouseId warehouseId, count(1) sorting from warehousesorting a GROUP BY a.warehouseId";
    return this.queryWithPromise(sql, value);
  }
}

module.exports = new warehouseDao(table, "id");
