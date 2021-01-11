<template>
	<!-- 记忆游戏六（记忆复述策略）正式阶段 -->
	<section class="header">
			<div class="logo-modular">
				<a href=""><img src="../../../assets/img/logo.png" ></a>
			</div>
			<div class="h-operate">
				<a href="#"><i class="icon-pause"></i>暂停</a>
				<a href="#"><i class="icon-quit"></i>退出</a>
			</div> 
		</section>
		<section class="content-area">
			<div class="c-header">
				<div class="c-h-left">
					<em>进度：</em>
					<em>{{index+1}}</em>
					<em>/{{length}}</em>
				</div>
				<div class="c-h-middle"></div>
				<div class="c-h-right">
					<em>用时：</em>
					<em>02:28:00</em>
				</div>
			</div>
			<div class="topic-exploring-area">
				<h2 class="stage-tit">正式阶段</h2>
				<h2 class="guide-tit">{{contentTitle}}</h2>
				<div class="main">
					<!-- 正确答案,增加 success-disturb 类,错误答案,增加 wrong-disturb 类 -->
					<div class="main-box not-flex success-disturb">
						<div class="main-con">
							<!-- span 标签内为 content 字段中的值 -->
							<span class="question-con">{{content}}</span>
							<!-- input value 需要与 answer 中值作对比,正确显示笑脸,错误显示哭脸 -->
							<input autofocus type="text" class="answer-con"  v-model="answerVal"  @input="valFun()">
						</div>
						<!-- 笑脸 or 哭脸,默认不显示（接口返回空）, src 取值 correct_icon 和 wrong_icon 字段 -->
						<img  v-if="iShow=='tip1' && tip1!==undefined" src="../../../assets/img/smile.png" />
						<img  v-if="iShow=='tip2'&& tip2!==undefined" src="../../../assets/img/cry.png" />
						<!-- 回答正确与否,默认不显示（接口返回空）, 文字内容取值 correct_tips 和 wrong_tips 字段 -->
						<span class="tips" v-if="iShow=='tip1'&& tip1!==undefined">{{tip1}}</span>
						<span class="tips" v-if="iShow=='tip2'&& tip2!==undefined">{{tip2}}</span>
					</div>
				</div>
				<a class="start-btn" v-bind:class="{ disabled: isActive }"  @click='btn(1)'>下一组</a>
			</div>
		</section>
</template>

<script>
	import TimingRing from '../../../components/TimingRing/index'
	export default {
		components: { TimingRing },
		name:'MSIFormal',
	}
</script>

<style lang="less">
	@import '~@/assets/style/memory-six.less';
</style>
