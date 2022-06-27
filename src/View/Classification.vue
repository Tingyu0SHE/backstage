<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" @click="Sent">添加分类</el-button>

      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <!-- <el-table-column prop="id" label="序号" width="180"> </el-table-column> -->
        <el-table-column prop="name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <div>
              <el-result
                :icon="scope.row.state"
                style="width: 10px; height: 10px"
              >
              </el-result>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="排序">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
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
                  @click="remove(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="添加"
                placement="top"
              >
                <el-button
                  type="warning"
                  icon="el-icon-plus"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 点击添加分类，弹出对话框 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="分类名称" prop="name">
            <el-input autocomplete="off" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="是否有效" prop="">
            <el-select v-model="ruleForm.state" placeholder="请选择">
              <el-option label="是" value="success"></el-option>
              <el-option label="否" value="error"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级选择" prop="level">
            <el-select v-model="ruleForm.level" placeholder="请选择等级">
              <el-option label="一级" value="0"></el-option>
              <el-option label="二级" value="1"></el-option>
              <el-option label="三级" value="2"></el-option>
            </el-select>
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
      tableData: [],
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      id: 5,
      ruleForm: {
        id: "",
        name: "",
        state: "",
        level: "",
      },
    };
  },
  created() {
    this.gettableData();
  },
  methods: {
    gettableData() {
      this.tableData = [
        {
          id: 1,
          state: "success",
          name: "生活用品",
          level: 0,
        },
        {
          id: 2,
          state: "error",
          name: "数码产品",
          level: 1,
        },
        {
          id: 3,
          name: "大家电",
          state: "success",
          level: 2,
          children: [
            {
              id: 31,
              name: "空调",
              state: "error",
              level: 1,
            },
            {
              id: 32,
              name: "洗衣机",
              state: "success",
              level: 0,
            },
          ],
        },
        {
          id: 4,
          name: "出行必备",
          state: "error",
          level: 2,
        },
      ];
    },
    Sent() {
      this.dialogFormVisible = true;
    },
    add() {
      if (this.ruleForm.name.length >= 3 && this.ruleForm.name.length <= 5) {
        const newArr = {
          id: this.id++,
          name: this.ruleForm.name,
          state: this.ruleForm.state,
          level: this.ruleForm.level,
        };
        this.tableData.push(newArr);
        this.dialogFormVisible = false;
      } else {
        // 如果不按照规定填写，弹出警告
        this.$notify({
          title: "警告",
          message: "请在规定的范围内填写",
          type: "warning",
        });
      }
    },
    remove(id) {
      // console.log(i);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableData = this.tableData.filter((item) => item.id !== id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
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
/deep/.el-result__icon svg {
  width: 30px;
  height: 30px;
}
</style>