const BaseDao = require('./baseDao.js');
const table = 'goodsproduct';

// sql命令配置
function getConfig() {
  return {
    classify_id: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    title: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    category: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    variety: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    // 商品状态
    state: {
      type: '=',
      isOr: false,
    },
    // 储存条件
    store: {
      type: '=',
      isOr: false,
    },
    weight: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    classify: {
      type: '=',
      isOr: false,
    },
    nowPrice: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    originalPrice: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
  }
}

class GoodsProductDao extends BaseDao {
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }

  // 根据搜索条件查询
  find(args) {
    console.log('find args', args);
    const bean = {

    };
    let sql = "";
    if (args.nowPrice1 || args.nowPrice2) {
      delete args.originalPrice1;
      delete args.originalPrice2;
      sql = `select * from goodsproduct where nowPrice >= ${args.nowPrice1} and nowPrice < ${args.nowPrice2}`;
    } else if (args.originalPrice1 || args.originalPrice2) {
      delete args.nowPrice1;
      delete args.nowPrice2;
      sql = `select * from goodsproduct where originalPrice >= ${args.originalPrice1} and originalPrice < ${args.originalPrice2}`;
    } else if (args.nowPrice1 || args.nowPrice2 && args.originalPrice1 || args.originalPrice2) {
      sql = `select * from goodsproduct  where (select * from goodsproduct where nowPrice >= ${args.nowPrice1} and nowPrice < ${args.nowPrice2}) and (select * from goodsproduct where originalPrice between ${args.originalPrice1} and ${args.originalPrice2})`;
    }
    // if (args.hasOwnProperty("nowPrice1") || args.hasOwnProperty("originalPrice2")) {
    //   sql = `select * from order where nowPrice between nowPrice1 and originalPrice2`;
    // }
    return super.queryWithPromise(sql);
  }


  // 多字段查询
  findByPage(args) {
    const bean = {
      table: ' classify a right join goodsproduct b on a.id = b.classify_id ',
      order_by: ' b.classify_id ASC',
    }
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, ' b.');
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

module.exports = new GoodsProductDao(table, 'id');