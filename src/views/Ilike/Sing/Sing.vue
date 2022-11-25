<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { RECEIVE_PLAYQUEUE } from "@/store/mutations-type.js";
const store = useStore();
defineProps(["playlist"]);
const likes = ref(false);
function dbclic(item) {
  if (store.state.playqueue.some((queue) => queue.id === item.id)) {
    ElMessage({
      message: "播放队列中已有此歌曲",
      type: "warning",
    });
  } else {
    ElMessage({
      message: "添加成功",
      type: "success",
    });
    store.commit(RECEIVE_PLAYQUEUE, item);
  }
}
function islikes(item) {
  console.log(item.id);
  likes.value = !likes.value;
}
</script>
<template>
  <el-row class="headline">
    <el-col :span="10">
      <span>歌曲</span>
    </el-col>
    <el-col :span="6">
      <span>歌手</span>
    </el-col>
    <el-col :span="8">
      <span>专辑</span>
    </el-col>
  </el-row>
  <el-row
    class="playlist"
    v-for="item in playlist"
    @dblclick="dbclic(item)"
    :key="item"
  >
    <el-col :span="10">
      <span v-show="playlist">
        <svg
          class="icon"
          aria-hidden="true"
          v-show="!store.getters.islike(item.id)"
          @click.stop="islikes(item)"
        >
          <use xlink:href="#my-icon-aixin"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          v-show="store.getters.islike(item.id)"
          @click.stop="islikes(item)"
        >
          <use xlink:href="#my-icon-aixin1"></use>
        </svg>
      </span>
      <span>{{ item.name }}</span>
    </el-col>
    <el-col :span="6">
      <span>{{ item.ar[0].name }}</span>
    </el-col>
    <el-col :span="8">
      <span>{{ item.al.name }}</span>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.headline {
  padding: 0 8px 0 0;
  height: 30px;

  span {
    cursor: pointer;
  }
}

.playlist {
  margin-bottom: 5px;
  height: 40px;
  line-height: 40px;

  &:hover {
    background-color: rgba(204, 204, 204, 0.5);
  }
  .el-col {
    &:nth-of-type(n + 2) span:hover {
      cursor: pointer;
      color: @active;
    }
    .icon {
      font-size: 14px;
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  span {
    font-size: 14px;

    &:hover {
      cursor: default;
    }
  }

  .iconfont {
    font-size: 18px;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }
}
</style>
