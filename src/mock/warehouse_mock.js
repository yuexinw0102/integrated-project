const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;
let data = Mock.mock("/warehouse", {
  "data|200": [
    {
      "id|+1":1,
      "name": "@ctitle(3)",
      "city": {
        "key|+1": 1,
        "val": "@city",
      },
      "area": {
        "key|+1": 1,
        "val": "@county()",
      },
      "detailed_address": "@csentence(10)",
      "acreage": "@integer(100, 500)",
      "community|2-4": [{
        "name": "@cword(3)",
        "address": "苏州市新区某某街道花园小区",
      }],
      "rider|2-4": [{
        "name": "@cname()",
        "phone": /1[3-9]\d{9}/,
        "state":1
      }],
      "sorting|2-4": [{
        "name": "@cname()",
        "phone": /1[3-9]\d{9}/,
        "state":1
      }],
      state:1
    },
  ],
});
module.exports = function (app) {
  app.use((req, res) => {
    res.json(data);
  });
};
