<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import Login from "@/components/Login/Login.vue";
import { useStore } from "vuex";
import { ElMessage, ElMessageBox } from "element-plus";

const router = useRouter();
const store = useStore();
const infoLogin = ref(false);
const infoMenu = ref(false);
const data = reactive({
  input: "",
  placeholder: "搜索音乐",
  prefix: true,
  suffix: false,
});
function back() {
  router.back();
}

function forward() {
  router.go(1);
}
async function search() {
  if (data.input === "") return;
  router.push({ path: "/search", query: { keywords: data.input } });
}
function showinfosuffix() {
  data.placeholder = "";
  data.prefix = false;
  data.suffix = true;
}

function showinfoprefix() {
  data.placeholder = "搜索音乐";
  if (data.input) return;
  data.prefix = true;
  data.suffix = false;
}
function login() {
  if (!store.state.LoginStatus) {
    infoLogin.value = true;
  } else {
    ElMessage({
      message: "已经登入",
      type: "warning",
      duration: 1000,
    });
  }
}

const isLogin = (v) => {
  infoMenu.value = true;
  infoLogin.value = v;
};
function outLogin() {
  ElMessageBox.confirm("确定要退出吗?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "退出登入成功",
      });
      store.dispatch("logingout");
      infoMenu.value = false;
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消退出登入",
      });
    });
}
const profile = computed(() => {
  return store.getters.profile;
});
</script>
<template>
  <el-header>
    <el-row>
      <el-col :span="16">
        <el-icon class="arrowleft" @click="forward()" size="16px"
          ><ArrowLeft
        /></el-icon>
        <el-icon class="arrowright" @click="back()" size="16px"
          ><ArrowRight
        /></el-icon>
        <el-input
          v-model="data.input"
          @focus="showinfosuffix()"
          @blur="showinfoprefix()"
          @keydown.enter="search"
          :placeholder="data.placeholder"
        >
          <template #prefix>
            <el-icon v-if="data.prefix ? 'Search' : ''"><Search /></el-icon>
          </template>
          <template #suffix>
            <el-icon v-if="data.suffix ? 'Search' : ''" @click="search"
              ><Search @click="search"
            /></el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-avatar
          v-if="profile"
          class="avatar"
          @click="login"
          :src="profile.avatarUrl"
        ></el-avatar>
        <el-avatar v-else class="avatar" @click="login"></el-avatar>
        <template v-if="store.state.LoginStatus">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ profile.nickname
              }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="outLogin">退出登入</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-col>
    </el-row>
  </el-header>
  <Login v-if="infoLogin" @isLogin="isLogin"></Login>
</template>
<style lang="less" scoped>
.el-header {
  height: 60px;
  box-shadow: 0 1px #000;
  .arrowleft,
  .arrowright {
    margin: 22px -5px 10px 17px;
    cursor: pointer; // 后期需要修改  无路由时变为默认指针，有路由时变为pointer
  }

  .el-input {
    width: 260px;
    left: 100px;
    top: -4px;
    :deep(.el-input__wrapper) {
      border-radius: 20px;
      .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
      .el-input__suffix:hover {
        cursor: pointer;
      }
    }
  }
  .el-col-8 {
    height: 60px;
    .avatar {
      border: 1px solid #000;
      margin: 10px;
      cursor: pointer;
    }
    .el-dropdown {
      vertical-align: 14px;
      span {
        opacity: 0.6;
        color: #000;
        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
}
.el-dropdown-menu {
  --el-dropdown-menuItem-hover-color: var(--el-text-color-regular);
  --el-dropdown-menuItem-hover-fill: #ccc;
}
</style>
