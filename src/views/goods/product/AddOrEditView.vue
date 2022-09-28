<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/product_list' }">商品管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/product_list' }">商品列表</el-breadcrumb-item>
          <el-breadcrumb-item>商品详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品标题">
        <el-input size="small" v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品分类">
            <el-col :span="12">
              <el-select
                size="small"
                v-model="form.classify"
                placeholder="请选择商品类别"
              >
                <el-option label="新鲜蔬果" value="新鲜蔬果"></el-option>
                <el-option label="休闲零食" value="休闲零食"></el-option>
                <el-option label="肉禽蛋" value="肉禽蛋"></el-option>
                <el-option label="酒水乳饮" value="酒水乳饮"></el-option>
                <el-option label="粮油调味" value="粮油调味"></el-option>
                <el-option label="品牌家电" value="品牌家电"></el-option>
                <el-option label="美妆个护" value="美妆个护"></el-option>
                <el-option label="个人百货" value="个人百货"></el-option>
              </el-select>
            </el-col>

            <el-col :span="12">
              <el-select
                size="small"
                v-model="form.category"
                placeholder="请选择商品类别"
              >
                <el-option label="蔬菜" value="蔬菜"></el-option>
                <el-option label="水果" value="水果"></el-option>
                <el-option label="肉类" value="肉类"></el-option>
                <el-option label="蛋类" value="蛋类"></el-option>
                <el-option label="家禽类" value="家禽类"></el-option>
                <el-option label="零食" value="零食"></el-option>
                <el-option label="酒" value="酒类"></el-option>
                <el-option label="饮品" value="饮品"></el-option>
                <el-option label="矿泉水" value="矿泉水"></el-option>
                <el-option label="食用油" value="食用油"></el-option>
                <el-option label="调味品" value="调味品"></el-option>
                <el-option label="小家电" value="小家电"></el-option>
                <el-option label="手机" value="手机"></el-option>
                <el-option label="大家电" value="大家电"></el-option>
                <el-option label="服饰" value="服饰"></el-option>
                <el-option label="化妆品" value="化妆品"></el-option>
                <el-option label="纸巾" value="纸巾"></el-option>
                <el-option label="百货" value="百货"></el-option>
              </el-select>
            </el-col> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="商品品种">
            <el-input
              size="small"
              v-model="form.title"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品规格">
            <el-col :span="12">
              <el-input size="small" v-model="form.weight"></el-input>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-select size="small" v-model="form.unit" placeholder="g">
                <el-option label="g" value="g"></el-option>
                <el-option label="kg" value="kg"></el-option>
              </el-select>
            </el-col> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="储存条件">
            <el-select size="small" v-model="form.store" placeholder="冷藏">
              <el-option label="冷藏" value="冷藏"></el-option>
              <el-option label="常温" value="常温"></el-option>
              <el-option label="冷冻" value="冷冻"></el-option>
            </el-select> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="商品现价">
            <el-input
              size="small"
              v-model="form.nowPrice"
            ></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="商品原价">
            <el-input
              size="small"
              v-model="form.originalPrice"
            ></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form-item label="是否推荐">
            <el-select size="small" v-model="form.isRecommend" placeholder="是">
              <el-option label="是" value="是"></el-option>
              <el-option
                label="否"
                value="否"
              ></el-option> </el-select></el-form-item
        ></el-col>
        <el-col :span="20">
          <el-form-item label="推荐理由">
            <el-input
              size="small"
              v-model="form.recommendResult"
              placeholder="以逗号隔开，最多3个"
            ></el-input
          ></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="商品轮播">
            <el-upload
              list-type="picture-card"
              class="avatar-uploader"
              action="http://localhost:3000/upload"
              :on-success="handleSShowSuccess"
              :before-upload="beforeSlideShowUpload"
              :headers="headersObj"
              :limit="1"
            >
              <i class="el-icon-plus"></i>

              <template #tip>
                <div style="font-size: 12px; color: #919191">
                  只能上传.jpg/png文件，且不超过2M
                </div>
              </template>
            </el-upload>
            <el-dialog
              v-if="goodsSlideShow.slideShowUrl"
              :visible.sync="goodsSlideShow.dialogVisible"
            >
              <img width="100%" :src="form.slideShowUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="详情页图">
            <el-upload
              action="http://localhost:3000/upload"
              list-type="picture-card"
              :on-success="handleDetailSuccess"
              :before-upload="beforeSlideShowUpload"
              :headers="headersObj"
              :limit="1"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handleDetailPagePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!goodsDetailPage.disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDetailPageDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!goodsDetailPage.disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDetailPageRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
              <template #tip>
                <div style="font-size: 12px; color: #919191">
                  只能上传.jpg/png文件，且不超过2M
                </div>
              </template>
            </el-upload>
            <el-dialog
              v-if="goodsDetailPage"
              :visible.sync="goodsDetailPage.dialogVisible"
            >
              <img width="100%" :src="goodsDetailPage.slideShowUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        ><el-form-item label="限时抢购">
          <el-switch v-model="form.isFlashSale"></el-switch
        ></el-form-item>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="抢购价格">
            <el-input
              size="small"
              v-model="form.flashSalePrice"
              placeholder="请输入金额"
            ></el-input
          ></el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="抢购时间">
            <el-col :span="11">
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="form.startDate"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center"
              >至</el-col
            >
            <el-col :span="11">
              <el-date-picker
                size="small"
                type="date"
                placeholder="选择日期"
                v-model="form.endDate"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        ><el-form-item label="绿卡优惠">
          <el-switch v-model="form.isGreenDiscounts"></el-switch
        ></el-form-item>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="绿卡价格">
            <el-input
              size="small"
              v-model="form.greenPrice"
              placeholder="请输入金额"
            ></el-input
          ></el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-button size="small" @click="cancelForm">返回</el-button>
        <el-button
          size="small"
          type="primary"
          :loading="loading"
          @click="handleSubmit"
          >{{ loading ? "提交中 ..." : "保存资料" }}</el-button
        >
        <el-button size="small" type="primary" v-if="editIndex"
          >商品下架</el-button
        >
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  //@click="handleSubmit"
  import product from "@/axios/goods/product";
  import uploads from "@/axios/goods/uploads";
  import slidePic from "@/axios/goods/slidePic";
  // import { mapMutations, mapState } from "vuex";
  // import { NAMES } from "@/store"; // 取出token

  export default {
    name: "ProductAddOrEdit",
    created() {
      console.log("headersObj", this.headersObj);
      product
        .search()
        .then(({ data }) => {
          // console.log("search data", data);
          this.list = data.data;
          let id_list = [];
          this.list.forEach((item) => {
            item.id = parseInt(item.id);
            id_list.push(item.id);
          });
          this.maxId = Math.max(...id_list); // 获取最大id值
          this.editIndex = this.$route.query.id;
          if (this.editIndex) {
            // console.log("id", this.editIndex);
            product
              .getById(this.editIndex)
              .then(({ data }) => {
                // console.log("getById data", data);
                this.form = data.data;
                // console.log("getById this.form--", this.form);
              })
              .catch((err) => {
                console.log("getById err", err);
                return this.$message.error(
                  `请求 ID：${this.editIndex} 数据失败！`
                );
              });
          }
        })
        .catch((err) => {
          console.log("search err", err);
          return this.$message.error("请求所有数据失败！");
        });

      slidePic.search().then(({ data }) => {
        let id_list = [];
        console.log("search data", data);
        data.data.forEach(item => {
            item.id = parseInt(item.id);
          id_list.push(item.id);
        })
        this.goodsSlideShow.id = Math.max(...id_list); // 获取最大id值
       })
    },
    props: {
      id: {
        type: [Number, String],
      },
    },
    data() {
      return {
        editIndex: this.id,
        list: [],
        maxId: 0,
        form: {
          id: "",
          title: "",
          desc: "", // 商品描述
          state: "",
          store: "",
          category: "", // 商品类别
          variety: "", // 商品品种
          weight: "",
          unit: "",
          isRecommend: "",
          recommendResult: "", // 推荐理由
          classify: "",
          nowPrice: "",
          originalPrice: "",
          isFlashSale: "", // 限时抢购
          flashSalePrice: "", // 抢购价格
          startDate: "", // 开始抢购时间
          endDate: "", // 结束抢购时间
          isGreenDiscounts: "", // 绿卡优惠
          greenPrice: "", // 绿卡价格
        },
        // 设置请求头存放token
        headersObj: {
          Authorization: JSON.parse(sessionStorage.getItem("token")),
        },
        // 存放商品轮播图
        goodsSlideShow: {
          id: 0,
          goodsId: "",
          slideShowUrl: [], // 存放商品轮播图url
          dialogVisible: false,
          disabled: false,
        },
        //   存放商品详情页图
        goodsDetailPage: {
          goodsId: "",
          detailPageImgUrl: [], // 存放商品详情页图url
          dialogVisible: false,
          disabled: false,
        },
        loading: false,
        timer: null,
      };
    },
    // computed: {
    //   ...mapState([NAMES.token]),
    // },
    methods: {
      handleSubmit(done) {
        console.log("add form--", this.form);
        this.$confirm("确定要提交吗？")
          .then((_) => {
            this.loading = true;
            this.timer = setTimeout(() => {
              //   done();
              setTimeout(() => {
                this.loading = false;
                if (this.editIndex) {
                  // console.log("this.form--", this.form);
                  product.edit(this.form).then(({ data }) => {
                    console.log("edit data--", data);
                    // alert(data.message);
                    if (data.status == "success") {
                      this.$message({
                        message: data.message,
                        type: "success",
                      });
                    } else {
                      this.$message.error(data.err.sqlMessage);
                    }
                  });
                } else {
                  this.form.id = parseInt(this.maxId) + 1;
                  let id = this.form.id;
                  console.log("add form--", this.form);
                  product.add(this.form).then(({ data }) => {
                    /* uploads
                      .upload(this.form.slideShowUrl)
                      .then(({ data }) => {
                        console.log("upload data--", data);
                      }); */

                    console.log("add data--", data);
                    // alert(data.message);
                    if (data.status == "success") {
                      this.$message({
                        message: data.message,
                        type: "success",
                      });
                      // 上传轮播图
                      this.goodsSlideShow.goodsId = id; // 商品id值
                      this.goodsSlideShow.id += 1; // 主键id
                      delete this.goodsSlideShow.dialogVisible;
                      delete this.goodsSlideShow.disabled;
                      slidePic
                        .addSlidePic(this.goodsSlideShow)
                        .then(({ data }) => {
                          console.log(
                            "slidePic this.goodsSlideShow-",
                            this.goodsSlideShow
                          );
                          console.log("addSlidePic data-", data);
                          if (data.status == "success") {
                            this.$message({
                              message: data.message,
                              type: "success",
                            });
                          } else {
                            this.$message.error(data.message);
                          }
                        }).catch(err => this.$message.error("商品轮播图上传失败"));
                    } else {
                      this.$message.error(data.message);
                    }
                  });
                }
                this.$router.back(); // 编辑之后回退页面
              }, 400);
            }, 2000);
          })
          .catch((_) => {});
      },
      //   返回按钮
      cancelForm() {
        this.loading = false;
        clearTimeout(this.timer);
        this.$router.back();
      },

      // 上传图片
      /* handleUploadImg(data) {
        console.log("Uploading image data", data);
        const formData = new FormData();
        formData.append("avatar", data.file);
        formData.append("imgId", this.editIndex);
        // formData.append("materialType", data.file);
      }, */

      // 上传图片前进行格式和文件大小检查
      beforeSlideShowUpload(file) {
        console.log("Uploading image file", file);
        const ext = file.name.substring(file.name.lastIndexOf(".") + 1);
        console.log("ext", ext);
        const extension =
          ext === "jpg" ||
          ext === "JPG" ||
          ext === "jpeg" ||
          ext === "JPEG" ||
          ext === "png" ||
          ext === "PNG";
        const isLt2M = file.size / 1024 / 1024 < 7; // 不超过2M
        if (!extension) {
          this.$message({
            type: "error",
            message: "上传的图片的格式只能是 jpg/png 格式",
          });
          return false;
        }
        console.log(file);
        if (!isLt2M) {
          this.$message({
            type: "error",
            message: "上传文件的大小不超过 2M",
          });
          return false;
        }
        return extension || isLt2M;
      },

      // 监听轮播图上传成功的函数
      handleSShowSuccess(response, file, fileList) {
        console.log("handleSShowSuccess response", response.data);
        console.log("handleSShowSuccess file", file);
        console.log("handleSShowSuccess fileList", fileList);
        const imgInfo = {
          name: file.name, // 参考elementUI属性 file-list
          url: response.url, // 临时路径
        };
        console.log("handleSShowSuccess imgInfo", imgInfo);
        this.goodsSlideShow.slideShowUrl = imgInfo.url; // 存入url
        console.log("监听图片上传之后的 goodsSlideShow", this.goodsSlideShow);
      },

      //   上传商品轮播图相关方法
      handleRemove(file) {
        // 移出图片
        console.log(file);
      },
      handlePictureCardPreview(file) {
        // 预览图片
        console.log(this.goodsSlideShow);
        console.log(file);
        this.goodsSlideShow.slideShowUrl = file.url; // 报错
        this.goodsSlideShow.dialogVisible = true;
      },
      handleDownload(file) {
        // 下载商品轮播图
        console.log(file);
      },

      // 监听详情页图上传成功的函数
      handleDetailSuccess() {
        console.log("handleDetailSuccess response", response);
        console.log("handleDetailSuccess file", file);
        const imgInfo = {
          name: file.name, // 参考elementUI属性 file-list
          url: response.data.tmp_path, // 临时路径
        };
        this.goodsDetailPage.detailPageImgUrl.push(imgInfo); // 存入数组
      },

      //   上传商品详情页图相关方法
      handleDetailPageRemove(file) {
        console.log(file);
      },
      handleDetailPagePictureCardPreview(file) {
        this.goodsDetailPage.slideShowUrl = file.url;
        this.goodsDetailPage.dialogVisible = true;
      },
      handleDetailPageDownload(file) {
        console.log(file);
      },
      // ...mapMutations([NAMES.set_token]),
    },
  };
</script>

<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 146px;
    height: 146px;
    display: block;
  }
</style>
