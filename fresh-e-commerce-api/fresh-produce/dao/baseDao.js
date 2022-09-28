const pool = require('./dbConncet.js');
// const pager = require('../utils/pager_helper.js');

class BaseDao {
  constructor(table, primaryKey) {
    this.table = table;
    this.primaryKey = primaryKey;
  }

  queryWithPromise(sql, value = []) {
    return new Promise(function (resolve, reject) { 
      const queryObj = pool.query(sql, value, (err, result) => { 
        if (err) reject(err); // 抛出错误
        console.log("当前正在执行的SQL命令：", queryObj.sql);
        console.log("查询结果：", result);
        resolve(result);
      });
    })
  }

  // 增改删, 传入sql命令，占位符对应数据value
  doInsertUpdateDelete(sql, value) { 
    return this.queryWithPromise(sql, value).then(function (result) {
      return Promise.resolve({
        result: result.affectedRows, 
        insertId: result.insertId
      }).catch(err => {
        return Promise.reject(err);
      });
    })
  }


  // 传入查询对象bean
  insert(bean) {
    const sql = `insert into ${this.table} set ?`; // 拼接sql命令
    return this.doInsertUpdateDelete(sql, [bean]);
  }

  // 根据主键删除数据
  deleteByPrimaryKey(...primaryKeyValue) {
    const sql = `delete from ${this.table} where ${this.primaryKey} in (?)`;
    return this.doInsertUpdateDelete(sql, primaryKeyValue);
  }

/*   // 解除外键关联
  Disassociation() {
    console.log("解除外键关联")
    return `SET foreign_key_checks = 0 `;
  }
  
  // 重新关联外键
  Reassociation() {
    console.log("重新关联外键")
    return `SET foreign_key_checks = 1 `;
  } */

  // 根据主键修改数据, 传入修改对象bean,主键
  updateByPrimaryKey(bean, primaryKeyValue) {
    console.log("update bean primaryKeyValue" , bean , primaryKeyValue)
    delete bean[this.primaryKey]; // 先删除存在的主键
    const sql = `update ${this.table} set ? where ${this.primaryKey} = ?`;
    return this.doInsertUpdateDelete(sql, [bean, primaryKeyValue]);
  }

  // 查询单表或者多表
  findOne({ columns, where, table } = {}, value) {
    const sql =
      `select ${columns ? columns : ' * '} 
      from ${table ? table : this.table} 
      ${where ? where : ''} 
      limit 0, 1
      `;
    return this.queryWithPromise(sql, value).then(function (result) {
      return Promise.resolve(result.length > 0 ? result[0] : null);
    }).catch(err => Promise.reject(err));
  }

  // 根据主键查询
  findByPrimaryKey(primaryKeyValue, columns) {
    const bean = {
      columns: columns,
      where: ` where ${this.primaryKey} = ?`
    };
    return this.findOne(bean, [primaryKeyValue]);
  } 

  // 根据分页条件查询
  findByPage({ columns, where, table, group_by, having, order_by } = {}, value) {
    const sql =
      `select ${columns ? columns : ' * '}
      from ${table ? table : this.table} 
      ${where ? where : ''} 
      ${group_by ? group_by : ''} 
      ${having ? having : ''}
      ${order_by ? 'order by' + order_by : 'order by ' + this.primaryKey} 
      `;
    return this.queryWithPromise(sql, value);
  }

      // limit ${pager.start}, ${pager.pageSize}
  // 查询总数
  findCount({ where, table }, value) {
    const sql =
      `select count(*) total 
      from ${table ? table : this.table} 
      ${where ? where : ''}
      `;
    return this.queryWithPromise(sql, value).then(result => {
      return Promise.resolve(result.length > 0 ? result[0] : null);
    }).catch(err => Promise.reject(err));
  }

  // 查询所有数据
  findAll({ columns, where, table, order_by } = {}, value) {
    const sql =
      `select ${columns ? columns : ' * '} 
      from ${table ? table : this.table} 
      ${where ? where : ''} 
      ${order_by ? 'order by' + order_by : 'order by ' + this.primaryKey}
      `;
    return this.queryWithPromise(sql, value);
  }

  // 检测当前表的指定字段值是否存在
  checkExist(column, value, primaryKeyValue = 0) {
    const sql =
      `select ${column} 
      from ${this.table} 
      where ${column} = ? and ${this.primaryKey} != ?
      `;
    return this.queryWithPromise(sql, [value, primaryKeyValue])
      .then(result => Promise.resolve(result.length > 0))
      .catch(err => Promise.reject(err));
  }

  // 通过配置是否获取where（多表）
  // config: SQL命令配置 alias: 别名
  getWhereByConfig(config, alias = '') {
    let where = '';
    let index = 0;
    for (const key in config) { 
      const item = config[key];
      const type = item['type'];
      const isOr = item['isOr'];

      if (index > 0) {
        where += isOr ? ' or ' : 'and';
      } else {
        where += ' where ';
      }
      where += `${alias}${key} ${type} ? `;
      index++;
    }
    return where;
   }
  
  bindWhereConfigValue(args, config) {
    const values = [];
    for (const key in config) {
      const value = args[key];
      if (!value) {
        delete config[key];
      } else {
        if (!args.hasOwnProperty(key)) { 
          continue;
        }
        const item = config[key];
        item.value = (item.prefix ? item.prefix : '') + value + (item.suffix ? item.suffix : '');
        values.push(item.value);
      }
    }
    return values;
  }
  

}

module.exports = BaseDao;