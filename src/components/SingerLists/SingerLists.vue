<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps(["artistList"]);
const store = useStore();
const router = useRouter();
const loading = ref(true);

function goto(id, path) {
  store.dispatch("getArtistDetail", id);
  router.push({ path });
}
onMounted(() => {
  if (props.artistList) {
    loading.value = !loading.value;
  }
});
</script>
<template>
  <el-col :span="4">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item variant="image"></el-skeleton-item>
        <el-skeleton-item></el-skeleton-item>
      </template>
      <template #default>
        <el-card @click="goto(props.artistList.id, '/home/singerdetails')">
          <img :src="props.artistList.img1v1Url" />
          <div>
            <span>{{ props.artistList.name }}</span>
          </div>
        </el-card>
      </template>
    </el-skeleton>
  </el-col>
</template>
<style lang="less" scoped>
.el-col-4 {
  max-width: 160px;
  margin: 18px;
  height: 200px;
  .el-skeleton__image {
    width: 160px;
    height: 160px;
    background-color: #ccc;
    border-radius: 80px;
  }
  .el-skeleton__text {
    width: 120px;
    margin: 18px 0 0 20px;
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
        border-radius: 80px;
      }
      div {
        margin: 18px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
      }
    }
  }
}
</style>
