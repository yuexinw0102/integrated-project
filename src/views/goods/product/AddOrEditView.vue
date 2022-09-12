<template>
  <el-card shadow="never">
    <div slot="header" class="clearfix">
      <span>商品列表 > 商品详情</span>
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
                v-model="form.state"
                placeholder="请选择商品类别"
              >
                <el-option label="蔬菜" value="vegetable"></el-option>
                <el-option label="水果" value="fruit"></el-option>
              </el-select>
            </el-col>

            <el-col :span="12">
              <el-select
                size="small"
                v-model="form.state"
                placeholder="请选择商品类别"
              >
                <el-option label="蔬菜" value="vegetable"></el-option>
                <el-option label="水果" value="fruit"></el-option>
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
            <el-switch v-model="form.isRecommend"></el-switch></el-form-item
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
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!form.goodsSlideshow.disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!form.goodsSlideshow.disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="form.goodsSlideshow.dialogVisible">
              <img
                width="100%"
                :src="form.goodsSlideshow.dialogImageUrl"
                alt=""
              />
              <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="详情页图">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
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
                    v-if="!form.goodsdetailPage.disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDetailPageDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!form.goodsdetailPage.disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDetailPageRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="form.goodsdetailPage.dialogVisible">
              <img
                width="100%"
                :src="form.goodsdetailPage.dialogImageUrl"
                alt=""
              />
              <!-- <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div> -->
            </el-dialog>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        ><el-form-item label="限时抢购">
          <el-switch v-model="form.flashSale"></el-switch
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
          <el-switch v-model="form.greenDiscounts"></el-switch
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
          @click="handleSubmit"
          :loading="loading"
          >{{ loading ? "提交中 ..." : "保存资料" }}</el-button
        >
        <el-button size="small" type="primary">商品下架</el-button>
      </el-row>
    </el-form>
  </el-card>
</template>

<script>
  import product from "@/axios/goods/product";
  export default {
    name: "ProductAddOrEdit",
    created() {
      product.search().then(({ data }) => {
        // console.log("search data", data);
        this.list = data.data;
        this.editIndex = this.$route.query.id;
      });
      if (this.editIndex) {
        console.log("id", this.editIndex);
        product.getById(this.editIndex).then(({ data }) => {
          console.log("getById data", data);
          this.form = data.data;
        });
      }
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
        form: {
          id: "",
          title: "",
          desc: "", // 商品描述
          state: "",
          store: "",
          weighit: "",
          unit: "",
          isRecommend: "",
          recommendResult: "", // 推荐理由
          classify: "",
          nowPrice: "",
          originalPrice: "",
          // 存放商品轮播图
          goodsSlideshow: {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
          },
          //   存放商品详情页图
          goodsdetailPage: {
            dialogImageUrl: "",
            dialogVisible: false,
            disabled: false,
          },
          flashSale: "", // 限时抢购
          flashSalePrice: "", // 抢购价格
          startDate: "", // 开始抢购时间
          endDate: "", // 结束抢购时间
          greenDiscounts: "", // 绿卡优惠
          greenPrice: "", // 绿卡价格
        },
        loading: false,
        timer: null,
      };
    },
    methods: {
      handleSubmit(done) {
        console.log("handleSubmit done", done);
        this.$confirm("确定要提交吗？")
          .then((_) => {
            this.loading = true;
            this.timer = setTimeout(() => {
              //   done();
              setTimeout(() => {
                this.loading = false;
                if (this.id) {
                  product.edit(this.form).then(({ data }) => {
                    alert(data.message);
                  });
                } else {
                  product.add(this.form).then(({ data }) => {
                    alert(data.message);
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

      //   上传商品轮播图相关方法
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.goodsSlideshow.dialogImageUrl = file.url;
        this.goodsSlideshow.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },

      //   上传商品详情页图相关方法
      handleDetailPageRemove(file) {
        console.log(file);
      },
      handleDetailPagePictureCardPreview(file) {
        this.goodsdetailPage.dialogImageUrl = file.url;
        this.goodsdetailPage.dialogVisible = true;
      },
      handleDetailPageDownload(file) {
        console.log(file);
      },
    },
  };
</script>

<style lang="less" scoped></style>