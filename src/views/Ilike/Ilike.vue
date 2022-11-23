<script setup>
import Album from "./Album/Album.vue";
import Sing from "./Sing/Sing.vue";
import SingList from "./SingList/SingList.vue";
import { onBeforeMount, ref } from "vue";
import { useStore } from "vuex";

const activeName = ref("first");
const store = useStore();

onBeforeMount(() => {
  store.dispatch("getTrackAll", store.state.user.subcount.likes[0].id);
});
</script>
<template>
  <h1>我喜欢</h1>
  <el-tabs v-model="activeName">
    <el-tab-pane label="歌曲" name="first">
      <Sing :playlist="store.state.trackall" />
    </el-tab-pane>
    <el-tab-pane label="歌单" name="second">
      <SingList />
    </el-tab-pane>
    <el-tab-pane label="专辑" name="third">
      <Album />
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="less" scoped>
h1 {
  font-size: 32px;
  margin-bottom: 28px;
}

:deep(.el-tabs__item) {
  font-size: 20px;
}
:deep(.is-active) {
  font-size: 22px;
  font-weight: 600;
}
</style>
