<template>
	<!-- 设备检测--声音检测 -->
	<!-- <section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div>
	</section> -->
	<!-- 头部组件：logo、暂停、退出 -->
	<Header />
	<section class="content-area-speaker">
		<h2>设备检测</h2>
		<div class="progress">
			<div class="speaker-icon"><img src="../../assets/img/voice_highlighted.png" alt=""><span class="focus-color">扬声器</span></div>
			<i class="blue-bar"></i>
			<div class="keyboard-icon"><span>键盘</span></div>
			<i></i>
			<div class="mouse-icon"><span>鼠标</span></div>
		</div>
		<div class="operate-box">
			<div class="left-side">
			<audio controls="controls" loop="loop" autoplay="autoplay">
				<source src="../../assets/audio/music.ogg" type="audio/ogg" />
				<source src="../../assets/audio/music.mp3" type="audio/mpeg" />
				Your browser does not support the audio element.
			</audio>
			</div>
			<div class="right-side">
				<i v-if="istype ==1" class="icon-test_unknown"></i>
				<img v-else-if="istype ==2" src="../../assets/img/laugh.png">
				<img v-else-if="istype ==3" src="../../assets/img/sad.png">
				<span>操作正常吗 ？</span>
				<router-link to="/keyboard" @mouseover="selectStyle (2)"  @click="to('正常')" @mouseout="select(1)">能听到</router-link>
				<router-link to="/keyboard" @mouseover="selectStyle (3)"  @click="to('异常')" @mouseout="select(1)">不能听到</router-link> 
			</div>
		</div>
	</section>
</template>

<script>
	import Header from '../../components/Header/index.vue'
	export default {
		name: 'Speaker',
		components: {
			Header,
		},
		data() {
			return {
				istype : 1
			};
		},  
		methods:{
			selectStyle(e){

				this.istype = e
			},
					select(e){
		
				this.istype = e
			},
			to(e){
				window.localStorage.setItem('equipment', e);		
			}
		}
	}
</script>

<style lang="less">
	@import '~@/assets/style/equipment.less';
</style>