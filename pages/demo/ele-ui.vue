<template>
  <div class="container">
    <el-dropdown>
      <el-button type="primary">更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in tableData" :key="index"> {{ item.name }} </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="addr"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  async asyncData (app) {
    let { data } = await app.$axios.get('/api/v1/users').then(res => {
      return res
    })
    return {
      tableData: data
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
