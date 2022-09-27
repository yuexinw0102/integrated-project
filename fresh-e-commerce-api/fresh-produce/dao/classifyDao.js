// 商品分类列表

const BaseDao = require('./baseDao.js');
const table = 'classify';

// sql命令配置
function getConfig() {
  return {
    id: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    // // 商品名称
    // title: {
    //   type: 'like',
    //   prefix: '%', // 前缀
    //   suffix: '%', // 后缀
    // },
    // 分类名称
    classifyName: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    // 层级
    tier: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
    // 所属上级
    superior: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
  }
}

class ClassifyDao extends BaseDao { 
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }



  // 多字段查询
  findByPage(args) {
    const bean = {
      table: ' classify a ',
      // table: ' classify a left join goodsproduct b on a.id = b.classify_id ',
      order_by: ' a.id ASC',
    }
    let config = getConfig();
    let values = this.bindWhereConfigValue(args, config);
    bean.where = this.getWhereByConfig(config, ' a.');
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

module.exports = new ClassifyDao(table, 'id');