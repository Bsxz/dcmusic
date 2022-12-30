<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { RECEIVE_PLAYQUEUE } from "@/store/mutations-type.js";
const store = useStore();
const router = useRouter();
defineProps(["songlists"]);
const likes = ref(false);
function dbclic(item, songlists) {
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
    store.commit(RECEIVE_PLAYQUEUE, songlists);
  }
}
function islikes(item) {
  // console.log(item);
}
function gotoAblum(path, id) {
  router.push({ path, query: { id } });
}

function gotoSinger(path, id) {
  router.push({ path, query: { id } });
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
    <el-col :span="6">
      <span>专辑</span>
    </el-col>
    <el-col :span="2">
      <span>时长</span>
    </el-col>
  </el-row>
  <el-row
    class="playlist"
    v-for="(item, index) in songlists"
    :key="item"
    @dblclick="dbclic(item, songlists)"
  >
    <el-col :span="1">
      <span>{{ index + 1 < 10 ? "0" + (index + 1) : index + 1 }}</span>
    </el-col>
    <el-col :span="9">
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
      <span style="margin-left: 20px">{{ item.name }}</span>
    </el-col>
    <el-col :span="6">
      <span @click="gotoSinger('/singerdetails', item.ar[0].id)">{{
        item.ar[0].name
      }}</span>
    </el-col>
    <el-col :span="6" class="maxw">
      <span @click="gotoAblum('/albumlistdetails', item.al.id)">{{
        item.al.name
      }}</span>
    </el-col>
    <el-col :span="2">
      <span>{{ store.getters.timeFormat(item.dt / 1000) }}</span>
    </el-col>
  </el-row>
</template>
<style lang="less" scoped>
.headline {
  padding: 0 8px;
  height: 30px;

  span {
    cursor: pointer;
  }
}

.playlist {
  margin-bottom: 5px;
  height: 40px;
  line-height: 40px;
  padding: 0 8px;

  &:hover {
    background-color: rgba(204, 204, 204, 0.179);
  }
  .el-col {
    span {
      width: 160px;
      display: inline-block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 14px;
      &:hover {
        cursor: default;
      }
    }

    &:nth-of-type(n + 3) span {
      cursor: pointer;
      &:hover {
        color: @active;
      }
    }
  }

  .icon {
    font-size: 18px;
    vertical-align: 10px;
    &:hover {
      cursor: pointer;
      color: red;
    }
  }
}
</style>
