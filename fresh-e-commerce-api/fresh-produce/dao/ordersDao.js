const BaseDao = require('./baseDao.js');
const table = 'orders';

// sql命令配置
function getConfig() {
  return {
    orderNumber: { // 订单编号
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    address: { // 收货地址
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    orderPay: { // 支付方式
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    // 订单状态
    payStatus: {
      type: 'in',
      isOr: false,
    },
    // 下单时间
    createTime: {
      type: 'in',
      isOr: false,
    },
    // 实付金额
    realityPrice: {
      type: 'in',
      isOr: false,
    },
    // 商品金额
    goodsPrice: {
      type: 'in',
      isOr: false,
    },
    // 商品数量
    goodsCount: {
      type: 'in',
      isOr: false,
    },
  }
}

class OrdersDao extends BaseDao { 
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }

  // 根据搜索条件查询
  find(args) {
    console.log('find args',args);
    const bean = {

    };
    let sql = "";
    if (args.minConsumeSum || args.maxConsumeSum) {
      delete args.minOrderCount;
      delete args.maxOrderCount;
      sql = `select * from order where consumeSum >= ${args.minConsumeSum} and consumeSum < ${args.maxConsumeSum}`;
    } else
    if (args.minOrderCount || args.maxOrderCount) {
      delete args.minConsumeSum;
      delete args.maxConsumeSum;
      sql = `select * from order where orderCount >= ${args.minOrderCount} and orderCount < ${args.maxOrderCount}`;
    }
    else if (args.minConsumeSum || args.maxConsumeSum && args.minOrderCount || args.maxOrderCount) {
      sql = `select * from order  where (select * from user where consumeSum >= ${args.minConsumeSum} and consumeSum < ${args.maxConsumeSum}) and (select * from user where orderCount between ${args.minOrderCount} and ${args.maxOrderCount})`;
    }
    // if (args.hasOwnProperty("minConsumeSum") || args.hasOwnProperty("maxOrderCount")) {
    //   sql = `select * from order where consumeSum between minConsumeSum and maxOrderCount`;
    // }
    return super.queryWithPromise(sql);
  }

  // 查询用户是否交易
  findIsDeal(args) { 
    const sql = `select * from order where orderCount`
  }

  // 多字段查询
  findByPage(args) {
    const bean = {
      table: ' orders a  ',
      order_by: ' a.orderId ASC',
    }
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, ' a.');
    return super.findByPage(bean, values);
  }

  findCount(args) {
    const bean = {};
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config);
    return super.findCount(bean, values);
  }
}

module.exports = new OrdersDao(table, 'orderId');