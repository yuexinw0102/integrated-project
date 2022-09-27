const BaseDao = require('./baseDao.js');
const table = 'admins';

class AdminDao extends BaseDao { 
  constructor(table, primaryKey) {
    super(table, primaryKey);
  }

  findByPage(args) {
    const baen = {
      
    }
  }

  login({ account, password }) {
    const bean = {
      where: 'where account = ? and password = ?',
    }
    return super.findOne(bean, [account, password])
  }
}

module.exports = new AdminDao(table, 'id')