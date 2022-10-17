// 商品分类列表

const BaseDao = require("../baseDao");
const table = "warehouserider";

// sql命令配置
function getConfig() {
  return {
    id: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 骑手名称
    name: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },

    warehouseId: {
      type: "=",
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
      table: " warehouserider a ",
      order_by: " a.id ASC",
    };
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, " a.");
    return super.findByPage(bean, values);
  }
}

module.exports = new warehouseDao(table, "id");
