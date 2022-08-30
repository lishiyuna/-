<template>
  <div class="content">
    <el-form :model="state.form" class="form">
      <el-form-item label="姓名:" prop="name">
        <el-input v-model="state.form.name" />
      </el-form-item>
      <el-form-item label="电话:" prop="tel">
        <el-input v-model="state.form.tel" />
      </el-form-item>
      <el-form-item label="单位:" prop="danwei">
        <el-input v-model="state.form.danwei" />
      </el-form-item>
      <el-form-item label="职位:" prop="zhiwei">
        <el-input v-model="state.form.zhiwei" />
      </el-form-item>
      <el-form-item label="备注:" prop="other">
        <el-input v-model="state.form.other" />
      </el-form-item>
    </el-form>
  </div>
</template>
  
  <script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
//引入编辑会员api
import { getAwxUser } from "@/api/user";

const route = useRoute();
// 动态路由携带的id参数
let ID = route.params.id;

//分类数据
const state = reactive({
  form: {
    name: "",
    tel: "",
    danwei: "",
    zhiwei: "",
    other: "",
  },
});

onMounted(async () => {
  //获取一条分类数据
  let res = await getAwxUser(ID);
  console.log(res);
  state.form = res.data;
});
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  padding: 100px 0 0 50px;
}
a {
  text-decoration: none;
}

.form{
    width: 500px;
}
</style>
  