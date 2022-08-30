<template>
  <div>
    <el-table :data="tableData.todo" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="title" label="content" width="180" />
      <el-table-column prop="time" label="time" />
      <el-table-column align="right" >
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope" prop="id">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >查看总览</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <!-- wang -->
      <div style="border: 1px solid #ccc; margin-top: 10px">
        <el-button type="primary" @click="newly(shallow)">点击新增</el-button>
        <el-button type="primary" @click="Modify">点击修改</el-button>
        <el-button type="primary" @click="dele">点击清空内容区</el-button>
        <input
          type="text"
          placeholder="请入如要插入链接名称"
          v-model="inputref"
        />
        <Toolbar
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
          style="border-bottom: 1px solid #ccc"
        />
        <Editor
          :defaultConfig="editorConfig"
          :mode="mode"
          v-model="valueHtml"
          style="height: 400px; overflow-y: hidden"
          @onCreated="handleCreated"
          @onChange="handleChange"
          @onDestroyed="handleDestroyed"
          @onFocus="handleFocus"
          @onBlur="handleBlur"
          @customAlert="customAlert"
          @customPaste="customPaste"
        />
      </div>
      <div style="margin-top: 10px">
        <textarea
          v-model="valueHtml"
          readonly
          style="width: 100%; height: 200px; outline: none"
        ></textarea>
      </div>
    </div>
  </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  computed,
  reactive,
  toRaw,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {
  expents,
  table,
  article,
  Modifyarticle,
  delectinterface,
} from "../../api/Experts.js";

const shallow = ref("");
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
// 内容 HTML
const valueHtml = ref("");
const tableData = reactive({
  todo: [],
});
const actionhtml = reactive({
  id: "",
  content: "",
  title: "",
  time: "",
  contentText: "",
});
const inputref = ref(null);
// components: { Editor, Toolbar },
//根据id获取文章
async function handleEdit(index, row) {
  // console.log(index, row);
  let arti = await article((index + 1).toString());
  //console.log(arti.data[0].content);
  valueHtml.value = arti.data[0].content;
  console.log((index + 1).toString());
  actionhtml.id = (index + 1).toString();
}
//删除发送请求
async function handleDelete(index) {
  console.log(index);
  await delectinterface(index);
}
onMounted(async () => {
  let value = await expents();
  console.log(value.data);
  tableData.todo = value.data;
});
// 模拟 ajax 异步获取内容
onMounted(async () => {
  // let value = await axios({
  //   url: "http://127.0.0.1:3007/api/nav",
  //   method: "get",
  // });
  // tableData.data = value.data.data;
  // console.log(tableData.data);
});
const toolbarConfig = {};
// const editorConfig = { placeholder: "请输入内容..." };
// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
// 编辑器回调函数
const handleCreated = (editor) => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const editorConfig = {
  MENU_CONF: {
    uploadImage: {
      // 上传图片的配置 base64
      //base64LimitSize: 10 * 1024 * 1024, // 1M
      // timeout: 5 * 1000, // 5 秒
      fieldName: "avatar",
      server: "http://127.0.0.1:3007/api/ipload",
      allowedFileTypes: ["image/*"],
      // 单个文件上传成功之后
      onSuccess(file, res) {
        // JS 语法
        console.log(`${file.name} 上传成功`, res);
      },
      // 单个文件上传失败
      onFailed(file, res) {
        // JS 语法
        console.log(`${file.name} 上传失败`, res);
      },
    },
  },
  placeholder: "请输入内容",
};
// editorConfig.onChange(editor)=>{
//     const html = editor.getHtml();
//     console.log("editor content", html);
//     // 也可以同步到 <textarea>
//   },
//change 事件
const handleChange = (editor) => {
  shallow.value = editor.getHtml();
   console.log("11111111", editor.children);
  actionhtml.content = editor.getHtml();
  actionhtml.title = editor.children[0]?.children[0]?.text;
  actionhtml.time = editor.children[1]?.children[0]?.text;
  actionhtml.contentText = editor.children[2]?.children[1]
  // console.log(editor.getText());
};
//点击按钮新增内容接口
async function newly(value) {
  await table(value, inputref.value,actionhtml.title,actionhtml.time,actionhtml.contentText);
}
//点击按钮修改接口
const Modify = async (id, content) => {
  console.log(toRaw(actionhtml));
  await Modifyarticle(toRaw(actionhtml).id, toRaw(actionhtml).content);
};
//点击删除接口
const dele = () => {
  valueHtml.value = "";
};
const handleDestroyed = (editor) => {
  console.log("destroyed", editor);
};
const handleFocus = (editor) => {
  console.log("focus", editor);
};
const handleBlur = (editor) => {
  console.log("blur", editor);
};
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`);
};
const customPaste = (editor, event, callback) => {
  console.log("ClipboardEvent 粘贴事件对象", event);
  callback(true); // 返回 true ，继续默认的粘贴行为
};
</script>
