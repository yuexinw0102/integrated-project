const BaseDao = require('./baseDao.js');
const table = 'user';

// sql命令配置
function getConfig() {
  return {
    userId: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    account: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    userTel: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    // 注册时间
    createTime: {
      type: 'in',
      isOr: false,
    },
    // 最近登录时间
    updateTime: {
      type: 'in',
      isOr: false,
    },
    // 消费金额
    consumeSum: {
      type: 'in',
      isOr: false,
    },
    // 订单数量
    orderCount: {
      type: 'in',
      isOr: false,
    },
  }
}

class userDao extends BaseDao { 
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
      sql = `select * from user where consumeSum >= ${args.minConsumeSum} and consumeSum < ${args.maxConsumeSum}`;
    } else
    if (args.minOrderCount || args.maxOrderCount) {
      delete args.minConsumeSum;
      delete args.maxConsumeSum;
      sql = `select * from user where orderCount >= ${args.minOrderCount} and orderCount < ${args.maxOrderCount}`;
    }
    else if (args.minConsumeSum || args.maxConsumeSum && args.minOrderCount || args.maxOrderCount) {
      sql = `select * from user  where (select * from user where consumeSum >= ${args.minConsumeSum} and consumeSum < ${args.maxConsumeSum}) and (select * from user where orderCount between ${args.minOrderCount} and ${args.maxOrderCount})`;
    }
    // if (args.hasOwnProperty("minConsumeSum") || args.hasOwnProperty("maxOrderCount")) {
    //   sql = `select * from user where consumeSum between minConsumeSum and maxOrderCount`;
    // }
    return super.queryWithPromise(sql);
  }

  // 查询用户是否交易
  findIsDeal(args) { 
    const sql = `select * from user where orderCount`
  }

  // 多字段查询
  findByPage(args) {
    const bean = {
      table: ' user a  ',
      order_by: ' a.userId ASC',
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

module.exports = new userDao(table, 'userId');