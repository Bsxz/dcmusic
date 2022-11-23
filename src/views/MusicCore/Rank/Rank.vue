<script setup>
import Billboard from "@/views/MusicCore/Rank/Billboard/Billboard.vue";
import RankList from "@/views/MusicCore/Rank/RankList/RankList.vue";
import { onBeforeMount, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onBeforeMount(() => {
  store.dispatch("getToplistDetail");
});

onMounted(() => {
  console.log(store.state.toplistdetail.gflist);
  console.log(store.state.toplistdetail.qulist);
});
</script>
<template>
  <el-row>
    <Billboard
      v-for="item in store.state.toplistdetail.gflist"
      :gflists="item"
      :key="item.id"
    />
  </el-row>

  <h2>全球榜</h2>
  <el-row>
    <RankList
      v-for="item in store.state.toplistdetail.qulist"
      :key="item.id"
      :qulists="item"
    />
  </el-row>
</template>
<style lang="less" scoped>
h2 {
  margin: 10px 0 30px 0;
  font-size: 24px;
  font-weight: 400;
}
.el-row {
  justify-content: flex-start;
}
</style>
