const BaseDao = require('./baseDao.js');
const table = 'goodsslidepic'; // 商品轮播图表

// sql命令配置
function getConfig() {
  return {
    goodsId: {
      type: '=',
      isOr: false,
    },
    slideShowUrl: {
      type: 'like',
      prefix: '%', // 前缀
      suffix: '%', // 后缀
    },
  }
}

class goodsSlidePicDao extends BaseDao { 
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }

  // 添加轮播图
  /* addSlidePic(id,goodsId, url) {
    console.log('addSlidePic goodsId, url-', id,goodsId, url)
    const sql = `insert into ${table}(id,goodsId, slideShowUrl) values(?,?,?)`
    return super.doInsertUpdateDelete(sql, [id, goodsId, url]);
  } */
  addSlidePic(bean) {
    console.log('addSlidePic bean-', bean)
    const sql = `insert into ${table} set ?`
    return super.doInsertUpdateDelete(sql, [bean]);
  }

  // 更新轮播图
  updateSlidePic(bean,goodsId) {
    console.log('updateSlidePic bean-', bean)
    delete bean[goodsId]; // 先删除存在的数据
    const sql = `update ${table} set ? where goodsId = ?`
    return super.doInsertUpdateDelete(sql, [bean, goodsId]);
  }

  // 多字段查询
  findByPage(args) {
    const bean = {
      table: ' goodsslidepic a right join goodsproduct b on a.goodsId = b.id ',
      order_by: ' b.id ASC',
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

module.exports = new goodsSlidePicDao(table, 'id');