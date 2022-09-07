const Mock = require("mockjs");
// 获取 mock.Random 对象
const Random = Mock.Random;
Mock.mock("/warehouse", (req, res) => {
  let list = [];
  for (let i = 0; i < 30; i++) {
    let listObject = {
      name : Random.cname(),
      city :Random.city(),
      area : Random.county(),
      acreage : Random.integer(100,500),
    };
    list.push(listObject);
  }
  return {
    data: list,
  };
});
