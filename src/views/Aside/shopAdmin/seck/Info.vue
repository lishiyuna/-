<template>
  <el-form :model="state.form" ref="resetFormData">
    <el-form-item label="活动名称" prop="title">
      <el-input placeholder="请输入商品名称" v-model="state.form.title" />
    </el-form-item>
    <el-form-item label="秒杀时间" prop="begintime">
      <div class="block">
        <el-date-picker
          v-model="seckTime"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="defaultTime"
        />
      </div>
    </el-form-item>

    <el-form-item label="一级分类" prop="pid">
      <el-select
        @change="topChange"
        v-model="state.form.first_cateid"
        placeholder="请选择"
      >
        <el-option
          v-for="item in state.toplist"
          :label="item.catename"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="二级分类" prop="pid">
      <el-select
        @change="secondChange"
        v-model="state.form.second_cateid"
        placeholder="请选择"
      >
        <el-option
          v-for="item in state.secondlist"
          :label="item.catename"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="选择商品" prop="pid">
      <el-select v-model="state.form.goodsid" placeholder="请选择">
        <el-option
          v-for="item in state.goodslist"
          :label="item.goodsname"
          :value="item.id"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="状态" prop="status">
      <el-radio-group v-model="state.form.status">
        <el-radio :label="1">正常</el-radio>
        <el-radio :label="2">禁用</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit()">{{
        props.editID ? "立即修改" : "立即添加"
      }}</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message/style/css";
import { getCategoryGoods } from "@/api/goods.js";
import { getCategory, getChildCategory } from "@/api/category.js";
import { getSeck, addSeck, editSeck } from "@/api/seck.js";

const tree = ref(null); //树形控件的ref
const { proxy } = getCurrentInstance();
console.log(proxy.$HOST);
//分类数据
const state = reactive({
  form: {
    title: "", // 活动名称
    begintime: "", // 开始时间
    endtime: "", // 结束时间
    first_cateid: "", // 一级id
    second_cateid: "", // 二级id
    goodsid: "", // 商品编号
    status: 1, // 状态
  },
  tabIndex: "1",
  toplist: [], //一级分类列表,用于下拉列表！
  secondlist: [], // 二级分类列表,用于下拉列表！
  goodslist: [], // 商品列表
});
// 初始时间
const seckTime = ref([]);
// 日期组件配置项
const defaultTime = [
  new Date(2000, 1, 1, 12, 0, 0),
  new Date(2000, 2, 1, 8, 0, 0),
]; // '12:00:00', '08:00:00'
const shortcuts = [
  {
    text: "6小时",
    value: () => {
      const start = new Date();
      const end = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 6);
      return [start, end];
    },
  },
  {
    text: "3天",
    value: () => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
      return [start, end];
    },
  },
  {
    text: "1周",
    value: () => {
      const end = new Date();
      const start = new Date();
      end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
];

// const emit = defineEmits(["updataList"]);
// 在子组件中使用emit引用父组件的方法
const emit = defineEmits({
  refrashTable: null,
});
// 调用该方法
const refrashTable = () => {
  emit("refrashTable");
};

const props = defineProps(["editID"]);
console.log("父组件的变量", props.editID);

onMounted(async () => {
  getlist();
  //获取一条秒杀数据
  if (props.editID) {
    console.log("props.editID", props.editID);
    state.form = await getSeck(props.editID);
    // 回显时间
    let begintime = new Date(+state.form.begintime);
    let endtime = new Date(+state.form.endtime);
    seckTime.value = [begintime, endtime];
    console.log(state.form);
    console.log("%%%%%%%%%%", seckTime.value);

    // 根据当前商品的一级分类id对应的二级分类列表
    topChange(state.form.first_cateid);
    // 二级分类列表ID，获取该ID下面的商品
    secondChange(state.form.second_cateid);
  }
});

async function topChange(val) {
  // 如果选择了一级，就要去寻找一级对应的二级分类菜单
  if (val) {
    // val就是一级分类的id
    state.secondlist = await getChildCategory(val);
  } else {
    state.secondlist = [];
    state.toplist = [];
    state.goodslist = [];
    state.form.first_cateid = "";
  }
}

// 获取一级分类列表
async function getlist() {
  // 获取一级分类列表
  state.toplist = await getCategory();
}

async function secondChange(val) {
  // 如果选择了二级，就要去寻找对应商品
  if (val) {
    // val就是二级分类的id
    let res = await getCategoryGoods(state.form.first_cateid, val);
    console.log(res);
    state.goodslist = res;
  } else {
    state.goodslist = [];
  }
}

// 编辑按钮/添加按钮
const onSubmit = async (data) => {
  console.log("@@@@", seckTime.value);
  state.form.begintime = seckTime.value[0].getTime();
  state.form.endtime = seckTime.value[1].getTime();
  let res;
  if (props.editID) {
    state.form.id = props.editID; // 给表单数据添加上id
    try {
      res = await editSeck(state.form); //编辑请求
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    // 添加按钮
    try {
      console.log("submit!", { ...state.form });
      res = await addSeck(state.form);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(res);
  //   更新表格
  refrashTable();
};

// 重置表单
const resetFormData = ref(null);
const resetForm = () => {
  if (props.editID) {
    console.log(state.data);
    console.log(state.formReset);
    state.data = state.formReset;
  } else {
    resetFormData.value.resetFields();
    state.data.menus = [];
  }
};
</script>
<style lang="scss" scoped>
.block {
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}
::v-deep(.el-date-editor.el-input__wrapper) {
  padding: 5px !important;
  width: 334.46px !important;
}
.block:last-child {
  border-right: none;
}
.block .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
