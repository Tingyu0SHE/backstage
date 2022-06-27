<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户订单</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 订单查询 -->
      <el-row :gutter="20">
        <el-col :span="4"
          ><p>订单状态</p>
          <el-select v-model="value" placeholder="请选择订单状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"
          ><p>订单类型</p>
          <el-select v-model="value" placeholder="请选择订单类型">
            <el-option
              v-for="item in optionsD"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4"
          ><p>下单账号</p>
          <el-input  placeholder="请输入下单账号"></el-input>
        </el-col>
        <el-col :span="4"
          ><p>备注信息</p>
          <el-input placeholder="请输入备注信息"></el-input>
        </el-col>
        <el-col :span="4" style="margin-top: 50px">
          <el-button type="primary">查询</el-button>
        </el-col>
      </el-row>
      <!-- 用户订单 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="ordernumber" label="订单号" width="180">
        </el-table-column>
        <el-table-column prop="Orderaccount" label="下单账号" width="180">
        </el-table-column>
        <el-table-column prop="quantity" label="数量"> </el-table-column>
        <el-table-column prop="price" label="单价/总价(元)"> </el-table-column>
        <el-table-column prop="Ordertime" label="下单时间"> </el-table-column>
        <el-table-column prop="remarks" label="备注"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column prop="operation" label="操作"> 
           <template>
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
                    ></el-button>
                  </el-tooltip>
                </div>
              </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time:new Date().toLocaleString(),
      value: "",
      options: [
        {
          value: "选项1",
          label: "未发货",
        },
        {
          value: "选项2",
          label: "待发货",
        },
        {
          value: "选项3",
          label: "已发货",
        },
        {
          value: "选项4",
          label: "已到货",
        },
        {
          value: "选项5",
          label: "未签收",
        },
        {
          value: "选项6",
          label: "已签收",
        },
      ],
      optionsD: [
        {
          value: "选项1",
          label: "订购",
        },
        {
          value: "选项2",
          label: "变更",
        },
        {
          value: "选项3",
          label: "付款成功",
        },
      ],
      tableData: [
        {
          ordernumber: "16546",
          Orderaccount: "tb48625454441635468",
          quantity: 2,
          price: "59.6",
          Ordertime: "2020/02/22",
          remarks: "无",
          state: "等待处理",
        },
         {
          ordernumber: "156469",
          Orderaccount: "tb486498651321635468",
          quantity: 1,
          price: "20.6",
          Ordertime: "2020/02/22",
          remarks: "无",
          state: "等待处理",
        },
      ],
    };
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
