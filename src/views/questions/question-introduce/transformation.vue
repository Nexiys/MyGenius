<template>
  <div class="transformation-rt">
    <div class="title">记忆游戏三</div>
    <div class="transformation-describe">
      <p class="p1">接下来你将看到由红色/蓝色长方形+单字+两位数组成的图片。</p>
      <p class="p4">1、红色长方形代表数字的判断（奇数/偶数）</p>
      <p class="p2 line-change">蓝色长方形代表词语的判断（名词/动词）</p>
      <p class="p2">2、请按照题目要求判断并在键盘上按“←”键或“→”键。</p>
      <p class="p3">请尽可能快速而正确地作出反应。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransformationDescribe'
}
</script>

<style lang="less" scoped>
  .transformation-rt {
    .title {
      margin-bottom: 24px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0;
      color: #006AD7;
    }
    .transformation-describe {
      line-height: 28px;
      color: #007AF8;
      text-align: left;
      .p1 {
        margin-bottom: 20px;
        font-size: 22px;
      }
      .p2 {
        font-size: 20px;
        margin-bottom: 6px;
      }
      .p3 {
        margin: 20px 0 38px;
        line-height: 22px;
        font-size: 22px;
      }
      .p4 {
        font-size: 20px;
      }
      .line-change {
        text-indent: 30px;
      }
    }
  }
</style>
