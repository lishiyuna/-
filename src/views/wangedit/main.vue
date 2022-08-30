<template>
  <div>
    <!-- wang -->
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <button @click="newly(shallow)">点击新增</button>
      <button @click="Modify">点击修改</button>
      <button @click="dele">点击删除</button>
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
</template>
<script>
import { computed, reactive, toRaw } from "vue";
import axios from "axios";
import "@wangeditor/editor/dist/css/style.css";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
  setup() {
    //表格内容
   
    //表格插件
 
    //wangedit内容区
    const shallow = ref("");
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef();
    // 内容 HTML
    const valueHtml = ref("");
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
      console.log("change:", editor.getHtml());
      shallow.value = editor.getHtml();
    };
    //点击按钮新增接口
    const newly = async (value) => {
      //   console.log("change:", editor.getHtml());
      console.log(value);
      let list = await axios({
        url: "http://127.0.0.1:3007/api/table",
        method: "post",
        data: {
          content: value,
        },
      });
      console.log(list);
    };
    //点击按钮修改接口
    const Modify = () => {
      alert(111);
    };
    //点击删除接口
    const dele = () => {
      alert(111);
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
    return {
      tableData,
      newly,
      Modify,
      dele,
      shallow,
      // InitEditor,
      editorRef,
      mode: "default",
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      //   insertText,
      //   printHtml,
      //   disable,
    };
  },
};
</script>
<style lang="scss" scoped></style>
