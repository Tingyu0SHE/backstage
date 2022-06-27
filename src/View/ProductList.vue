<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- card -->
    <el-card>
      <!-- 搜索用户和添加用户 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input
            placeholder="请搜索商品"
            :clearable="true"
            @clear="Clear"
            v-model="searchVal"
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
          ><el-button type="primary" @click="addUser"
            >添加商品</el-button
          ></el-col
        >
      </el-row>

      <!-- 商品列表 -->
      <el-table :data="pList" v-if="zt" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="350">
        </el-table-column>
        <el-table-column prop="price" label="商品价格(元)" width="180">
        </el-table-column>
        <el-table-column prop="weight" label="商品重量(kg)" width="180">
        </el-table-column>
        <el-table-column prop="startTime" label="创建时间" width="180">
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

      <el-table :data="searchArr" v-if="serzt" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="title" label="商品名称" width="350">
        </el-table-column>
        <el-table-column prop="price" label="商品价格(元)" width="180">
        </el-table-column>
        <el-table-column prop="weight" label="商品重量(kg)" width="180">
        </el-table-column>
        <el-table-column prop="startTime" label="创建时间" width="180">
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
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="商品名称" prop="title">
            <el-input autocomplete="off" v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input autocomplete="off" v-model="ruleForm.price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input autocomplete="off" v-model="ruleForm.weight"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="OKs">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pList: [],
      id: 9,
      zt: true,
      serzt: false,
      searchArr: [],
      dialogFormVisible: false,
      ruleForm: {
        title: "",
        price: "",
        weight: "",
        startTime: "",
      },
      searchVal: "",
      rules: {
        title: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getpList();
  },
  methods: {
    getpList() {
      this.pList = [
        {
          id: 1,
          title: "王牌大彩电",
          price: "999",
          weight: "11",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 2,
          title: "美的10KG大容量洗衣机全自动家用除菌变频滚筒洗烘干一体",
          price: "2999",
          weight: "10",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 3,
          title: "【天猫精灵语音声控】AOTIN/奥田ZKM4-A!集成灶蒸烤箱一体家用",
          price: "11599",
          weight: "105",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 4,
          title: "海尔扫地机器人家用全自动清洗智能扫拖一体机擦地拖地吸尘三合一",
          price: "1009",
          weight: "1",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 5,
          title: "尊贵BCD-219W卧式橱柜嵌入式风冷无霜电子控温小型双门变频矮冰箱",
          price: "2299",
          weight: "105",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 6,
          title: "德国洗地机吸洗拖地一体家用吸尘器扫拖地机无线智能拖把自清洗",
          price: "1259",
          weight: "3.5",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 7,
          title: "海尔冰洗套装651L对开双门无霜冰箱10kg洗烘全自动滚筒洗衣机",
          price: "7399",
          weight: "10",
          startTime: "2022-02-28 10:33:19",
        },
        {
          id: 8,
          title: "小天鹅半自动洗衣机10公斤大容量8KG家用小型波轮双缸双桶杠",
          price: "589",
          weight: "8",
          startTime: "2022-02-28 10:33:19",
        },
      ];
    },
    addUser() {
      this.dialogFormVisible = true;
    },
    OKs() {
      // 判断标题的长度
      if (this.ruleForm.title.length >= 3 && this.ruleForm.title.length <= 20) {
        // 获取当前的时间
        const time = new Date();
        // 获取年月日时分秒，并进行格式化
        const newTime = time
          .toLocaleString("zh-cn")
          .replaceAll("/", "-")
          .replaceAll(",", "");
        // 创建新数组，并赋值
        const newArr = {
          id: this.id++,
          title: this.ruleForm.title,
          price: this.ruleForm.price,
          weight: this.ruleForm.weight,
          startTime: newTime,
        };
        // 将新数组添加到数组的下面
        this.pList.push(newArr);
        // 关闭对话框
        this.dialogFormVisible = false;
        // 对话框里面的数据清空
        this.ruleForm.title = "";
        this.ruleForm.price = "";
        this.ruleForm.weight = "";
      } else {
        // 如果不按照规定填写，弹出警告
        this.$notify({
          title: "警告",
          message: "请在规定的范围内填写",
          type: "warning",
        });
      }
    },
    search() {
      this.getpList();
      // 过滤数组
      this.searchArr = this.pList.filter((item) =>
        item.title.includes(this.searchVal)
      );

      this.zt = false;
      this.serzt = true;
    },
    Clear() {
      this.getpList();
      this.zt = true;
      this.serzt = false;
    },
    open(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then( () => {
        
        console.log(id);
        // this.pList.splice(id-1,1)
        this.pList= this.pList.filter(item=>item.id !==id)
        // console.log(this.pList);
        //  this.pList.filter((item) => item.id !== id);
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
    remove(id){
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then( () => {
        this.searchArr.pop(item=>item.id !==id)
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    }
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