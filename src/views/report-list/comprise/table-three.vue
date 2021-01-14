<template>
  <!-- 嵌套格式数组 -->
  <div class="table-wrap">
    <table class="basic-table">
      <thead class="table-thead">
        <tr>
          <th :class="['th' + (cindex + 1), bgColor]" v-for="(column, cindex) in columns" :key="column.key">{{column.value}}</th>
        </tr>
      </thead>
      <tbody class="table-body">
        <tr v-for="(row, rindex) in rowsData" :key="rindex">
          <td :class="'td' + (rindex + 1)">
            <div>{{row['subject']}}</div>
          </td>
          <td :class="'td' + (rindex + 1)">
            <div v-if="!row['cognitive_ability']">—</div>
            <div v-for="(column, cindex) in row['cognitive_ability']" :key="cindex">{{column}}</div>
          </td>
          <td :class="'td' + (rindex + 1)">
            <div v-if="!row['personality_characteristic']">—</div>
            <div v-for="(column, cindex) in row['personality_characteristic']" :key="cindex">{{column}}</div>
          </td>
          <td :class="'td' + (rindex + 1)">
            <div v-if="!row['interest_tendency']">—</div>
            <div v-for="(column, cindex) in row['interest_tendency']" :key="cindex">{{column}}</div>
          </td>
          <td :class="'td' + (rindex + 1)">
            <div v-if="!row['learning_potential']">—</div>
            <div v-for="(column, cindex) in row['learning_potential']" :key="cindex">{{column}}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TcTabelThree',
  props: {
    rowsData: {
      type: Array,
      default () {
        return []
      }
    },
    bgColor: {
      type: String,
      default: 'bg2'
    }
  },
  data () {
    return {
      columns: [{
        key: 'subject',
        value: '学科'
      }, {
        key: 'cognitive_ability',
        value: '认知能力'
      }, {
        key: 'personality_characteristic',
        value: '人格特点'
      }, {
        key: 'interest_tendency',
        value: '兴趣倾向'
      }, {
        key: 'learning_potential',
        value: '学习潜能'
      }]
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
        width: 178px;
        height: 38px;
        border: 1px solid #D8E1E8;
        text-align: center;
      }
      .th1, .td1 {
        width: 139px;
      }
      td {
        padding: 20px 30px;
      }
    }
    .table-thead {
      color: #ffffff;
    }
    .table-body {
      line-height: 22px;
      color: #565A66;
    }
  }
</style>
