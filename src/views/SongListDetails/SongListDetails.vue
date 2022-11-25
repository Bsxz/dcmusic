<script setup>
import { onMounted, ref, computed, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

import Songs from "@/components/Songs/Songs.vue";

const store = useStore();
const route = useRoute();
const loading = ref(true);
const activeName = ref("one");
const playlist = computed(() => {
  return store.state.playlist;
});
const trackall = computed(() => {
  return store.state.trackall;
});

onBeforeMount(() => {
  store.dispatch("getDetail", route.query.id);
  store.dispatch("getTrackAll", route.query.id);
});
onMounted(() => {
  loading.value = !loading.value;
});

watch(
  () => route.query.id,
  () => {
    store.dispatch("getDetail", route.query.id);
    store.dispatch("getTrackAll", route.query.id);
  }
);
</script>
<template>
  <div class="header">
    <el-skeleton animated :loading="loading">
      <template #template>
        <el-skeleton-item variant="image" />
      </template>
      <template #default>
        <el-card :body-style="{ width: '180px' }">
          <img :src="playlist.coverImgUrl" class="image" />
        </el-card>
      </template>
    </el-skeleton>
    <div class="hright">
      <h2>{{ playlist.name }}</h2>
    </div>
  </div>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="歌曲列表" name="one">
      <Songs v-if="playlist" :songlists="trackall" />
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="less" scoped>
.header {
  display: flex;
  width: 100%;
  height: 180px;
  margin-bottom: 20px;

  .is-animated {
    height: 180px;
    width: 180px;
    padding: 10px 0;
  }

  .el-skeleton__image {
    width: 180px;
    height: 180px;
    border-radius: 10px;
    margin-bottom: 8px;
  }

  .is-always-shadow {
    overflow: visible;
    box-shadow: none;
  }

  :deep(.el-card) {
    border: none;

    .el-card__body {
      padding: 0;

      img {
        width: 180px;
        height: 180px;
        border-radius: 10px;
        margin-bottom: 8px;
      }

      div {
        margin-bottom: 28px;

        span:hover {
          cursor: pointer;
          color: @active;
        }
      }
    }
  }

  .hright {
    padding: 20px;

    h2 {
      font-size: 26px;
    }

    p {
      margin-top: 20px;
      cursor: default;

      span {
        color: blue;
        opacity: 0.8;

        &:hover {
          cursor: pointer;
          opacity: 1;
        }
      }
    }
  }
}

.el-tabs__nav-wrap::after {
  background-color: transparent;
}
</style>
