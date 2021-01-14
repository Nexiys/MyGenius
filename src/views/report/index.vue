<template>
  <div class="report-wrap">
    <top-bar class="report-top-bar"></top-bar>
    <div class="report-main">
      <left-nav-bar class="report-left-bar" :isReady="isReady"></left-nav-bar>
      <div class="report-right-container">
        <section class="container">
          <router-view @load-complete="loadCompleteHandle" @load-no-complete="loadNotCompleteHandle"></router-view>
        </section>
      </div>
    </div>
    <!-- 底部公司信息-->
    <bottom-bar v-if="showBottomBar"></bottom-bar>
  </div>
</template>

<script>
import TopBar from './comprise/top-bar.vue'
import LeftNavBar from './comprise/left-nav-bar.vue'
import BottomBar from './comprise/bottom-bar.vue'

export default {
  name: 'Report',
  components: {
    TopBar,
    LeftNavBar,
    BottomBar
  },
  data () {
    return {
      isReady: false,
      showBottomBar: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.scrollBottom, true)
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollBottom, true)
  },
  methods: {
    // 接口未加载完成
    loadNotCompleteHandle () {
      this.isReady = false
    },
    // 接口加载完成
    loadCompleteHandle () {
      this.isReady = true
    },
    scrollBottom (e) {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop = e.target.scrollTop
      // 变量windowHeight是可视区的高度
      const windowHeight = e.target.clientHeight
      // 变量scrollHeight是滚动条的总高度
      const scrollHeight = e.target.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight >= (scrollHeight - 208)) {
        // 底部显示
        this.showBottomBar = true
      } else {
        // 底部隐藏
        this.showBottomBar = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .report-wrap {
    width: 100%;
    height: 100%;
    background: #EFF4FA;
    overflow-y: scroll;
    .report-main {
      position: relative;
      margin: 0 auto;
      padding-top: 98px;
      width: 1180px;
    }
    .report-left-bar {
      float: left;
      position: fixed;
      top: 98px;
    }
    .report-right-container {
      margin-bottom: 110px;
      float: right;
      width: 940px;
      min-height: calc(~'100vh - 208px');
      background: #ffffff;
      .container {
        width: 100%;
        background: #EFF4FA;
      }
    }
  }
</style>
<style lang="less">
  .report-top-content {
    padding: 24px;
    background: #ffffff;
  }

  .top-content {
    padding: 24px;
    font-size: 14px;
    color: #565A66;
    text-indent: 30px;
    background: #ffffff;
  }
</style>
