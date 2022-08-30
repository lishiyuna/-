<template>
  <div class="content">
    <router-link to="dynamicAdd">
      <el-button type="primary" style="margin: 20px">添加资讯</el-button>
    </router-link>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="type" label="type" />
      <el-table-column prop="title" label="title" />
      <el-table-column prop="time" label="time" />
      <el-table-column prop="address" label="操作" width="200" align="center">
        <template v-slot="scope">
          <router-link :to="'/lbtedit/' + scope.row.id">
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="handleEdit(scope.row.id)"
            />
          </router-link>
          <el-button
            class="delBtn"
            @click="handleDelete(scope.row.id)"
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
import { getDynamic } from "@/api/dynamic";
import { ref } from "vue";

const tableData = ref(null);
const imgList = ref([]);
const imgArr = ref([]);
async function getlist() {
  let res = await getDynamic();
  tableData.value = res.records;
}
getlist();

function handleEdit() {}

function handleDelete() {}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
}

a {
  text-decoration: none;
}

.delBtn {
  margin-left: 10px;
}
</style>
