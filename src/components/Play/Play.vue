<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../../store";
const router = useRouter();
const route = useRoute();
const controls = reactive({
  play: false,
});
const value = ref(50);
const isinfo = ref(false);
const likes = ref(false);
const playlistinfo = ref(false);
const playqueue = computed(() => {
  return store.state.playqueue;
});
let timer = null;
function isplay() {
  controls.play = !controls.play;
}
function islikes() {
  likes.value = !likes.value;
}

function mouseenter() {
  if (timer != null) {
    clearTimeout(timer);
    timer = null;
    isinfo.value = true;
  }
  isinfo.value = true;
}

function mouseleave() {
  if (timer === null)
    timer = setTimeout(() => {
      isinfo.value = false;
      timer = null;
    }, 300);
}
function goto(path, id) {
  store.dispatch("getArtistDetail", route.query.id);
  store.dispatch("getArtistAlbum", route.query.id);
  router.push({ path, query: { id } });
}
function isShow() {
  playlistinfo.value = !playlistinfo.value;
}
</script>
<template>
  <el-footer>
    <el-row>
      <el-col :span="2">
        <img
          src="https://p8.itc.cn/q_70/images03/20221104/e4ca49cface64cd2893d47993826a228.jpeg"
          alt=""
        />
      </el-col>
      <el-col :span="7">
        <ul>
          <li>歌曲名字</li>
          <svg
            class="icon"
            aria-hidden="true"
            v-show="!likes"
            @click="islikes(item)"
          >
            <use xlink:href="#my-icon-aixin"></use>
          </svg>
          <svg
            class="icon"
            aria-hidden="true"
            v-show="likes"
            @click="islikes(item)"
          >
            <use xlink:href="#my-icon-aixin1"></use>
          </svg>
        </ul>
      </el-col>
      <el-col :span="8">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#my-icon-diyiyeshouyeshangyishou"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="isplay"
          v-show="controls.play"
        >
          <use xlink:href="#my-icon-weibiaoti518-copy"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="isplay"
          v-show="!controls.play"
        >
          <use xlink:href="#my-icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#my-icon-zuihouyiyemoyexiayishou"></use>
        </svg>
        <el-slider
          v-model="value"
          vertical
          height="200px"
          v-show="isinfo"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        />
        <svg
          class="icon"
          aria-hidden="true"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <use xlink:href="#my-icon-shengyin"></use>
        </svg>
      </el-col>
      <el-col :span="6">
        <svg class="icon" aria-hidden="true" @click="isShow">
          <use xlink:href="#my-icon-bofangduilie"></use>
        </svg>
      </el-col>
    </el-row>
  </el-footer>
  <!-- 播放列表 -->
  <transition name="indicate">
    <el-aside v-show="playlistinfo">
      <div class="header">
        <h2>播放队列</h2>
        <span>{{ playqueue.length }}首歌曲</span>
      </div>
      <el-scrollbar max-height="80vh">
        <div
          class="bigbox"
          @mouseenter="showhover(item)"
          @mouseleave="showhover(item)"
          v-for="playqueue in playqueue"
          :key="playqueue"
        >
          <div class="partname">
            <span>{{ playqueue.al.name }}</span>
            <span @click="goto('/SingerDetails', playqueue.ar[0].id)">{{
              playqueue.ar[0].name
            }}</span>
            <span>{{
              new Date(playqueue.dt).getMinutes() < 10
                ? "0" +
                  new Date(playqueue.dt).getMinutes() +
                  ":" +
                  (new Date(playqueue.dt).getSeconds() < 10
                    ? new Date(playqueue.dt).getSeconds() + "0"
                    : new Date(playqueue.dt).getSeconds())
                : new Date(playqueue.dt).getMinutes() +
                  ":" +
                  new Date(playqueue.dt).getSeconds()
            }}</span>
          </div>
        </div>
      </el-scrollbar>
      <div class="bottom">
        <svg class="icon" aria-hidden="true" @click="isShow">
          <use xlink:href="#my-icon-bofangduilie"></use>
        </svg>
        <span @click="isShow">收起</span>
      </div>
    </el-aside>
  </transition>
</template>
<style lang="less" scoped>
.indicate-enter-active {
  animation: indicate 0.3s linear;
}

.indicate-leave-active {
  animation: indicate 0.3s linear reverse;
}

@keyframes indicate {
  from {
    transform: translateX(100%);
  }
  to {
    transfrom: translateX(0px);
  }
}
.el-aside {
  position: fixed;
  right: 0;
  width: 350px;
  height: 100vh;
  z-index: 99999;
  box-shadow: -1px 0 1px rgb(240, 237, 237);
  background-color: #fff;
  .header {
    height: 6vh;
    padding: 22px 25px;
    h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
    }
  }
  .el-scrollbar {
    height: 80%;
    .bigbox {
      display: flex;
      justify-items: center;
      height: 30px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
        background-color: rgba(204, 204, 204, 0.152);
      }
      .partname {
        display: flex;
        width: 100%;
        padding: 10px 25px;
        align-items: center;
        justify-content: flex-start;
        span {
          width: 120px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-child(2) {
            width: 100px;
            margin: 0 20px;
            &:hover {
              cursor: pointer;
            }
          }
          &:nth-child(3) {
            width: 40px;
          }
        }
      }
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 6vh;
    margin: 10px 0 0 -30px;
    &:hover {
      color: @active;
      cursor: pointer;
    }
    .icon {
      font-size: 20px;
    }
  }
}
.el-footer {
  height: 12vh;
  box-shadow: 1px -2px 1px #ccc;
  background-color: #f6f6f6;
  margin-top: 4px;
  .el-row {
    align-items: center;
    .el-col-2 {
      img {
        margin-left: 19px;
        height: 60px;
        width: 60px;
        border-radius: 5px;
      }
    }
    .el-col-7 {
      ul {
        margin: 22px 0;
        li {
          margin-top: 5px;
        }
      }
      .icon {
        font-size: 14px;
        margin: 10px 20px 0 0;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .el-col-8 {
      .el-slider {
        --el-border-color-light: rgba(204, 204, 204, 0.381);
        --el-slider-height: 8px;
        position: absolute;
        bottom: 60px;
        width: 21px !important;
        height: 212px;
        margin-left: 4px;
        border-radius: 5px;
        background-color: #fff;
        :deep(.el-slider__bar) {
          margin-left: -9px;
        }
        :deep(.el-slider__button-wrapper) {
          .el-slider__button {
            width: 10px;
            height: 10px;
            margin-left: -16px;
            transform: scale(1.1) !important;
          }
        }
      }
      .icon {
        margin-right: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .el-col-6 {
      text-align: right;
      .icon {
        font-size: 30px;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
