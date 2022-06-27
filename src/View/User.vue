<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            placeholder="请搜索用户名"
            :clearable="true"
            @clear="Clear"
            v-model="query"
            @keyup.enter.native ="search"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="Sent">添加用户</el-button></el-col
        >
      </el-row>

      <!-- table -->
      <el-table :data="UserList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="r_name" label="角色" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="isno" label="状态" width="120">
          <template slot-scope="scope">
            <div>
              <el-switch
                v-model="scope.row.isno"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changState(scope.row)"
              >
              </el-switch>
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
                  @click="updataFun(scope.row.id)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="分配角色"
                placement="top"
              >
                <el-button
                  type="warning"
                  icon="el-icon-share"
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

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagnum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog> </el-dialog>

    <el-dialog title="添加用户" width="50%" :visible.sync="dialogVisible">
      <el-form
        label-width="70px"
        ref="addfrom"
        :model="ruleForms"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForms.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForms.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForms.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForms.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFrom">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改用户" width="50%" :visible.sync="updateinfo">
      <el-form
        :model="ruleForms"
        label-width="70px"
        ref="addfrom"
        :rules="upRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model="updateDate.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="updateDate.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="updateDate.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updateinfo = false">取 消</el-button>
        <el-button type="primary" @click="updateDun(updateDate.id)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmial = (rule, value, ck) => {
      var email =
        /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (email.test(value)) {
        return ck();
      }
      ck(new error("请输入合法邮箱"));
    };
    var checkPhone = (rule, value, ck) => {
      var phone =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (phone.test(value)) {
        return ck();
      }
      ck(new error("请输入合法手机号"));
    };
    return {
      UserList: [],
      total: 0,
      pagnum: 1,
      pagesize: 2,
      query: "",
      updateinfo: false,
      dialogVisible: false,
      updateDate: {},
      ruleForms: {
        username: "",
        password: "",
        email: "",
        phone: "",
      },
      // 添加的规则
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmial, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
      // 修改的规则
      upRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmial, trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      const { data: res } = await this.$http.get("/api/users", {
        params: {
          query: this.query,
          page: this.pagnum,
          size: this.pagesize,
        },
      });
      if (res.msg.status != 200) {
        // 数据提示
        return this.$message.error("数据查询失败");
      } else {
        this.UserList = res.data;

        this.total = res.msg.total;
      }
    },
    async changState(datas) {
      const res = await this.$http.get("/api/change", {
        params: {
          status: datas.isno,
          id: datas.id,
        },
      });

      if (res.data.status == 200) {
        // 数据提示
        return this.$message.success("操作成功");
      }
    },
    handleSizeChange(newsize) {
      this.pagesize = newsize;
      this.getUsers();
    },
    handleCurrentChange(newpage) {
      this.pagnum = newpage;
      this.getUsers();
    },
    search() {
      this.getUsers();
    },
    Clear() {
      this.getUsers();
    },
    Sent() {
      this.dialogVisible = true;
    },
    addFrom() {
      this.$refs.addfrom.validate(async (vail) => {
        if (!vail) return;
        const { data: res } = await this.$http.post("/api/register", {
          ...this.ruleForms,
        });
        if (res.status !== 200) return this.$message.error("用户添加失败");
        this.$message.success("添加成功");
        this.dialogVisible = false;
        this.$refs.addfrom.resetFields();
        this.getUsers();
      });
    },
    async updataFun(id) {
      //  console.log(this.updateDate);
      const { data: res } = await this.$http.get("/api/users/" + id);
      if (res.msg.status !== 200) return this.$message.error("获取数据失败");
      //  console.log(this.updateDate);
      this.updateDate = res.data;
      this.updateinfo = true;
    },
    async updateDun(id) {
      const { data: res } = await this.$http.post("/api/upuser", {
        id,
        email: this.updateDate.email,
        phone: this.updateDate.phone,
      });
      if (res.status !== 200) return this.$message.error("修改失败");
      this.$message.success("修改成功");
      this.updateinfo = false;
      this.getUsers();
    },
    open(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("/api/users/" + id);
          if (res.status !== 200) return this.$message.error("删除失败");
          console.log(res);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getUsers();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
.el-pagination {
  margin: 15px 0 0 0;
}
</style>
