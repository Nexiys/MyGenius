<template>
  <div class="voice-ring-rt">
    <div class="title">记忆游戏四</div>
    <div class="voice-ring-describe">
      <p class="p1">接下来你将会看到一些小短文，请认真、快速阅读文章，并按要求作答。</p>
      <p class="p2">每篇文章呈现完毕后，需按要求操作。</p>
      <p class="p3">1、语篇是否含有错别字（有按“F”键，没有按“J”键）</p>
      <p class="p3">2、判断句是否与语篇的意思相符（相符按“F”键，不相符</p>
      <p class="p3 line-change">按“J”键）</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoiceRingDescribe'
}
</script>

<style lang="less" scoped>
  .voice-ring-rt {
    .title {
      margin-bottom: 24px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0;
      color: #006AD7;
    }
    .voice-ring-describe {
      margin-bottom: 20px;
      line-height: 28px;
      font-size: 22px;
      letter-spacing: 0;
      color: #007AF8;
      text-align: left;
      .p1 {
        margin-bottom: 20px;
        font-size: 22px;
      }
      .p2 {
        margin-bottom: 6px;
        font-size: 22px;
      }
      .p3 {
        margin-bottom: 6px;
        font-size: 20px;
      }
      .line-change {
        text-indent: 30px;
      }
    }
  }
</style>
