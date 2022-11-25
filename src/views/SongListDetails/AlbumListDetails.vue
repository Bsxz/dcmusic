<script setup>
import { onMounted, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

import Songs from "@/components/Songs/Songs.vue";
import Description from "./Description/Description.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const activeName = ref("one");

function gotoSinger(path, id) {
  router.push({ path, query: { id } });
}

onBeforeMount(() => {
  store.dispatch("getAlbum", route.query.id);
});

onMounted(() => {
  loading.value = !loading.value;
});
</script>
<template>
  <div class="header">
    <el-skeleton animated :loading="loading">
      <template #template>
        <el-skeleton-item variant="image" />
      </template>
      <template #default>
        <el-card :body-style="{ width: '180px' }" v-if="store.state.album">
          <img :src="store.state.album.blurPicUrl" class="image" />
        </el-card>
      </template>
    </el-skeleton>
    <div class="hright" v-if="store.state.album.name">
      <h2>{{ store.state.album.name }}</h2>
      <p class="songer">
        歌手：<span
          @click="gotoSinger('/singerdetails', store.state.album.artist.id)"
          >{{ store.state.album.artist.name }}</span
        >
      </p>
      <p>
        专辑时间：{{ store.getters.dateFormat(store.state.album.publishTime) }}
      </p>
    </div>
  </div>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="歌曲" name="one">
      <Songs v-if="store.state.songs" :songlists="store.state.songs" />
    </el-tab-pane>
    <el-tab-pane label="专辑详情" name="tow">
      <Description
        v-if="store.state.description"
        :description="store.state.album.description"
      />
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
