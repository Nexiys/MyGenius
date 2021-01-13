<template>
	<!-- 设备检测首页 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
	<Header />
	<section class="content-area">
		<div class="illustrati"></div>
		<div class="caption mt-120">
			<h2>设备检测</h2>
			<p class="mt-12">为保证测评效果，我们将对您的扬声器、键盘、鼠标进行检测</p>
			<span><img src="../../assets/img/voice_highlighted.png" alt="speaker">扬声器<em>（声音）</em></span>
			<span><img src="../../assets/img/keyboard_highlighted.png" alt="keyboard">键盘<em>（键位操作）</em></span>
			<span><img src="../../assets/img/mouse_highlighted.png" alt="mouse">鼠标<em>（左右键）</em></span>
			<router-link to="/speaker" class="normal-btn">开始检测</router-link>
			<!-- <a href="#">跳过检测直接测评</a> -->
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../components/Header/index.vue'
	export default {
		name: 'Equipment',
		components: {
			Header,
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
	@import '~@/assets/style/equipment.less';
</style>