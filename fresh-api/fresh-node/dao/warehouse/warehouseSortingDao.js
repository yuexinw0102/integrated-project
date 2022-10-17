// 商品分类列表

const BaseDao = require("../baseDao");
const table = "warehousesorting";

// sql命令配置
function getConfig() {
  return {
    id: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    // 分拣员名称
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
      table: " warehousesorting a ",
      order_by: " a.id ASC",
    };
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, " a.");
    return super.findByPage(bean, values);
  }
}

module.exports = new warehouseDao(table, "id");
