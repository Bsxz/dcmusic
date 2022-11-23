<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["qulists"]);
const router = useRouter();
const loading = ref(true);
function goto(id, path) {
  router.push({ path, query: { id } });
}

onMounted(() => {
  if (props.qulists != []) {
    loading.value = !loading.value;
  }
});
</script>
<template>
  <el-col :span="4">
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
          @click="goto(qulists.id, '/songlistdetails')"
        >
          <img :src="qulists.coverImgUrl" class="image" />
          <div>
            <span>{{ qulists.name }}</span>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </el-col>
</template>
<style lang="less" scoped>
.el-col-4 {
  flex: 1 0 0;
  min-width: 100% / 7;
  max-width: 100% / 6;
  margin: 0 5px;
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
        width: 160;
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
