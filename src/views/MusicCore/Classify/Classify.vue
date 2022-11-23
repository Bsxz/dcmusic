<script setup>
import SongListFour from "@/components/Playlist/Playlist.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
let tag = ref("全部");
function getTaglist(cat) {
  tag.value = cat;
  if (cat) {
    store.dispatch("getToplist", { cat });
  } else {
    store.dispatch("getToplist");
  }
}
onBeforeMount(() => {
  store.dispatch("getTags");
  store.dispatch("getToplist");
});
const isfocus = computed(() => {
  return tag.value;
});
</script>
<template>
  <el-row class="header" v-if="store.state.tags">
    <el-col
      :span="4"
      :class="{ isfocus: isfocus === '全部' }"
      @click="getTaglist('全部')"
    >
      <span>全部</span>
    </el-col>
    <el-col
      :span="4"
      v-for="item in store.state.tags"
      :class="{ isfocus: isfocus === item.name }"
      :key="item.id"
      @click="getTaglist(item.name)"
    >
      <span>{{ item.name }}</span>
    </el-col>
  </el-row>
  <h2>精选歌单</h2>
  <el-row>
    <SongListFour
      v-for="item in store.state.toplisttags"
      :songlist="item"
      :key="item"
    />
  </el-row>
</template>
<style lang="less" scoped>
.header {
  .el-col-4 {
    min-height: 32px;
    max-width: 192px;
    text-align: center;
    background-color: rgba(204, 204, 204, 0.8);
    line-height: 32px;
    margin: 0 14px 10px 0;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
      background-color: #ccc;
    }
  }
  .isfocus {
    color: #fff;
    background-color: @active !important;
  }
}

h2 {
  font-size: 24px;
  font-weight: 500;
  margin: 20px 0;
}
</style>
