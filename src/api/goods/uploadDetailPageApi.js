// 上传商品详情页图API uploadDetailPageApi

// 上传附件
export function uploadDetailPage(data) {
  return request({
    url: '/goods/product/detailPageAvater',
    method: 'post',
    data:data
  })
}

// 保存上传商品详情页图
export function addDetailPage(data) {
  return request({
    url: '/goods/product/addDetailPage',
    method: 'post',
    data: data
  })
}

// 预览详情页图
export function previewDetailPage(data) {
  return request({
    url: '/goods/product/previewDetailPage',
    method: 'get',
    data: data
  })
}