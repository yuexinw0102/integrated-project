const BaseDao = require("./baseDao.js");
const table = "orderlist";

// sql命令配置
function getConfig() {
  return {
    //订单编号
    id: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    //下单时间
    time: {
      type: "=",
    },
    //订单状态
    orderState: {
      type: "=",
    },
    //分拣状态
    sortingState: {
      type: "=",
    },
    //配送状态
    riderState: {
      type: "=",
    },
    //支付方式
    payment: {
      type: "=",
    },
    //实付金额
    amountPaid: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    //商品金额
    money: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    //商品数量
    quantity: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    //分拣时长
    sortingTime: {
      type: "like",
      prefix: "%", // 前缀
      suffix: "%", // 后缀
    },
    //配送时长
    riderTime: {
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
      table: "orderlist a",
      order_by: " a.id ASC",
    };
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, "a.");
    return super.findByPage(bean, values);
  }
}

module.exports = new warehouseDao(table, "id");
