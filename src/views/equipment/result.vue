<template>
	<!-- 设备检测结果，正常或异常 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href=""><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div> 
	</section>
	<section class="content-area-normal">
		<h2>设备检测</h2>
		<div class="progress">
			<i v-if="code=='1'" class="icon-test_success"></i>
			<i v-if="code=='2'" class="icon-test_fail abnormal-color"></i> 
			<span v-if="code=='1'">当前没有问题，可以正常测评</span>
			<span  v-if="code=='2'">存在以下问题，会影响测评</span>
			<router-link v-if="code=='1'" to="/one">({{times}}s)开始测评</router-link>
			<router-link v-if="code=='2'" to="/equipment">重新检测设备</router-link>
		
		</div>
		<div class="operate-box">
			<div class="result-wrap">
				<div class="speaker">
					<img src="../../assets/img/voice_highlighted.png" alt="speaker">
					<span>扬声器</span>
					<em class="normal" v-bind:class="{abnormal:speakerAbnormal=='异常'}">{{speaker}}</em>
					<p v-if="speakerAbnormal=='异常'">扬声器失灵</p>
				</div>
				<div class="keyboard">
					<img src="../../assets/img/keyboard_highlighted.png"  alt="keyboard"/>
					<span>键盘</span>
					<em class="normal" v-bind:class="{abnormal:normalAbnormal=='异常'}">{{normal}}</em> <!-- 异常，文字为异常，class为abnormal,正常为 normal -->
					<p v-if="normalAbnormal=='异常'">可能超时未点击相应按键</p>
					<p v-if="normalAbnormal=='异常'">也可能部分按键失灵</p>
				</div>
				<div class="mouse">
					<img src="../../assets/img/mouse_highlighted.png" alt="mouse">
					<span>鼠标</span>
					<em class="normal"  v-bind:class="{abnormal:mouseAbnormal=='异常'}">{{mouse}}</em>
					<p v-if="mouseAbnormal=='异常'">按键可能超时未点击</p>
					<p v-if="mouseAbnormal=='异常'">也可能是按键失灵</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "Result",
		data(){
			return{
				speaker:window.localStorage.equipment,
				normal:window.localStorage.keyboard,
				mouse:window.localStorage.mouse,
				mouseAbnormal:window.localStorage.mouse,
				normalAbnormal:window.localStorage.keyboard,
				speakerAbnormal:window.localStorage.equipment,
				times:3,
				code:1

			}
		},
		created(){
			this.fun();
			this.timefun()
        },
		methods:{

		timefun() {
			let time = 3;
			let timer = setInterval(() => {
				if (time == 0) {
					if (this.mouseAbnormal=='正常' && this.normalAbnormal=='正常' && this.speakerAbnormal=='正常') {
						this.$router.push("one")
						clearInterval(timer);
					}
				} else {
					this.times = time
					time--;
				}
			},500);
		},
			fun(){
				if (this.mouseAbnormal=='正常' && this.normalAbnormal=='正常' && this.speakerAbnormal=='正常') {
					this.code = 1
				}else{	
					this.code = 2
				}
			}
			
		},
	}
</script>

<style lang="less">
	@import '~@/assets/style/equipment.less';
</style>