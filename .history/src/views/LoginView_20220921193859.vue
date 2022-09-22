<template>
  <div id="root">
    <el-row type="flex" justify="center" align="middle" id="row">
      <el-card
        class="el-card"
        shadow="never"
        :body-style="{
          'text-align': 'center',
          'background-color': '#00A0C2',
        }"
      >
        <template slot#header>
          <h1>生鲜电商-后台系统</h1>
        </template>
        <el-form :model="form" :rules="rules" ref="loginForm">
          <el-form-item prop="account">
            <el-input v-model="form.account" placeholder="账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              @click="handler_login"
              :loading="isLoading"
              >登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-row>
  </div>
</template>

<script>
<<<<<<< HEAD
import axios from "axios";
import $http from "../axios/login.js";
import { mapMutations } from "vuex";
import { NAMES } from "@/store";
export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "admin",
        password: "123456",
      },
      isLoading: false,
      rules: {
        account: [
          { required: true, message: "请输入账户", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handler_login() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
      this.$refs["loginForm"].validate(async (valid) => {
        if (valid) {
          const { data } = await $http.login(this.form);
          if (data.code == 200) {
            this[NAMES.set_token](data);
            this.$router.replace("/home");
            if (localStorage.getItem("warehouseData") == "") {
              axios.get("/warehouse").then((res) => {
                localStorage.setItem("warehouseData", JSON.stringify(res.data.data));
              });
            }else{
				localStorage.setItem("warehouseData",'');
			}
          }
        }
      });
    },
    ...mapMutations([NAMES.set_token]),
  },
};
=======
	import $http from "../axios/login.js";
	import { mapMutations } from "vuex";
	import { NAMES } from "@/store";
	export default {
		name: "Login",
		data() {
			return {
				form: {
					account: "admin",
					password: "123456",
				},
				isLoading: false,
				rules: {
					account: [
						{ required: true, message: '请输入账户', trigger: 'blur' },
						{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
					],
				}
			};
		},
		methods: {
			handler_login() {
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
				}, 2000);
				this.$refs["loginForm"].validate(async (valid) => {
					if (valid) {
						const { data } = await $http.login(this.form);
						if (data.status == "success") {
							// this.$store.commit("set_token", data)
							const token = data.tokenHeader + data.token;
							sessionStorage.setItem('token', token); // 存入token
							this[NAMES.set_token](data);
							this.$router.replace("/home");
						}
					}
				})
				// this.$router.replace("/home");
			},
			...mapMutations([NAMES.set_token]),
		},
	};
>>>>>>> origin/feature-product
</script>

<style lang="less" scoped>
#root {
  background-image: url("../assets/login.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.el-card {
  border-color: #00a0c2;
}

#row {
  height: 300px;
  margin-top: 300px;
}
</style>
