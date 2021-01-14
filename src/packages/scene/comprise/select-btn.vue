<template>
  <div class="select-btn size-big">
    <span :class="optionData.selectedFlag ? 'move' : ''">{{optionData.name}}</span>
  </div>
</template>

<script>

export default {
  name: 'SelectBtn',
  props: {
    optionData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .select-btn {
    height: 60px;
    border-radius: 4px;
    line-height: 60px;
    font-size: 18px;
    color: #33363E;
    background: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    z-index: 10;
    .move {
      color: rgba(51,54,62, 0.5);
      cursor: default;
    }
  }
  .size-big {
    width: 340px;
  }
  .size-small {
    width: 250px;
  }
</style>
