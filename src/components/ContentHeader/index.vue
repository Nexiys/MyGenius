<template>
	<section class="content-header">
		<!-- 练习阶段显示 0/00 -->
		<div class="left" v-if="questionStatus === 1">
			<span>进度：</span>
			<span>0</span>
			<span>/00</span>
		</div>
		<!-- 非练习阶段显示 当前题号/总题数 -->
		<div class="left" v-if="questionStatus === 2">
			<span>进度：</span>
			<span>{{curQuesIndex + 1}}</span>
			<span>/{{questionTotal}}</span>
		</div>
		<div class="right">
			<span>用时：</span>
			<span>{{changeTime}}</span>
		</div>
	</section>
</template>

<script>
	export default {
		name: "ContentHeader",
		props: {
			// 阶段
			questionStatus: {
				type: Number,
				default: 1
			},
			// 当前题号
			curQuesIndex: {
				type: Number,
				default: 0
			},
			// 总题数
			questionTotal: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				startTime: 0,
				interval: null
			}
		},
		computed: {
			changeTime () {
				let s, min, h
				s = parseInt(this.startTime % 60)
				min = parseInt((this.startTime % 3600) / 60)
				h = parseInt(this.startTime / 3600)
				s = s >= 10 ? s : `0${s}`
				min = min >= 10 ? min : `0${min}`
				h = h >= 10 ? h : `0${h}`
				return `${h}:${min}:${s}`
			},
			isPaused () {
				return this.$store.state.isPausedFlag
			}
		},
		watch: {
			isPaused (newVal, oldVal) {
				console.log(newVal, 'isPaused')
				if (newVal) {
					this.timeStop()
				} else {
					this.timeStart()
				}
			}
		},
		created () {
			if (window.localStorage.getItem('questionTime')) {
				this.startTime = parseInt(window.localStorage.getItem('questionTime'))
			}
			this.timeStart()
		},
		destroyed () {
			clearInterval(this.interval)
		},
		methods: {
			timeStart () {
				this.interval = setInterval(() => {
					this.startTime++
				}, 1000)
			},
			// 停止计时
			timeStop () {
				clearInterval(this.interval)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
	.content-header {
		display: flex;
		align-items: center;
		width: calc(~"100% - 60px");
		height: 60px;
		margin: 0 auto;
		border-bottom: 1px solid @hr-color;
		.left,.right {
			font-size: 16px;
			flex-grow: 1;
			line-height: 1;
			color: @text-secondary;
		}
		.left {
			text-align: left;
			span{
				&:nth-child(2) {
					color: @normal-blue;
				}
			}
		}
		.right {
			text-align: right;
		}
	}
</style>
