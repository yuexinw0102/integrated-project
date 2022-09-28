const BaseDao = require('./baseDao.js');
const table = 'goodsslideshow'; // 商品轮播图表

// sql命令配置
function getConfig() {
  return {
    id: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    title: {
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

class goodsSlideShowDao extends BaseDao { 
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }

  // 多字段查询
  findByPage(args) {
    const bean = {
      table: ' goodsslideshow a right join goodsproduct b on a.product_id = b.classify_id ',
      order_by: ' b.classify_id ASC',
    }
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, ' b.');
    return super.findByPage(bean, values);
  }

  findCount(args) {
    const baen = {};
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    baen.where = this.getWhereByConfig(config);
    return super.findCount(baen, values);
  }
}

module.exports = new goodsSlideShowDao(table, 'id');