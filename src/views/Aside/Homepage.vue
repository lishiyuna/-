<template>
  <div>
    <el-space wrap>
      <el-card
        v-for="item in cardArr"
        :key="item.id"
        class="box-card"
        style="width: 220px"
      >
        <template #header>
          <div class="card-header">
            <div class="todyBox">
              <div>
                <span style="color: #333; font-size: 14px; font-weight: 500">{{
                  item.name
                }}</span
                ><br /><br />
                <NumScroll :value="item.newstate"></NumScroll>
              </div>
              <el-tag>今日</el-tag>
            </div>
          </div>
        </template>

        <div style="display: flex; justify-content: space-between">
          <span style="color: #333; font-size: 14px; font-weight: 500"
            >昨日数据</span
          ><span style="color: #333; font-size: 14px; font-weight: 500">{{
            item.oldstate
          }}</span>
        </div>
      </el-card>
    </el-space>
    <el-card class="box-card-chart">
      <Chart />
    </el-card>
  </div>
</template>

<script setup type="text/javascript">
import { reactive, ref } from "vue";
import Chart from "./Chart";
import NumScroll from "./NumScroll";

const cardArr = reactive([
  {
    id: 1,
    name: "销售额",
    newstate: "3500000",
    oldstate: "200万元",
  },
  {
    id: 2,
    name: "用户访问量",
    newstate: 400,
    oldstate: 156,
  },
  {
    id: 3,
    name: "订单量",
    newstate: 2,
    oldstate: "2单",
  },
  {
    id: 4,
    name: "新增用户量",
    newstate: 30000,
    oldstate: "20000人",
  },
  {
    id: 5,
    name: "丢失用户量",
    newstate: 100,
    oldstate: "400人",
  },
]);
</script>

<style lang="scss" scoped>
.homeBox {
  padding: 20px;
  box-sizing: border-box;
}
.numScroll {
  width: 200px;
  height: 200px;
}
.box-card1 {
  width: 200px;
}
.box-card-chart {
  margin-top: 20px;
}
.todyBox {
  display: flex;
  justify-content: space-between;
}
.el-space {
  display: flex;
  justify-content: space-between;
}
</style>


