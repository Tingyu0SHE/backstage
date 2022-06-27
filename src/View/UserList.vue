<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 添加用户按钮 -->
      <el-row :gutter="20">
        <el-col :span="4"
          ><el-button type="primary" @click="Sent">添加用户</el-button></el-col
        >
      </el-row>

      <el-table :data="UseList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="description" label="角色描述"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <div>
              <!-- 编辑标签 -->
              <!-- 鼠标经过有文本提示 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="top"
              >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                ></el-button>
              </el-tooltip>

              <!-- 分配角色 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
              >
                <el-button type="warning" icon="el-icon-setting" size="mini"
                  >分配角色</el-button
                >
              </el-tooltip>

              <!-- 删除标签 -->
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  @click="open(scope.row.id)"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 点击添加用户，弹出添加界面 -->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="角色名称" prop="name">
            <el-input autocomplete="off" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input
              autocomplete="off"
              v-model="ruleForm.description"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      UseList: [
        {id:1, name: "主管", description: "技术负责人" },
        {id:2, name: "销售部", description: "部门经理" },
        {id:3, name: "测试角色", description: "测试角色描述" },
        {id:4, name: "普通管理员", description: "普通管理员描述" },
        {id:5, name: "超级管理员", description: "超级管理员描述" },
      ],
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then( () => {
        this.UseList=this.UseList.filter(item=>item.id!==id)
        
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    Sent() {
      this.dialogFormVisible = true;
    },
    add() {
      // console.log(this.ruleForm.name.length);
      if(this.ruleForm.name.length <=5&&this.ruleForm.name.length >=3){
         const newArr = {
        name: this.ruleForm.name,
        description: this.ruleForm.description,
      };
      this.dialogFormVisible = false;
      this.$message.success("添加成功");
      this.ruleForm.name=''
      this.ruleForm.description=''
      this.UseList.push(newArr);
      }else {
        this.$notify({
          title: '警告',
          message: '请在规定的范围内填写',
          type: 'warning'
        });
      }
     
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
