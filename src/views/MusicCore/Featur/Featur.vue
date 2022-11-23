<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import Playlist from "@/components/Playlist/Playlist.vue";
import { useStore } from "vuex";

const store = useStore();
const loading = ref(true);

function goto(item) {
  if (item.url) window.location.href = item.url;
}

onBeforeMount(() => {
  store.dispatch("getHighquality");
  store.dispatch("getBanner");
});
onMounted(() => {
  if (store.state.banner != []) {
    loading.value = !loading.value;
  }
});
</script>
<template>
  <el-skeleton :loading="loading" animated>
    <template #template>
      <el-carousel indicator-position="outside" trigger="click">
        <el-carousel-item>
          <el-skeleton-item></el-skeleton-item>
        </el-carousel-item>
      </el-carousel>
    </template>
    <template #default>
      <el-carousel indicator-position="outside" trigger="click">
        <el-carousel-item
          v-for="item in store.state.banner"
          :key="item"
          @click="goto(item)"
        >
          <img :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </template>
  </el-skeleton>
  <h2>热门歌单</h2>
  <el-row>
    <Playlist
      v-for="item in store.state.highquality"
      :songlist="item"
      :key="item.id"
    />
  </el-row>
</template>
<style lang="less" scoped>
:deep(.el-carousel__container) {
  height: 400px;

  &:hover {
    cursor: pointer;
  }

  img {
    width: 100%;
  }
}

:deep(.el-carousel__indicator) {
  margin: 0 10px;
}

:deep(.el-carousel__arrow) {
  .el-icon {
    font-size: 30px;
  }
}

:deep(.el-carousel__button) {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-bottom: 30px;

  &:hover {
    opacity: 1 !important;
    background-color: greenyellow;
  }
}

:deep(.el-carousel__indicators--outside) button {
  background-color: #000;
}

h2 {
  font-size: 30px;
  font-weight: 500;
  margin-bottom: 30px;
}

.el-skeleton__item {
  height: 400px;
  margin-bottom: 40px;
}

.is-animated {
  margin-bottom: 64px;

  :deep(.el-carousel__indicators) {
    display: none;
  }
}
</style>
