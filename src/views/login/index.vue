<template>
	<section class="container">
		<div class="wrap">
			<div class="main">
				<div class="box">
					<img src="../../assets/img/login-logo.png" alt="天生我才青少年个性特质测试系统">
					<div class="content">
						<!-- 手机号登录 -->
						<section class="phone-box">
							<div class="iphone">
								<i class="icon-mobile_phone"></i>
								<input 
									type="number" 
									placeholder="手机号"
									v-model="phone"
									@input="changeInput()"
								>
								<button @click="getVerifyCode" :disabled="disabled" class="get-code" :class="{ 'beactive': isActive }" >{{btnTitle}}</button>
							</div>
							<div class="v-code">
								<i class="icon-verification_code"></i>
								<input type="number"  placeholder="验证码" v-model="verifyCode" @input="changeInputnumber()" >
							</div>
						</section>
					</div>

					<!-- 错误提示信息和忘记密码 -->
					<div class="msg-forget">
						<div class="msg" v-show="isshow">
							<i class="icon-test_fail"></i>
							<em >{{error}}</em>
						</div>
					</div>
					<button class="login-btn" @click="handleLogin" :class="{'behover':beActive}" :disabled="bedisab" >登录</button> 
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import global from '../../components/Global'
export default {
	name: 'Login',
	data() {
		return {
			phone:      "",
			verifyCode: "",
			error:      "",
			btnTitle:   "获取验证码",
			disabled:   true,
			isshow: false,
			isActive:false,
			beActive:false,
			bedisab:true
		};
	},
	computed: {
		// 手机号输入框和验证码输入框不为空时,登录按钮可点击
		isClick() {
			if (!this.phone || !this.verifyCode) {
				return true;
			} else {
				return false;
			}
		}
	},
	methods: {
		changeInput(){
			if(this.phone != '' && this.verifyCode == ''){
				this.isActive = true
				this.disabled = false
				this.beActive=false
				this.bedisab=true
				this.isshow = false
			}else if(this.phone != '' && this.verifyCode != ''){
				this.isActive = true
				this.disabled = false
				this.beActive=true
				this.bedisab=false
				
			}else if(this.phone != ''){
				this.isActive = true
				this.disabled = false
				this.beActive=false
				this.bedisab=true
				this.isshow = false
			}else{
				this.beActive=false
				this.isActive = false
				this.disabled = true
				this.bedisab=true
				this.isshow = false
			}
		},
		changeInputnumber(){
			if(this.phone != '' && this.verifyCode == ''){
			
				this.disabled = false
				this.beActive=false
				this.bedisab=true
				this.isshow = false
			}else if(this.phone != '' && this.verifyCode != ''){
			
				this.disabled = false
				this.beActive=true
				this.bedisab=false
				
			}else if(this.phone != ''){
		
				this.disabled = false
				this.beActive=false
				this.bedisab=true
				this.isshow = false
			}else{
				this.beActive=false

				this.disabled = true
				this.bedisab=true
				this.isshow = false
			}			
		},
		// 验证手机号码
		validatePhone() {
			this.isshow = false
			if (!this.phone) {
				this.isshow = true
				this.error=("手机号码不能为空")
			
				return false;
			} else if (!/^1[345678]\d{9}$/.test(this.phone)) {
				this.isshow = true
				this.error=("请填写正确的手机号码")
				return false;
			} else {
				this.errors = {};
				return true;
			}
		},
		// 获取验证码按钮状态
		validateBtn() {
			// 定义重新获取验证码的间隔时间
			
			let time = 60;
			let timer = setInterval(() => {
				if (time == 0) {
					clearInterval(timer);
					this.isActive = true
					// 按钮内容为"获取验证码"
					this.btnTitle = "获取验证码";
					// 按钮状态为可点击
					this.disabled = false;
				} else {
					this.isActive = false
					// 按钮内容为“X秒后重试”
					this.btnTitle = time + "秒后重试";
					// 按钮状态为不可点击
					this.disabled = true;
					// 倒计时
					time--;
				}
			},1000);
		},
		// 获取验证码
		getVerifyCode() {
		
			if (this.validatePhone()) {
				this.validateBtn()
			
				// 发送网络请求
				
				this.axios.post(global.Url+'/login/send_sms', {
					mobile: this.phone,
				})
				.then(res => {
				
					console.log(res.data.msg)
				});
			}
		},
		// 登录方法


		handleLogin() {
			// 取消错误提醒
			this.isshow = false
			this.errors = "";
			// 发送请求
			this.axios.post(global.Url+"/login/sms_login", {
				mobile: this.phone,
				code:   this.verifyCode
			})
			.then(res => {
				this.error=(res.data.msg)
				window.localStorage.setItem('data', res.data.data.token);
				this.axios.get(global.Url+'/user/check_evaluation', {
					params: {
						api_token: res.data.data.token,
						eid: 1
					},
				})
				.then(res => {
					res.data.data.if_evalution == 1 ? this.$router.push("befinished") : (res.data.data.if_evalution == 2 ? this.$router.push(""):(res.data.data.if_evalution == 0 ?this.$router.push("Guide") : this.$router.push("")))
				});
			})
			.catch(err => {
				// 返回错误信息
				this.isshow = true
				//this.error=("验证码错误")
			});
		},
	},
}
</script>

<style lang="less">
	@import '~@/assets/style/login.less';
</style>
