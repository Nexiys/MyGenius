<template>
	<!-- 设备检测--键盘检测 -->
	<section class="header" >
		<div class="logo-modular">
			<a href=""><img src="../../assets/img/logo.png" ></a>
		</div>
		<div class="h-operate">
			<a href="#"><i class="icon-pause"></i>暂停</a>
			<a href="#"><i class="icon-quit"></i>退出</a>
		</div>
	</section>
	<section class="content-area-keyboard"  @keyup="onContextMenu" ref="listBox">
		<h2>设备检测</h2>
		<div class="progress">
			<div class="speaker-icon"><img src="../../assets/img/voice_highlighted.png" alt="speaker"><span>扬声器</span></div>
			<i class="blue-bar"></i>
			<div class="keyboard-icon"><img src="../../assets/img/keyboard_highlighted.png" alt="keyboard"><span class="focus-color">键盘</span></div>
			<i class="green-bar"></i>
			<div class="mouse-icon"><span>鼠标</span></div>
		</div>
		<div class="operate-box">
			<div class="left-side">
				<div class="explain">
					<p>请按以下顺序点击键盘按键进行输入</p>
					<p>每个按键操作最长30秒，请尽快完成操作哦～</p>
				</div>
				<div class="keyboard-box">
					<i class="icon-test_up" v-bind:class="{ adopt: isup }"></i>
					<i class="icon-test_down" v-bind:class="{ adopt: isdown }"></i>
					<i class="icon-test_left" v-bind:class="{ adopt: isleft }"></i>
					<i class="icon-test_right" v-bind:class="{ adopt: isright }"></i>
					<i class="icon-test_F" v-bind:class="{ adopt: isf }"></i>
					<i class="icon-test_J" v-bind:class="{ adopt: isj}"></i>
					<i class="" v-bind:class="{ adopt: isk }">空格</i>
				</div>
			</div>
			<div class="right-side">
				<i v-if="istype ==1" class="icon-test_unknown"></i>
				<img v-else-if="istype ==2" src="../../assets/img/laugh.png" alt="">
				<img v-else-if="istype ==3" src="../../assets/img/sad.png" alt="">
				<!-- <i class="icon-test_unknown"></i>
				<i class="icon-test_unknown"></i> -->
				<span>操作正常吗 ？</span>
				<router-link to="/mouse" @click="to('正常')"   v-bind:class="{ahover:hovero}" :disabled="bedisabO">正常，有笑脸</router-link>
				<router-link to="/mouse" @click="to('异常')"  v-bind:class="{ahover:hovert}" :disabled="bedisabT">无笑脸</router-link>
				
			</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'Keyboard',
	data(){
		return{
			adopt:false,
			isup:false,
			isdown:false,
			isleft:false,
			isright:false,
			isf:false,
			isj:false,
			isk:false,
			num:0,
			time:"300",
			bedisabO:true,
			bedisabT:true,
			hover:0,
			hovero:false,
			hovert:false,
			istype:1,
			mouse:false,
			timer:null
		}
	},
	created: function() {
        var _this = this;
        document.onkeydown = function(e) {
			let key = window.event.keyCode;
			
            _this.submit(key)
        };
    },
	methods: {
		validateBtn() {
			this.time = '300'
			this.timer = setInterval(() => {
				if (this.time == 0) {
					clearInterval(this.timer);
					if(this.isup==true && this.isdown==true && this.isleft==true && this.isright==true && this.isf==true && this.isj==true && this.isk==true){
					
						this.hovero=true
						this.hovert=false
						this.istype = 2
					}else{
				
						this.hovert=true
						this.hovero=false
						this.istype = 3
					
					}
				} else if (this.time < 300 && this.time !== 0) {
					if(this.isup==true && this.isdown==true && this.isleft==true && this.isright==true && this.isf==true && this.isj==true && this.isk==true){
					
						this.hovero=true
						this.hovert=false
						this.istype = 2
					}
					this.time--;
			
					
				}else{
					this.time--;
			
				}
			},100);
		},		
		submit: function(key) {
			clearInterval(this.timer);
			this.funTimeCode()
			if(this.mouse){
				this.validateBtn()
				if(key==38){
					this.isup=true
				}else if(key==40){
					this.isdown=true
				}else if(key==37){
					this.isleft=true
				}else if(key==39){
					this.isright=true
				}else if(key==70){
					this.isf=true
				}else if(key==74){
					this.isj=true
				}else if(key==32){
					this.isk=true
				}
			}
			

		},
		funTimeCode(){
			if(this.time != 0 ){
				this.mouse = true
			}else{
				this.mouse = false
			}
		},
		to(e){
			window.localStorage.setItem('keyboard', e);		
		}
	}

}
</script>

<style lang="less">
	@import '~@/assets/style/equipment.less';
</style>