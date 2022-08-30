import { login } from "@/api/user";
export default {
  state: {
    isLogin: localStorage.getItem("VUE_ADMIN_ISLOGIN") || false,
    token: localStorage.getItem("VUE_ADMIN_TOKEN") || "",
    menus: JSON.parse(localStorage.getItem("VUE_ADMIN_MENULIST")) || [],
    adminName: JSON.parse(localStorage.getItem("VUE_ADMIN_ADMINNAME")) || ""
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    // 设置token
    setTooken(state, data) {
      state.token = data;
      localStorage.setItem("VUE_ADMIN_TOKEN", data);
    },
    // 设置登录状态
    setLoginState(state, flag) {
      state.isLogin = flag;
      localStorage.setItem("VUE_ADMIN_ISLOGIN", flag);
    },
    //退出登录
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("VUE_ADMIN_ISLOGIN");
      state.token = "";
      localStorage.removeItem("VUE_ADMIN_TOKEN");
      state.menuList = [];
      localStorage.removeItem("VUE_ADMIN_MENULIST");
    },
    //设置menu菜单
    setMenus(state, data) {
      localStorage.setItem("VUE_ADMIN_MENULIST", JSON.stringify(data));
      state.menus = data
    },
    
    //设置管理员姓名
    setAdminName(state, data) {
      state.adminName = data
      localStorage.setItem("VUE_ADMIN_ADMINNAME", JSON.stringify(data));
    }
  },
  actions: {
    // 处理登录的业务逻辑
    async handleLogin({ commit }, data) {
      try {
        const res = await login(data);
        console.log(res);
        if (res.token) {
          // 登录成功，设置 token
          commit("setTooken", res.token);
          commit("setLoginState", true);
          //设置菜单
          commit("setMenus", res.menus);
          commit("setAdminName", { name: res.data.username, id: res.data.id });
          return true;
        } else {
          return Promise.reject("用户名或密码出错");
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
};
