<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="PerList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="" label="路径">order</el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <div>
              <el-tag type="" v-if="scope.row.level == 0">一级</el-tag>
              <el-tag type="success" v-else-if="scope.row.level == 1"
                >二级</el-tag
              >
              <el-tag type="warning" v-else-if="scope.row.level == 2"
                >三级</el-tag
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Permission",
  data() {
    return {
      path: "list",
      PerList: [],
    };
  },
  mounted() {
    this.GetPerList(this.path);
  },
  methods: {
    async GetPerList(type) {
      const { data: res } = await this.$http.get("/api/rights/" + type);
      console.log(res);
      if (res.msg.status !== 200) return this.$message.error("获取数据失败");
      this.PerList = res.data;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-breadcrumb__inner {
  color: #fff;
}
/deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
.el-table {
  margin: 15px 0 0 0;
}
</style>
