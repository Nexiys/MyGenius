<template>
  <div class="tag-cloud-wrap">
    <div class="title">关键字（字体大小表示能力强弱）</div>
    <div class="tagcloud-all" ref="tagCloudAll">
      <svg viewBox="0, 0, 500, 414" @mousemove="listener($event)">
        <text
          v-for="(tag, index) in tags"
          :key="index"
          :x="tag.x"
          :y="tag.y"
          :font-size="tag.size * (500/(500-tag.z))"
          :fill="tag.color"
          :fill-opacity="((400 + tag.z)/600)">
          {{tag.text}}
        </text>
      </svg>
    </div>
    <div class="tag-cloud-bottom">
      <div class="tag-cloud-bottom-word" v-for="word in tagWord" :key="word.color">
        <i :class="['icon', word.color]"></i>
        {{word.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagCloud',
  props: {
    tagListOrg: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      width: 414,
      height: 414,
      RADIUS: 207,
      speedX: Math.PI / 360,
      speedY: Math.PI / 360,
      tags: [],
      tagWord: [{
        name: '认知潜能',
        color: 'bg2'
      }, {
        name: '学习潜能',
        color: 'bg3'
      }, {
        name: '兴趣倾向',
        color: 'bg4'
      }, {
        name: '性格特点',
        color: 'bg5'
      }]
    }
  },
  computed: {
    CX () {
      return this.width / 2
    },
    CY () {
      return this.height / 2
    },
    tagList () {
      const tagListOrg = this.tagListOrg
      const tagListNew = []
      const colorList = ['#75B7FF', '#8DCC74', '#F68D7B', '#5AD9DA', '#F288C0']

      tagListOrg.forEach((list, lindex) => {
        list.content.forEach(item => {
          const score = Number(item.score)
          let size = 14
          if (score >= 0 && score < 3) {
            size = 14
          } else if (score >= 3 && score < 6) {
            size = 16
          } else if (score >= 6 && score < 8) {
            size = 22
          } else if (score >= 8 && score <= 10) {
            size = 28
          }
          tagListNew[tagListNew.length] = {
            name: item.word,
            size: size,
            color: colorList[lindex]
          }
        })
      })
      return tagListNew
    }
  },
  methods: {
    rotateX (speedX) {
      var cos = Math.cos(speedX)
      var sin = Math.sin(speedX)
      for (const tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY
        var z1 = tag.z * cos + (tag.y - this.CY) * sin
        tag.y = y1
        tag.z = z1
      }
    },
    rotateY (speedY) {
      var cos = Math.cos(speedY)
      var sin = Math.sin(speedY)
      for (const tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX
        var z1 = tag.z * cos + (tag.x - this.CX) * sin
        tag.x = x1
        tag.z = z1
      }
    },
    // 响应鼠标移动
    listener (event) {
      var x = event.clientX - this.CX
      var y = event.clientY - this.CY
      this.speedX = x * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, x * 0.0001) : Math.max(-this.RADIUS * 0.00002, x * 0.0001)
      this.speedY = y * 0.0001 > 0 ? Math.min(this.RADIUS * 0.00002, y * 0.0001) : Math.max(-this.RADIUS * 0.00002, y * 0.0001)
    }
  },
  // 初始化标签位置
  created () {
    const tags = []
    for (let i = 0; i < this.tagList.length; i++) {
      const length = this.tagList.length
      const tag = {}
      const k = -1 + (2 * (i + 1) - 1) / length
      const a = Math.acos(k)
      const b = a * Math.sqrt(length * Math.PI)
      tag.text = this.tagList[i].name
      tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b)
      tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b)
      tag.z = this.RADIUS * Math.cos(a)
      tag.size = this.tagList[i].size
      tag.color = this.tagList[i].color
      tags.push(tag)
    }
    this.tags = tags
  },
  // 使球开始旋转
  mounted () {
    setInterval(() => {
      this.rotateX(this.speedX)
      this.rotateY(this.speedY)
    }, 17)
  }
}
</script>
<style lang="less" scoped>
  .tag-cloud-wrap {
    text-align: center;
    .title {
      font-size: 14px;
      color: #33363E;
    }
    .tag-cloud-bottom-word {
      position: relative;
      display: inline-block;
      padding-left: 16px;
      margin-right: 30px;
      font-size: 12px;
      line-height: 14px;
      color: #565A66;
      &:last-child {
        margin-right: 0;
      }
      .icon {
        position: absolute;
        left: 0;
        top: 3px;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 100%;
      }
    }
  }
  .tagcloud-all {
    position: relative;
    margin: 30px auto 40px;
    width: 500px;
    height: 414px;
    span {
      position: absolute;
      top: 0px;
      left: 0px;
      color: #fff;
      text-decoration: none;
      padding: 3px 6px;
      &:hover {
        color: #FF0000;
        letter-spacing: 2px;
      }
    }
  }
</style>
