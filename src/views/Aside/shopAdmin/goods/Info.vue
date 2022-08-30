<template>
  <el-scrollbar>
    <el-form :model="state.form" ref="resetFormData">
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
        <el-select v-model="state.form.second_cateid" placeholder="请选择">
          <el-option
            v-for="item in state.secondlist"
            :label="item.catename"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称" prop="goodsname">
        <el-input placeholder="请输入商品名称" v-model="state.form.goodsname" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input placeholder="请输入商品价格" v-model="state.form.price" />
      </el-form-item>
      <el-form-item label="市场价格" prop="market_price">
        <el-input
          placeholder="请输入市场价格"
          v-model="state.form.market_price"
        />
      </el-form-item>

      <el-form-item label="商品图片" prop="url">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-exceed="handleExceed"
          :on-change="fileChange"
          :file-list="state.fileList"
          ref="file"
        >
          <el-icon><Plus /></el-icon>
          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="商品规格" prop="pid">
        <el-select
          @change="specsChange"
          v-model="state.form.specsid"
          placeholder="请选择"
        >
          <el-option
            v-for="item in state.specslist"
            :label="item.specsname"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性值" prop="pid">
        <el-select multiple v-model="state.form.specsattr" placeholder="请选择">
          <el-option
            v-for="item in state.specsvaluelist"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品" prop="isnew">
        <el-radio-group v-model="state.form.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否热卖" prop="ishot">
        <el-radio-group v-model="state.form.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
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
  </el-scrollbar>
</template>

<script setup>
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
// 引入 ElMessage 组件
import { ElMessage, ElMessageBox } from "element-plus";
import "element-plus/es/components/message/style/css";
import { addGoods, getGoods, editGoods } from "@/api/goods.js";
import { getCategory, getChildCategory } from "@/api/category.js";
import { getSpecsAll, getSpecs } from "@/api/specs.js";

import { UploadProps, UploadUserFile } from "element-plus";

const route = useRoute();
const router = useRouter();
const store = useStore();
const tree = ref(null); //树形控件的ref
const { proxy } = getCurrentInstance();
console.log(proxy.$HOST);
//分类数据
const state = reactive({
  form: {
    first_cateid: "", // 一级分类id
    second_cateid: "", // 二级分类id
    goodsname: "", // 商品名称
    price: "", // 商品价格
    market_price: "", // 市场价格
    description: "", // 商品详情
    specsid: "", // 属性名id
    specsattr: [], // 属性值
    isnew: 0, // 是否新品
    ishot: 0, // 是否热门
    img: "", // 商品图片
    status: 1, // 状态
  },
  tabIndex: "1",
  toplist: [], //一级分类列表,用于下拉列表！
  secondlist: [], // 二级分类列表,用于下拉列表！
  specslist: [], //商品规格列表
  specsvaluelist: [], // 某规格对应的属性数据
  dialogVisible: false, // 弹框
  dialogImageUrl: "", // 弹框图片地址
  fileList: [], // 上传文件列表
});

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);
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

// 缩略图删除
const handleRemove = (uploadFile) => {
  state.fileList = "";
  console.log("缩略图删除", uploadFile);
};
// 缩略图放大
function handlePictureCardPreview(uploadFile) {
  dialogImageUrl.value = uploadFile.url;
  dialogVisible.value = true;
}
let file = ref(null);
// 超出限制
function handleExceed(uploadFile) {
  ElMessage.warning("只能传入一张图片哦~~");
  console.log(file);
  console.log(uploadFile);
}
//文件发生变化的回调函数
const fileChange = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url;
  //Raw才是真正的文件地址
  state.form.img = uploadFile.raw;
};
//文件发生错误的回调函数
const error = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
  console.log(uploadFiles);
};

async function getlist() {
  // 获取一级分类列表
  state.toplist = await getCategory();
  // 获取规格列表
  state.specslist = await getSpecsAll();
  console.log(state.toplist, state.specslist);
}

onMounted(async () => {
  getlist();
  //获取一条商品数据
  if (props.editID) {
    console.log("props.editID", props.editID);
    state.form = await getGoods({ id: props.editID });
    // 根据当前商品的一级分类id对应的二级分类列表
    topChange(state.form.first_cateid);
    console.log(state.form);
    state.form.specsattr = state.form.specsattr.split(",");
    // 回显图片
    let url = state.form.img ? proxy.$HOST + state.form.img : "";
    if (url) {
      state.fileList.push({ name: state.form.catename, url });
    }
    // 读取当前商品规格ID，获取该规格ID下面的属性值
    specsChange(state.form.specsid);
  }
});

async function topChange(val) {
  // 如果选择了一级，就要去寻找一级对应的二级分类菜单
  if (val) {
    // val就是一级分类的id
    state.secondlist = await getChildCategory(val);
    if (state.secondlist) {
      state.form.second_cateid = state?.secondlist[0]?.id;
    } else {
      state.form.second_cateid = "";
    }
  } else {
    state.secondlist = [];
    state.form.second_cateid = "";
  }
}

async function specsChange(val) {
  if (val) {
    // val就是规格名id
    let res = await getSpecs({ id: val });
    console.log(res);
    state.specsvaluelist = res[0].attrs;
    console.log("规格属性", state.specsvaluelist, res[0].attrs);
  } else {
    state.specsvaluelist = [];
    state.form.specsattr = [];
  }
}

// 编辑按钮/添加按钮
const onSubmit = async (data) => {
  // 发送请求！
  // 使用FormData提交数据！
  let formdata = new FormData();
  for (let k in state.form) {
    formdata.append(k, state.form[k]);
  }
  let res;
  if (props.editID) {
    formdata.append("id", props.editID); // 给表单数据添加上id
    try {
      res = await editGoods(formdata); //编辑请求
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  } else {
    // 添加按钮
    try {
      console.log("submit!", { ...formdata });
      res = await addGoods(formdata);
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
