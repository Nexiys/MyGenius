<template>
  <div class="table-wrap">
    <table class="basic-table">
      <thead class="table-thead">
        <tr>
          <th v-for="(column, cindex) in columns" :key="cindex">{{column.content}}</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(row, rindex) in rows" :key="rindex">
          <td v-for="(column, cindex) in row" :key="cindex">
            <el-rate v-if="cindex === 3" disabled v-model="column.content" :colors="['#FFAD5A', '#FFAD5A', '#FFAD5A']" disabled-void-color="#CBD6E5"></el-rate>
            <div v-else>{{column.content}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { Rate } from 'element-ui'

export default {
  name: 'TcTabel',
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
    position: relative;
    font-size: 14px;
    .basic-table {
      text-align: center;
      th, td {
        width: 216px;
        height: 38px;
        border: 1px solid #D8E1E8;
        text-align: center;
      }
      th {
        background: #8DCC74;
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
