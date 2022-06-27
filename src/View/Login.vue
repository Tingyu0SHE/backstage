<template>
  <div class="login">
    <div class="loin_user" :rules="rules">
      <div class="mode">
        <div class="logo">
          <img src="../assets/logo.png" alt="" />
        </div>
        <h3>后台管理系统用户登录</h3>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="username">
            <el-input
              placeholder="用户名"
              prefix-icon="el-icon-user"
              v-model="ruleForm.username"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              placeholder="密码"
              prefix-icon="el-icon-lock"
              show-password
              v-model="ruleForm.password"
              @keyup.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-button @click="login">登录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
      },

      rules: {
        username: [
          { required: true, message: "请输入账户名称", trigger: "blur" },
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
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {
    login() {
      this.$refs.ruleForm.validate(async (v) => {
        if (!v) return;

        const { data: res } = await this.$http.post("/api/login", {
          username: this.ruleForm.username,
          password: this.ruleForm.password,
        });
        if (res.status !== 200) {
          this.$message.error;
          return;
        }
        sessionStorage.setItem("token", res.token);
        // Base64加密
        this.$message.success(res.message);
        sessionStorage.setItem("key", window.btoa(res.token));
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  /* 解决塌陷问题 */
  overflow: hidden;
  background: url("../assets/bg1.jpg") no-repeat;
  width: 100%;
  height: 100% !important;
  // background-size: 100%;
}
.loin_user {
  display: flex;
  justify-content: center;
  // align-items: center;
  padding-top: 65px;
  background: url("../assets/bg1.jpg") no-repeat center;
  border-radius: 20px;
  width: 500px;
  height: 450px;
  margin: 100px auto 0;
  box-sizing: border-box;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.mode {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 300px;
  // background: red;
}
h3 {
  color: #fff;
  margin: 10px 0 20px 0;
}
.logo {
  line-height: 100px;
  text-align: center;
  width: 200px;
  height: 75px;
  // background: #fff;
  // background: #fff;  
  // border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
/deep/.el-button {
  width: 100%;
  color: #dcdfe6;
  background: transparent;
}
/deep/.el-input__inner {
  background: transparent;
  color: #dcdfe6;
}
/deep/.el-form-item__content {
  margin-left: 0 !important;
}
</style>