import axios from "axios";

export default {
  data() {
    return {
      data: [],
    };
  },
  mounted: function () {
    axios
      .get("/warehouse")
      .then((res) => {
        //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
        this.data = res;
        console.log(res.data); //在console中看到数据
      })
      .catch((res) => {
        alert("wrong");
      });
  },
  methods: {},
};
