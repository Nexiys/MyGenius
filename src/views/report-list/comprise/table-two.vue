<template>
  <!-- 嵌套格式数组 这个结构还要优化 -->
  <div class="table-wrap">
    <table class="basic-table">
      <thead class="table-thead">
        <tr>
          <th :class="'th' + (cindex + 1)" v-for="(column, cindex) in columns" :key="cindex">{{column.content}}</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(row, rindex) in rows" :key="rindex">
          <td class="td1">
            <div>{{row.content}}</div>
          </td>
          <td class="'td2">
            <div class="item" v-for="(item, index) in row.td" :key="index">{{item[0].content}}</div>
          </td>
          <td class="'td3">
            <div class="item" v-for="(item, index) in row.td" :key="index">{{item[1].content}}</div>
          </td>
          <td class="'td4">
            <div class="item" v-for="(item, index) in row.td" :key="index">
              <el-rate disabled v-model="item[2].content" :colors="['#FFAD5A', '#FFAD5A', '#FFAD5A']" disabled-void-color="#CBD6E5"></el-rate>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Rate } from 'element-ui'

export default {
  name: 'TcTabelTwo',
  components: {
    'el-rate': Rate
  },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    rows: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .table-wrap {
    margin-left: 36px;
    margin-bottom: 24px;
    position: relative;
    font-size: 14px;
    .basic-table {
      text-align: center;
      th, td {
        width: 240px;
        height: 38px;
        border: 1px solid #D8E1E8;
        text-align: center;
      }
      th {
        background: #8DCC74;
      }
      .th1, .td1 {
        width: 140px;
      }
      .th4, .td4 {
        width: 238px;
      }
      .item {
        padding: 13px 0;
        border-bottom: 1px solid #D8E1E8;
        &:last-child {
          border: 0;
        }
      }
    }
    .table-thead {
      color: #ffffff;
    }
    .table-body {
      color: #565A66;
    }
  }
</style>
