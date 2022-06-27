<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- from表单选择区域 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品分类">
          <el-select
            v-model="form.region"
            placeholder="请选择商品类别"
            @change="Digital()"
          >
            <el-option label="数码产品" value="1"></el-option>
            <el-option label="厨房家电" value="2"></el-option>
            <el-option label="生活用品" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 导航栏标签 -->
      <el-tabs>
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" :disabled="state" @click="add"
            >添加参数</el-button
          >
          <el-table :data="ParList" border style="width: 100%">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="title" label="参数名称" width="500">
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
                      @click="open(scope.row.id)"
                    ></el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">静态属性</el-tab-pane>
      </el-tabs>
      <!-- 对话框 -->
      <el-dialog title="添加参数" width="50%" :visible.sync="dialogVisible">
        <el-form label-width="70px">
          <el-form-item label="参数">
            <el-input autocomplete="off" v-model="iptVal"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="yes">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      state: true,
      dialogVisible: false,
      form: { region: "" },
      ParList: [
        { title: "颜色" },
        { title: "重量" },
        { title: "尺寸" },
        { title: "能效等级" },
      ],
      iptVal: "",
    };
  },
  methods: {
    // 如果下拉菜单选中对应的value值,将按钮禁用状态接触
    Digital() {
      if (this.form.region == 2) {
        this.state = false;
      }else{
        this.state = true;
      }
    },
    // 点击添加参数，打开对话框
    add() {
      this.dialogVisible = true;
    },
    // 点击确定，参数将传给数组ParList并关闭对话框
    yes() {
      const newArr = {
        title: this.iptVal,
      };
      this.dialogVisible = false;
      this.ParList.push(newArr);
      this.iptVal = "";
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