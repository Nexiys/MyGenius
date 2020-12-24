<template>
  <div class="timing-ring-wrap">
    <svg viewBox="0, 0, 100, 100" class="timing-ring">
      <!-- 外层圆 -->
      <circle
        r="45"
        cx="50"
        cy="50"
        stroke="#EAEFF5"
        stroke-width="10"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
      />
      <!-- 内层圆 -->
      <circle
        class="progress"
        r="45"
        cx="50"
        cy="50"
        :stroke="color"
        stroke-width="6"
        stroke-linejoin="round"
        stroke-linecap="round"
        :stroke-dashoffset="dashoffset"
        :stroke-dasharray="dashArray"
        fill="none"
      />
    </svg>
    <span class="progress-text">{{progressText}}</span>
  </div>
</template>

<script>
	export default {
		name: 'TimingRing',
		props: {
			originProgressText: {
				type: Number,
				default: 6
			},
			timeFun:''
		},
		data () {
			return {
				interval: null,
				radius: 45, // 可变
				color: '#47A1FE',
				dashArray: 0,
				dashoffset: 0,
				progressText: this.originProgressText,
				mefun:this.timeFun
			}
		},
		methods:{
			funtime(){
				let intervalTime = 1000
				// 初时间始
				let time = this.originProgressText
				// 如果时间为小数
				if (!Number.isInteger(this.originProgressText)) {
					time = this.originProgressText * 50
					intervalTime = 20
				}
				this.interval = setInterval(() => {
					time--
					// 时间结束，切换到下一题
					if (time <= 0) {
						// if(this.$route.path =="/topic"){
						// 	this.$router.push("exercisrstage")
						// }
						// if(this.$route.path =="/transitionpage"){
						// 	this.$router.push("topicexploring")
						// }
						// if(this.$route.path =="/topicexploring"){
						// 	this.$router.push("formalstage")
						// }
						if(this.$route.path =="/exercisrstage"){
							
							//this.$router.push("transitionpage")
							time = 30
						}
						
						this.$emit('time-end')
						clearInterval(this.interval)
					}
					// 还剩3秒变色
					if (Number.isInteger(this.originProgressText) && time <= 3) {
						this.color = '#dd6559'
					}

					let percent = time / this.originProgressText

					if (!Number.isInteger(this.originProgressText)) {
						this.progressText = parseFloat(time / 50).toFixed(1)
						percent = time / (this.originProgressText * 50)
					} else {
						this.progressText = time
						percent = time / this.originProgressText
					}
					// 圆的周长
					const perimeter = Math.PI * 2 * this.radius
					this.dashArray = `${perimeter * percent}px, ${perimeter}px`
				}, intervalTime)				
				}
		},
		mounted () {
			//console.log(this.$route.path)
			// 设置倒计时间隔
			let intervalTime = 1000
			// 初时间始
			let time = this.originProgressText
			// 如果时间为小数
			if (!Number.isInteger(this.originProgressText)) {
				time = this.originProgressText * 50
				intervalTime = 20
			}
			this.interval = setInterval(() => {
				time--
				// 时间结束，切换到下一题
				if (time <= 0) {
					if(this.$route.path =="/exercisrstage"){
						this.$router.push("transitionpage")
						
					}
					if(this.$route.path =="/formalstage"){
						this.funtime()
						this.color = '#47A1FE'
						 time = 60
						//this.$router.push("transitionpage")
					}
					
					this.$emit('time-end')
					clearInterval(this.interval)
				}
				// 还剩3秒变色
				if (Number.isInteger(this.originProgressText) && time <= 3) {
					this.color = '#dd6559'
				}

				let percent = time / this.originProgressText

				if (!Number.isInteger(this.originProgressText)) {
					this.progressText = parseFloat(time / 50).toFixed(1)
					percent = time / (this.originProgressText * 50)
				} else {
					this.progressText = time
					percent = time / this.originProgressText
				}
				// 圆的周长
				const perimeter = Math.PI * 2 * this.radius
				this.dashArray = `${perimeter * percent}px, ${perimeter}px`
			}, intervalTime)
		},
		destroyed () {
			clearInterval(this.interval)
		}
	}
</script>

<style lang="less" scoped>
	@import url("../../assets/style/common.less");
  .timing-ring-wrap {
		position: relative;
    width: 100px;
    height: 100px;
    background-color: @white;
    .timing-ring {
      position: relative;
    }
    .progress {
      transition: stroke-dashoffset 0.35s ease;
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
    }
    .progress-text {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      line-height: 42px;
      font-size: 42px;
      color: @text-color;
      transform: translate(0, -50%);
      text-align: center;
    }
  }
</style>
