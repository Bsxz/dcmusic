<script setup>
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Album from "./Album/Album.vue";
import Description from "./Description/Description.vue";
// import Similar from "./Similar/Similar.vue";

const route = useRoute();
const store = useStore();
const loading = ref(false);
const activeName = ref("专辑");

const artistdetail = computed(() => {
  return store.getters.artistdetail;
});

onBeforeMount(() => {
  store.dispatch("getArtistDetail", route.query.id);
  store.dispatch("getArtistAlbum", route.query.id);
});
onMounted(() => {
  loading.value = !loading.value;
});
</script>
<template>
  <div class="header">
    <el-skeleton animated :loading="!loading">
      <template #template>
        <el-skeleton-item variant="image" />
      </template>
      <template #default v-if="artistdetail">
        <el-card :body-style="{ width: '180px' }">
          <img :src="artistdetail.artist.cover" class="image" />
        </el-card>
      </template>
    </el-skeleton>
    <div class="hright">
      <h2>{{ artistdetail.artist.name }}</h2>
    </div>
  </div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="专辑" name="专辑">
      <Album v-show="loading" />
    </el-tab-pane>
    <el-tab-pane label="歌手详情" name="歌手详情">
      <Description v-show="loading" />
    </el-tab-pane>
    <!-- <el-tab-pane label="相似歌手" name="相似歌手">
      <Similar />
    </el-tab-pane> -->
  </el-tabs>
</template>
<style lang="less" scoped>
.header {
  display: flex;
  width: 100%;
  height: 180px;
  margin-bottom: 30px;

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
  }
}

.el-breadcrumb__item {
  font-size: 18px;
  height: 30px;
  margin: 0 30px 30px 0;

  :deep(.el-breadcrumb__inner) {
    font-weight: 500;
    height: 24px;

    &:hover {
      cursor: pointer;
      color: @active;
    }
  }
}

.focus {
  :deep(.el-breadcrumb__inner) {
    color: @active;
    border-bottom: 3px solid @active;
  }
}
</style>
