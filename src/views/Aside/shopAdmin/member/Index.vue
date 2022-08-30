<!-- 商品分类 -->
<template>
  <div class="tableBox">
    <!-- <el-button
      type="primary"
      @click="
        drawer = true;
        editID = null;
      "
      >新增</el-button
    > -->
    <el-drawer
      :title="editID ? '修改' : '添加'"
      v-model="drawer"
      direction="ltr"
      :before-close="handleClose"
      :destroy-on-close="true"
    >
      <template #default>
        <Info @refrashTable="getMemberList" :editID="editID"></Info>
      </template>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
        </div>
      </template>
    </el-drawer>

    <el-table :data="tableData" style="width: 100%" row-key="id">
      <el-table-column prop="uid" label="用户ID" width="330"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="addtime" label="注册日期">
        <template v-slot="scope">
          {{ PArsetime(+scope.row.addtime, "{y}-{m}-{d} {h}:{i}:{s}") }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="editCategory(scope.row.uid)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Info from "./Info.vue";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
//引入封装删除获取会员api
import { getMember, editMember } from "@/api/member.js";
//引入时间戳处理格式
import PArsetime from "@/hooks/parseTime.js";

const drawer = ref(false); //抽屉变量
const tableData = ref(null);
//获取表格数据
async function getMemberList() {
  console.log("子组件调用了父组件方方法更新表格");
  drawer.value = false;
  try {
    let list = await getMember();
    tableData.value = list;
    console.log(tableData.value);
  } catch (error) {
    console.log(error);
  }
}
//执行异步
getMemberList();
//编辑菜单
let editID = ref(null);
function editCategory(data) {
  drawer.value = true;
  editID.value = data;
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
// 关闭抽屉
function cancelClick() {
  drawer.value = false;
}
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
