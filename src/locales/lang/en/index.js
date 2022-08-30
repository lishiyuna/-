import login from "./login";
import layout from "./layout";

// 汇总所有的翻译，再暴露出去
export default {
  ...login,
  ...layout,
};
