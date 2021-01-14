<template>
  <div class="scene-rt">
    <div class="title">场景游戏</div>
    <div class="scene-describe">
      <p class="p1">迈入大学校园，这里有各种各样的兴趣社团，选择喜欢的社团与志同道合的伙伴一起进步吧～</p>
      <p class="p1">如果时光能够倒流，如果人生可以再来一次，你会怎么选择呢？</p>
      <p class="p1">浩瀚星空，人类开启新文明，你将贡献自己的什么力量呢？</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SceneDescribe'
}
</script>

<style lang="less" scoped>
  .scene-rt {
    .title {
      margin-bottom: 16px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0;
      color: #006AD7;
    }
    .scene-describe {
      margin-bottom: 8px;
      padding: 0 10px;
      color: #007AF8;
      text-align: left;
      .p1 {
        line-height: 34px;
        font-size: 22px;
      }
    }
  }
</style>
