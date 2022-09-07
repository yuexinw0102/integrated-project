import Mock from 'mockjs';
const Random = Mock.Random; // 获取Mock的Random对象

const goodsTitles = ['港供基地上海青苗', '水果玉米', '贝贝南瓜', '汉源车厘子','乐事青柠味薯片'];

Mock.mock('/product_list', (req, res) => {
  let list = [];
  let datas = Mock.mock({
    "GoodsInfo|10": [{
      'id|+1': 20220001,
      'title|1': goodsTitles,
      'variety|1': goodsTitles,
      'store|1': ['冷藏', '常温', '冷冻'],
      'weight|1': '@integer(100,500)' + 'g',
      'classify|1': ['蔬菜', '水果', '零食'],
      "isRecommend|1": ['是', '否'],
      'originalPrice|10-12.2': 0,
      'nowPrice|6-8.2': 0,
      'state|1': ['已上架', '待上架', '已下架'],
    }]
  })
  list.push(datas)
  return {
    data: list
  }
})
