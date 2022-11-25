<script setup>
import Songs from "@/components/Songs/Songs.vue";
import { RECEIVE_SEARCHLIST } from "@/store/mutations-type.js";
import { reqsearchsongs } from "@/Api/api_playlist.js";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
async function currentchange(num) {
  const offset = num * 30;
  const result = await reqsearchsongs(route.query.keywords, offset);
  store.commit(RECEIVE_SEARCHLIST, { songs: result.result.songs });
}

onBeforeMount(async () => {
  console.log(route.query.keywords);
  const result = await reqsearchsongs(route.query.keywords);
  store.commit(RECEIVE_SEARCHLIST, { songs: result.result.songs });
});
</script>
<template>
  搜索页面
  <Songs v-if="store.state.searchsongs" :songlists="store.state.searchsongs" />
  <el-pagination
    :page-size="30"
    :pager-count="11"
    @current-change="currentchange"
    layout="prev, pager, next"
    :total="90"
  />
</template>
<style lang="less" scoped>
.el-pagination {
  margin-top: 40px;
  justify-content: center;
}
</style>
