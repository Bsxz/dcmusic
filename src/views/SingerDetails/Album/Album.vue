<script setup>
import { computed, onBeforeMount, ref, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const loading = ref(true);

const artistalbum = computed(() => {
  return store.state.artistalbum;
});

function goto(id, path) {
  router.push({ path, query: { id } });
}

watch(artistalbum, () => {
  nextTick();
});
onBeforeMount(() => {
  if (artistalbum.value !== []) loading.value = !loading.value;
});
</script>
<template v-if="artistalbum">
  <el-row>
    <el-col :span="4" v-for="item in artistalbum" :key="item.id">
      <el-skeleton :loading="loading" animated>
        <template #template>
          <el-skeleton-item variant="image"></el-skeleton-item>
          <el-skeleton-item></el-skeleton-item>
        </template>
        <template #default>
          <el-card @click="goto(item.id, '/albumlistdetails')">
            <img :src="item.blurPicUrl" />
            <div>
              <span
                >{{ item.name }}
                <template v-if="item.alias.length != 0">
                  ({{ item.alias[0] }})
                </template>
              </span>
            </div>
          </el-card>
        </template>
      </el-skeleton>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.el-col-4 {
  max-width: 160px;
  margin: 0 40px 40px 0;
  height: 200px;

  .el-skeleton__image {
    width: 160px;
    height: 160px;
    background-color: #ccc;
  }

  .el-skeleton__text {
    width: 120px;
  }

  .is-always-shadow {
    overflow: visible;
    box-shadow: none;
  }

  :deep(.el-card) {
    border: none;

    &:hover {
      cursor: pointer;
    }

    .el-card__body {
      width: 160px;
      height: 160px;
      padding: 0;

      img {
        width: 160px;
        height: 160px;
      }

      div {
        font-size: 14px;
        font-weight: 600;
        margin-top: 14px;
        span {
          width: 160px;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
