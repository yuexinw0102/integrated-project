<template>
	<div id="root">
		<el-row type="flex" justify="center" align="middle" id="row">
			<el-card class="el-card" shadow="never" :body-style="{ 
				'text-align': 'center' ,
				'background-color': '#00A0C2' ,
			}">
				<template slot#header>
					<h1>生鲜电商-后台系统</h1>
				</template>
				<el-form :model="form">
					<el-form-item>
						<el-input v-model="form.account" placeholder="账号" />
					</el-form-item>
					<el-form-item>
						<el-input type="password" v-model="form.password" placeholder="密码" />
					</el-form-item>
					<el-form-item>
						<el-button style="width: 100%" type="primary" @click="handler_login" :loading="isLoading">登录
						</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-row>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				form: {
					account: "",
					password: "",
				},
				isLoading: false,
			};
		},
		methods: {
			handler_login() {
				console.log("登录");
				this.isLoading = true;
				setTimeout(() => {
					this.isLoading = false;
				}, 2000);
				this.$router.replace({
					path: "/home",
				});
			},
		},
	};
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
		border-color: #00A0C2;
	}

	#row {
		height: 300px;
		margin-top: 300px;
	}
</style>