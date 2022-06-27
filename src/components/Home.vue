<template>
  <div class="home">
    <!-- 头部导航栏 -->
    <el-container>
      <el-header>
        <div class="logo" @click="goWelcome">
          <div class="logo_l">
            <img src="../assets/favicon.png" alt="" />
          </div>
          <h2>后台管理系统</h2>
        </div>

        <el-button type="warning" @click="LoginOut">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左边导航栏 -->
        <el-aside :width="state ? '64px' : '200px'">
          <div class="tarage" @click="Tgell">
            <i :class="state ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
          </div>

          <el-menu
            ref="MenuDom"
            :default-active="$store.state.Activepath"
            unique-opened
            class="el-menu-vertical-demo"
            text-color="#fff"
            :router="true"
            :collapse="state"
            :collapse-transition="false"
            @open="Open"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in List"
              :key="item.id"
            >
              <template slot="title">
                <i :class="Icons[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group
                v-for="items in item.children"
                :key="items.id"
              >
                <el-menu-item
                  :index="items.path"
                  class="el-icon-document"
                  @click="Secondary(items.path)"
                  >&nbsp;{{ items.authName }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- main导航栏 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      List: [],
      Icons: {
        1: "el-icon-user-solid",
        2: "el-icon-s-help",
        3: "el-icon-s-cooperation",
        4: "el-icon-s-order",
        5: "el-icon-s-data",
      },
      state: false,
    };
  },
  computed: {
    Second() {
      return this.$slots.state.Activepath;
    },
  },
  mounted() {
    this.$store.state.Activepath = sessionStorage.getItem("path");
    // 一进入页面， 调用这个方法
    this.MenusList();
  },
  methods: {
    // 退出
    LoginOut() {
      // 1. 清空 token
      sessionStorage.clear();
      // 2. 跳转到登录页面
      this.$router.push("/login");
    },
    // 获取新数据
    async MenusList() {
      const { data: res } = await this.$http.get("/api/menus");
      if (res.meta.status !== 200)
        return this.$message.error(res.data.meta.message);
      this.List = res.data;
    },
    // 二级菜单点击高亮
    Secondary(Activepath) {
      sessionStorage.setItem("path", Activepath);
      this.$store.commit("Tage", Activepath);
      // this.Activepath=Activepath
    },
    // 菜单点击折叠
    Tgell() {
      this.state = !this.state;
    },
    Open(index) {
      this.$store.state.obj = this.$refs.MenuDom;
      this.$store.state.sum = index;
    },
    goWelcome() {
      this.$router.replace("/Welcome");
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  background: url("../assets/bg2.jpg") no-repeat center/100%;
  background-size: 100%;
}
.logo {
  display: flex;
  align-items: center;
  line-height: 70px;
  cursor: pointer;
  width: 500px;
  height: 70px;
  .logo_l {
    width: 50px;
    height: 50px;
     img {
    width: 100%;
    height: 100%;
  }
  }
 
}
.head {
  height: 50px;
}
/deep/.el-header {
  display: flex;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  // padding: 0;
  height: 50px;
  color: #fff;
  line-height: 50px;
}
.el-container {
  height: 100vh;
}
.el-icon-s-cooperation,
.el-icon-user-solid,
.el-icon-s-help,
.el-icon-s-order,
.el-icon-s-data {
  color: #fff;
}

.el-main {
  background: rgba(0, 0, 0, 0.3);
}
.el-aside {
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
/deep/ .el-menu {
  border: none;
  padding: 0;
  background: rgba(0, 0, 0, 0.3);
}
/deep/.el-menu--popup {
  padding: 0;
}
.el-menu-item {
  width: 100%;
}
.el-icon-document {
  width: 100%;
}

.tarage {
  text-align: center;
  line-height: 35px;
  color: #fff;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.3);
}
/deep/.el-icon-arrow-down {
  color: #fff;
}
/deep/.el-menu-item-group__title {
  padding: 0;
  margin-left: 0;
  background: rgba(0, 0, 0, 0.2);
}
/deep/.el-menu--popup {
  min-width: none;
  background: rgba(0, 0, 0, 0.2);
}

// 一级菜单鼠标经过高亮
/deep/.el-submenu__title:hover {
  background: rgba(0, 0, 0, 0.2);
}
// 折叠菜单鼠标经过
.el-menu-item:hover {
  background: rgba(0, 0, 0, 0.2);
}
.el-menu--vertical {
  background: rgba(0, 0, 0, 0.3);
}

.el-menu-item-group {
  background: rgba(0, 0, 0, 0.2);
}

/deep/.el-icon-location {
  color: #fff;
}
</style>

