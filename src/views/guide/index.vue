<template>
	<!-- 测评引导页面 -->
	<section class="header">
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div>
	</section>
	<section class="content-area-matters">
		<div class="illustrati w-480"></div>
		<div class="caption mt-170">
			<h2>测评寄语</h2>
			<span>亲爱的同学，你好！<br>天才教育公司为你提供权威的数据，精准的学校、专业推荐，助你选择正确的方向！接下来的游戏互动中，我们希望通过科学的测评，帮助您更加全面的了解自己，选择适合自己的专业、职业。做好自己的人生规划。<br>为了你更好的体验，请在网络状况良好的地方进行测评。</span>
			<!-- <a href="../equipment/index.html" class="normal-btn">开始测评</a> -->
			<router-link to="/equipment" class="normal-btn">开始测评</router-link>
		</div>
	</section>
</template>

<script>
export default {
  name: 'Guide',
}
</script>

<style lang="less">
	@import '~@/assets/style/guide.less';
</style>
