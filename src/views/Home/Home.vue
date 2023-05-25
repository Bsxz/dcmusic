<script setup>
import Aside from "@/components/Aside/Aside.vue";
import Header from "@/components/Header/Header.vue";
import Core from "@/components/Core/Core.vue";
import Play from "@/components/Play/Play.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
const store = useStore();

onBeforeMount(() => {
  // console.log("1510208898");
  console.log(localStorage.getItem("cookies"));
  if (localStorage.getItem("cookies")) {
    console.log(1);
    store.dispatch("getAcount");
    store.dispatch("getUserLikelist", store.state.user.account.id);
  }
});
</script>
<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container direction="vertical">
        <Header />
        <Core></Core>
        <Play></Play>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
.common-layout {
  width: 100%;
  min-width: 1300px;
  height: 100vh;
  user-select: none;
  -moz-user-select: none;
}

.el-aside {
  height: 100vh;
  overflow: hidden;
}
</style>
