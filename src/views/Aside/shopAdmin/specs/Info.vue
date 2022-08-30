<template>
  <el-form :model="state.form" ref="resetFormData" >
    <el-form-item label="属性名" prop="specsname">
      <el-input placeholder="请输入属性名" v-model="state.form.specsname" />
    </el-form-item>
    <el-form-item label="属性值" prop="attrs">
      <el-input placeholder="请输入新增属性" v-model="state.newAttr"
        ><template #append>
          <el-button
            @click="addAttr(state.newAttr)"
            icon="Plus"
            type="primary" /></template
      ></el-input>

      <div
        style="
          border: 2px solid #dcdfe6;
          padding: 5px 5px 0 5px;
          border-radius: 5px;
          margin-top: 5px;
        "
        v-if="!state.form.attrs.length == 0"
      >
        <div class="attrBox" v-for="(item, idx) in state.form.attrs" :key="idx">
          <el-input v-model="item.value"
            ><template #append>
              <el-button
                icon="Delete"
                @click="delAttr(idx)"
                type="primary"
              /> </template
          ></el-input>
        </div>
      </div>
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
import { reactive, ref, onMounted } from "vue";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message/style/css";
//引入封装删除获取菜单api
import { addSpecs, getSpecs, editSpecs } from "@/api/specs.js";
const tree = ref(null); //树形控件的ref
//分类数据
const state = reactive({
  form: {
    attrs: [],
    specsname: "",
    status: 1,
  },
  newAttr: "",
  attrList: [{ value: "" }],
});

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
  //获取一条分类数据
  if (props.editID) {
    console.log("props.editID", props.editID);
    let res = await getSpecs({ id: props.editID });

    console.log(res);
    state.form = res[0];
    state.form.attrs = state.form.attrs.map((val) => {
      return { value: val };
    });
  }
});
// 新增/删除属性  attrs: "qqq,wwww"
const addAttr = (val) => {
  console.log(val);
  state.form.attrs.push({ value: val });
  console.log("state.form.attrs", state.form.attrs);
  state.newAttr = "";
};
const delAttr = (index) => {
  state.form.attrs.splice(index, 1);
};

// 编辑按钮/添加按钮
const onSubmit = async () => {
  let res;
  state.form.id = props.editID; // 给表单数据添加上id
  state.form.attrs = state.form.attrs.map((val) => {
    return val.value;
  });
  state.form.attrs = state.form.attrs.toString();
  if (props.editID) {
    try {
      res = await editSpecs(state.form); //编辑请求
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    // 添加按钮
    try {
      console.log("submit!", { ...state.form });
      res = await addSpecs(state.form);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(res);
  if (res) {
    ElMessage.success(res.msg);
  }
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
.attrBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  .el-input-group__append {
    width: 30px;
  }
}
</style>
