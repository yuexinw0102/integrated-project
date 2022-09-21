// 上传商品轮播图API uploadSlideShowApi
// 上传附件
export function uploadSlideShow(data) {
  return request({
    url: '/goods/product/slideShowAvater',
    method: 'post',
    data:data
  })
}

// 保存上传商品轮播图
export function addSlideShow(data) {
  return request({
    url: '/goods/product/addSlideShow',
    method: 'post',
    data: data
  })
}

// 预览轮播图
export function previewSlideShow(data) {
  return request({
    url: '/goods/product/previewSlideShow',
    method: 'get',
    data: data
  })
}