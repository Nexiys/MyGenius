<template>
	<!-- 设备检测--鼠标检测 -->
	<!-- 头部组件：logo、暂停、退出 -->
	<div>
	<Header />
	<section class="content-area-mouse" @mouseup="onContextMenu" ref="listBox">
		<h2>设备检测</h2>
		<div class="progress">
			<div class="speaker-icon"><img src="../../assets/img/voice_highlighted.png" alt="speaker"><span>扬声器</span></div>
			<i class="blue-bar"></i>
			<div class="keyboard-icon"><img src="../../assets/img/keyboard_highlighted.png" alt="keyboard"><span>键盘</span></div>
			<i class="green-bar"></i>
			<div class="mouse-icon"><img src="../../assets/img/mouse_highlighted.png" alt="mouse"><span class="focus-color">鼠标</span></div>
		</div>
		<div class="operate-box" >
			<div class="left-side">
				<div class="explain">
					<p>请按下列要求从左至右操作鼠标</p>
					<p>左键右键分别限时30秒，请尽快完成操作哦～</p>
				</div>
				<div class="mouse-box">
					<div class="left-key" v-bind:class="{adopt:hovero}">
						<img v-if="dishovero==1" src="../../assets/img/mouse_left_normal.png" />
						<img v-if="dishovero==2"  src="../../assets/img/mouse_left_highlighted.png" />
						<span>点击鼠标左键</span>
					</div>
					<div class="right-key" v-bind:class="{adopt:hovert}">
						<img v-if="dishovert==1" src="../../assets/img/mouse_right_normal.png" />
						<img v-if="dishovert==2" src="../../assets/img/mouse_right_highlighted.png" />
						<span>点击鼠标右键</span>
					</div>
				</div>
			</div>
			<div class="right-side">
				<i v-if="istype ==1" class="icon-test_unknown"></i>
				<img v-else-if="istype ==2" src="../../assets/img/laugh.png" alt="">
				<img v-else-if="istype ==3" src="../../assets/img/sad.png" alt="">
				<span>操作正常吗 ？</span>
				<a  @click="to('正常')" v-bind:class="{behover:behoverd}">正常，有笑脸</a>
				<a @click="to('异常')" v-bind:class="{behover:behovert}">无笑脸</a>
			</div>
		</div>
	</section>
	</div>
</template>

<script>
	import Header from '../../components/Header/index.vue'
	export default {
		name: 'Mouse',
		components: {
			Header,
		},
		data(){
			return{
				istype:1,
				hovero:false,
				hovert:false,
				dishovert:1,
				dishovero:1,
				time:"300",
				behoverd:false,
				behovert:false,
				mouse:false,
				timer:null
			}
		},
			methods:{
			validateBtn() {
				this.time = '300'
				this.timer = setInterval(() => {
					if (this.time == 0) {
						clearInterval(this.timer);
						if(this.hovero==true && this.hovert==true){
							this.istype = 2
							this.behoverd = true
						}else{
							this.istype = 3
							this.behovert = true
						}
					} else if (this.time <= 300 && this.time !== 0) {
						if(this.hovero==true && this.hovert==true){
							this.istype = 2
							this.behoverd = true
						}
						this.time--;
					}else{
						this.time--;
					}
					
				},100);
			},	
			funTimeCode(){
				if(this.time != 0 ){
					this.mouse = true
				}else{
					this.mouse = false
				}
			},

				preventMouse () {
					this.$refs.listBox.oncontextmenu =  () =>  false
				},
			//获取当前鼠标值
				onContextMenu (e) {
			clearInterval(this.timer);
			this.funTimeCode()
			if(this.mouse){
				this.validateBtn()
				this.preventMouse()
				if(e.button == 0){
					this.hovero = true
					this.dishovero = 2
				}else if(e.button == 2){
					this.hovert = true
					this.dishovert = 2
				}
			}else{
				return false
			}
				},
			to(e){
				window.localStorage.setItem('mouse', e);
				this.$router.push("result")			
			}
		}
	}
</script>

<style lang="less">
	@import '~@/assets/style/equipment.less';
</style>