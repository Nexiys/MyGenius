<template>
  <div class="vision-space-rt">
    <div class="title">记忆游戏五</div>
    <div class="vision-space-describe">
      <p class="p1">接下来你将参加一个空间顺序长度的记忆测验，本测验有两个分任务，请按照题目要求进行记忆并操作。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VisionSpaceDescribe'
}
</script>

<style lang="less" scoped>
  .vision-space-rt {
    margin-top: 20px;
    .title {
      margin-bottom: 36px;
      line-height: 32px;
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0;
      color: #006AD7;
    }
    .vision-space-describe {
      margin-bottom: 84px;
      padding: 0 10px;
      letter-spacing: 0;
      color: #007AF8;
      text-align: left;
      .p1 {
        line-height: 34px;
        font-size: 22px;
      }
    }
  }
</style>
