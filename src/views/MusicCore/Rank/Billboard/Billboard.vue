<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const props = defineProps(["gflists"]);
const router = useRouter();
const loading = ref(true);

function goto(id, path) {
  router.push({ path, query: { id } });
}
onMounted(() => {
  if (props.gflists != []) {
    loading.value = !loading.value;
    console.log(loading.value);
  }
});
</script>
<template>
  <el-col :span="8">
    <el-skeleton :loading="loading" animated>
      <template #template>
        <el-skeleton-item
          variant="image"
          style="width: 400px; height: 160px; border-radius: 10px"
        />
      </template>
      <template #default>
        <div class="board">
          <el-card>
            <img
              :src="gflists.coverImgUrl"
              class="image"
              @click="goto(gflists.id, '/songlistdetails')"
            />
          </el-card>
          <div class="board-right">
            <h2>{{ gflists.name }}</h2>
            <ul>
              <li v-for="item in gflists.tracks" :key="item">
                <span>{{ item.first }}</span>
                <span>{{ item.second }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-col>
</template>
<style lang="less" scoped>
.el-col-8 {
  flex: 1 0 0;
  max-width: 100%/2;
  min-width: 400px;
  height: 160px;
  margin: 0 10px 20px 0;
  .board {
    height: 160px;
    width: 400px;
    border-radius: 10px;
    background-color: #ccc;
    overflow: hidden;
    &:hover {
      transform: translateY(-10px);
    }
    .el-card {
      display: inline-block;
      width: 160px;
      height: 160px;
      border: none;
      background-color: #ccc;
      :deep(.el-card__body) {
        padding: 0;
        img {
          display: inline-block;
          border-radius: 10px;
          width: 160px;
          height: 160px;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    .el-skeleton {
      display: inline-block;
      width: 160px;
      .el-skeleton__item {
        border-radius: 10px;
        width: 160px;
        height: 160px;
      }
    }
    .board-right {
      position: absolute;
      display: inline-block;
      overflow: hidden;
      width: 200px;
      margin-left: 20px;
      padding: 10px 0;
      height: 200px;
      h2 {
        font-size: 22px;
        margin-bottom: 10px;
      }

      ul {
        li {
          margin-bottom: 10px;
          span {
            width: 80px;
            overflow: hidden;
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:last-child {
              float: right;
            }
            &:hover {
              cursor: pointer;
              color: @active;
            }
          }
        }
      }
    }
  }
  .is-always-shadow {
    overflow: visible;
    box-shadow: none;
  }

  :deep(.el-card) {
    border: none;
  }
}
</style>
