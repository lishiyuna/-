<!-- 限时秒杀 -->
<template>
  <div class="tableBox">
    <el-button
      type="primary"
      @click="
        drawer = true;
        editID = null;
      "
      >新增</el-button
    >
    <el-drawer
      :title="editID ? '修改' : '添加'"
      v-model="drawer"
      direction="ltr"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <template #default>
        <Info @refrashTable="getSeckList" :editID="editID"></Info>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <el-table :data="tableData" style="width: 100%" row-key="id">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="活动名称"></el-table-column>
      <el-table-column prop="begintime" label="开始时间">
        <template v-slot="scope">
          {{ PArsetime(+scope.row.begintime, "{y}-{m}-{d} {h}:{i}:{s}") }}
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="结束时间">
        <template v-slot="scope">
          {{ PArsetime(+scope.row.endtime, "{y}-{m}-{d} {h}:{i}:{s}") }}
        </template>
      </el-table-column>

      <el-table-column prop="address" label="状态">
        <template v-slot="scope">
          <el-tag type="success" v-if="scope.row.status == 1">已启用</el-tag>
          <el-tag type="danger" v-else>已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="editSeckill(scope.row.id)"
          />
          <el-button
            @click="delSeck(scope.row.id)"
            type="danger"
            icon="Delete"
            size="small"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Info from "./Info.vue";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
//引入封装删除获取秒杀api
import { seckDel, getSeck } from "@/api/seck.js";
//引入时间戳处理格式
import PArsetime from "@/hooks/parseTime.js";

const drawer = ref(false); //抽屉变量
const tableData = ref(null); //表格数据
const editID = ref(null); //编辑菜单ID
function editSeckill(data) {
  drawer.value = true;
  editID.value = data;
}
//获取表格数据
async function getSeckList() {
  console.log("子组件调用了父组件方方法更新表格");
  drawer.value = false;
  try {
    let list = await getSeck();
    tableData.value = list;
    console.log(tableData.value);
  } catch (error) {
    console.log(error);
  }
}
//执行异步
getSeckList();

//删除菜单
function delSeck(data) {
  // console.log('删除按钮参数',data);
  ElMessageBox.confirm("此操作将永久删除该菜单/目录, 是否继续?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      ElMessage.success({
        message: "删除成功!",
      });
      try {
        let res = await seckDel(data);
        console.log("seckDel@@@", res);
        // 更新商品分类列表
        tableData.value = res;
      } catch (error) {
        console.log(error);
      }
    })
    .catch(() => {
      ElMessage.info({
        message: "已取消删除",
      });
    });
}

// 关闭抽屉
function cancelClick() {
  drawer.value = false;
}
const handleClose = (done) => {
  ElMessageBox.confirm("确认关闭？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.tableBox {
  padding: 20px;
  box-sizing: border-box;
}

.image-slot {
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
.el-image {
  height: 60px;
  border: 1px solid #eee;
}

.el-image-viewer__canvas {
  img {
    width: 50%;
    height: auto;
  }
}
</style>
