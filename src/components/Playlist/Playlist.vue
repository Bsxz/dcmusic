<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps(["songlist"]);
const router = useRouter();
const loading = ref(true);

function goto(id, path) {
  router.push({ path, query: { id } });
}

onMounted(() => {
  if (props.songlist != []) {
    loading.value = !loading.value;
  }
});
</script>
<template>
  <el-col :span="4" v-if="songlist">
    <el-skeleton style="width: 160px" :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image" />
        <div>
          <el-skeleton-item variant="p" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-bottom: 28px;
            "
          ></div>
        </div>
      </template>
      <template #default>
        <el-card
          :body-style="{ width: '160px' }"
          @click="goto(songlist.id, '/songlistdetails')"
        >
          <img :src="songlist.coverImgUrl" class="image" />
          <div>
            <span>{{ songlist.name }}</span>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </el-col>
</template>
<style lang="less" scoped>
.el-col-4 {
  flex: 1 0 0;

  &:last-child {
    margin: 0;
  }

  .el-skeleton__image {
    width: 160px;
    height: 160px;
    border-radius: 10px;
    margin-bottom: 8px;

    &:hover {
      transform: translateY(-10px);
    }
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
        width: 160px;
        height: 160px;
        border-radius: 10px;
        margin-bottom: 8px;

        &:hover {
          transform: translateY(-10px);
          cursor: pointer;
        }
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
}
</style>
