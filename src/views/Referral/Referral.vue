<script setup>
import ReferralList from "@/components/ReferralList/ReferralList.vue";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";
const store = useStore();

onBeforeMount(async () => {
  if (store.getters.profile) {
    store.dispatch("getSongs");
    store.dispatch("getResource");
    store.dispatch("getUserSubcount", store.state.user.profile.userId);
  }
});
</script>
<template>
  <h1>推荐</h1>
  <h2>{{ store.getters.profile.nickname }} 今日为您推荐</h2>
  <el-row v-if="store.getters.resource">
    <ReferralList :songlist="store.getters.resource" />
  </el-row>
</template>
<style lang="less" scoped>
h1 {
  font-size: 32px;
  margin-bottom: 28px;
}

h2 {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 20px;
}
</style>
