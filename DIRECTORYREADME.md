## 项目结构描述 

# 一、题型总共分为5类、23个题型：
	1、注意类			(Attention 6个)
	2、逻辑类			(Logic 4个)
	3、记忆类			(Memory 11个)
	4、人格倾向		(Personality 1个)
	5、场景类			(Scene 1个)
每个类型下题型的对应的序号为该题的目录文件夹

# 二、登录(Login)、注册(Register)
	注：登录和注册已合为一个，全放在Login文件夹中

# 三、设备检测(Equipment)
	1、首页			index.vue
	2、声音检测 	speaker.vue
	3、键盘检测 	keyboard.vue
	4、鼠标检测		mouse.vue
	5、检测结果		()正常或异常在同一个页面，布局一样，部分细节不同 result.vue
	
# 四、引导说明页面(Guide/index.vue) 
	一个测评说明及引导的页面
	
# 五、测评完成页面(Finished/index.vue)
	测评结束后展示的页面
	
## 题型
# 一、注意类(Attention)
	1、注意游戏三 (注意稳定性游戏 - three)
# 二、逻辑类(Logic) 
	1、逻辑游戏四 (问题解决游戏(推箱子) -  - four)
# 三、记忆类(Memory)
# 四、人格倾向(Personality)
	1-1：induce.vue -- 题型介绍
	1-2：quiet.vue  -- 答题页面
# 五、场景类(Scene 1个)

## 其他说明

# 一、静态资源 src/assets:
	css、img、js、font、audio
	
# 二、自定义组件 src/compoments(XX文件夹下):
	1、Header          头部栏，包括 Logo、暂停、退出
	2、Background      背景区域，整个带蓝色背景图的区域
	3、ContentArea     内容区，中间1180*760区域，不带背景色
	4、CaHeader        内容区的头部，C-A 为内容区前缀，包括 进度、中间标题、总用时
	5、Introduce       题型介绍，在内容区内，分左侧图片和右侧文字，标题+介绍内容
	6、TransitionPage  过渡页，用于练习阶段结束，衔接正式阶段的页面
	7、TimingRing      环形倒计时组件
