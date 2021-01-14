<template>
  <header class="top-bar-box">
    <dl class="top-bar-content">
      <dd class="tswc-logo"></dd>
      <router-link
        active-class="selected"
        to="/report">
        <dd class="item">
          <span class="word">报告</span>
        </dd>
      </router-link>
    </dl>
  </header>
</template>
<script>

export default {
  name: 'TopBar'
}
</script>
<style lang="less" scoped>
  .top-bar-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 68px;
    font-size: 0px;
    background: #ffffff;
    z-index: 11;
    .tswc-logo {
      margin: 11px 76px 11px 0;
      width: 146px;
      height: 46px;
      background: url("../../../assets/img/tswc-logo.png") no-repeat center center;
      background-size: cover;
    }
    .top-bar-content {
      display: flex;
      position: relative;
      margin: 0 auto;
      width: 1180px;
      height: 100%;
      box-sizing: border-box;
      z-index: 20;
      .item {
        margin: 0 18px;
        padding: 0 37px;
        position: relative;
        display: inline-block;
        line-height: 68px;
        align-items: center;
        cursor: pointer;
        &:hover {
          .word {
            color: #47A1FE;
          }
        }
        &:hover::after, &.active::after {
          content: "";
          display: inline-block;
          position: absolute;
          left: 0px;
          bottom: 0px;
          width: 110px;
          height: 4px;
          background: #47A1FE;
        }
        .word {
          font-size: 18px;
          color: #33363E;
          vertical-align: middle;
        }
      }
      .selected {
        .item {
          color: #47A1FE;
          &::after {
            content: "";
            display: inline-block;
            position: absolute;
            left: 0px;
            bottom: 0px;
            width: 110px;
            height: 4px;
            background: #47A1FE;
          }
        }
        .word {
          color: #47A1FE;
        }
      }
    }
  }
</style>
