<script setup>
import { reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store } from "../../store";
import { reqMusicUrl } from "@/Api/api_music.js";
import LyricsPage from "@/components/LyricsPage/LyricsPage.vue";
const router = useRouter();
const route = useRoute();
const controls = reactive({
  songName: "",
  singName: "",
  currentIndex: 0,
  id: "",
  picUrl: "",
  musicUrl: "",
  play: false,
  volume: 50,
  progress: 0,
  start: 0,
  end: 0,
});
const audio = ref(null);
const picUrl = ref(null);
const isinfo = ref(false);
const likes = ref(false);
const playlistinfo = ref(false);
const LyricsPageinfo = ref(false);
let timer1 = null;

function islikes() {
  likes.value = !likes.value;
}
function mouseenter() {
  if (timer1 != null) {
    clearTimeout(timer1);
    timer1 = null;
    isinfo.value = true;
  }
  isinfo.value = true;
}
function mouseleave() {
  if (timer1 === null)
    timer1 = setTimeout(() => {
      isinfo.value = false;
      timer1 = null;
    }, 300);
}
function goto(path, id) {
  store.dispatch("getArtistDetail", route.query.id);
  store.dispatch("getArtistAlbum", route.query.id);
  router.push({ path, query: { id } });
}
function isplaylistinfo() {
  playlistinfo.value = !playlistinfo.value;
}
function isLyricsPageinfo() {
  LyricsPageinfo.value = !LyricsPageinfo.value;
}
function isplay() {
  if (store.state.playqueue != null) {
    getMusicUrl(store.state.playqueue[controls.currentIndex].id);
    if (controls.musicUrl) {
      controls.play = !controls.play;
      if (controls.play) {
        setTimeout(() => {
          audio.value.play();
        }, 1);
      }
      audio.value.pause();
    }
  }
}
async function getMusicUrl(id) {
  const result = await reqMusicUrl(id);
  controls.musicUrl = result.data[0].url;
}
function playSongs(playqueue) {
  controls.currentIndex = store.state.playqueue
    .map((item) => item)
    .indexOf(playqueue);
  controls.songName = playqueue.name;
  controls.singName = playqueue.ar[0].name;
  picUrl.value.src = playqueue.al.picUrl;
  controls.end = playqueue.dt;
  getMusicUrl(playqueue.id);
}
function previous() {
  if (controls.currentIndex === -store.state.playqueue.length)
    controls.currentIndex = store.state.playlist.length;
  controls.currentIndex--;
  getMusicUrl(store.state.playqueue.at(controls.currentIndex).id);
}
function next() {
  if (controls.currentIndex === store.state.playqueue.length - 1)
    controls.currentIndex = -1;
  controls.currentIndex++;
  getMusicUrl(store.state.playqueue.at(controls.currentIndex).id);
}
function currentTime() {
  if (controls.play)
    if (controls.progress != audio.value.currentTime) {
      controls.start = audio.value.currentTime;
      controls.progress = parseInt(
        ((audio.value.currentTime * 1000) / controls.end) * 100
      );
    }
}
function changeCurrenTime() {
  audio.value.currentTime = ((controls.progress / 100) * controls.end) / 1000;
}
function volumechange() {
  audio.value.volume = controls.volume / 100;
}
function seeking() {
  const bf = store.state.playqueue.at(controls.currentIndex);
  controls.songName = bf.name;
  controls.id = bf.id;
  controls.singName = bf.ar[0].name;
  picUrl.value.src = bf.al.picUrl;
  controls.end = bf.dt;
  controls.play = true;
}
function seeked() {
  controls.play = false;
  if (store.state.playqueue.length === 1) {
    audio.value.play();
  }
  next();
}
watch(
  () => store.state.playqueue,
  (newv) => {
    controls.songName = newv[0].name;
    controls.id = newv[0].id;
    controls.singName = newv[0].ar[0].name;
    picUrl.value.src = newv[0].al.picUrl;
    controls.end = newv[0].dt;
    getMusicUrl(newv[0].id);
  },
  { deep: true }
);
</script>
<template>
  <el-footer>
    <el-row>
      <el-col :span="5">
        <img
          ref="picUrl"
          src="../../assets/logo.png"
          @click="isLyricsPageinfo"
        />
        <ul>
          <li v-show="controls.name != ''">
            <span>{{ controls.songName }}</span>
          </li>
          <li v-show="controls.name != ''">
            <span>{{ controls.singName }}</span>
          </li>
          <li v-show="controls.musicUrl">
            <svg
              class="icon"
              aria-hidden="true"
              v-show="!store.getters.islike(controls.id)"
              @click="islikes(item)"
            >
              <use xlink:href="#my-icon-aixin"></use>
            </svg>
            <svg
              class="icon"
              aria-hidden="true"
              v-show="store.getters.islike(controls.id)"
              @click="islikes(item)"
            >
              <use xlink:href="#my-icon-aixin1"></use>
            </svg>
          </li>
        </ul>
      </el-col>
      <el-col :span="13">
        <svg class="icon" aria-hidden="true" @click="previous">
          <use xlink:href="#my-icon-diyiyeshouyeshangyishou"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="isplay"
          v-show="!controls.play"
        >
          <use xlink:href="#my-icon-weibiaoti518-copy"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          @click="isplay"
          v-show="controls.play"
        >
          <use xlink:href="#my-icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="next">
          <use xlink:href="#my-icon-zuihouyiyemoyexiayishou"></use>
        </svg>
        <el-slider
          v-model="controls.volume"
          vertical
          height="200px"
          v-show="isinfo"
          :volue="controls.volume"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
          @input="volumechange"
        />
        <svg
          class="icon"
          aria-hidden="true"
          v-show="controls.volume != 0"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <use xlink:href="#my-icon-shengyin"></use>
        </svg>
        <svg
          class="icon"
          aria-hidden="true"
          v-show="controls.volume === 0"
          @mouseenter="mouseenter"
          @mouseleave="mouseleave"
        >
          <use xlink:href="#my-icon-shengyinguanbi"></use>
        </svg>
        <div class="playitem">
          <span>{{ store.getters.timeFormat(controls.start) }}</span>
          <el-slider
            v-model="controls.progress"
            :disabled="!controls.play"
            @change="changeCurrenTime"
          />
          <span>{{
            store.getters.timeFormat(
              (controls.end - controls.start * 1000) / 1000
            )
          }}</span>
        </div>
        <audio
          :src="controls.musicUrl"
          @timeupdate="currentTime"
          @play="seeking"
          @ended="seeked"
          autoplay
          ref="audio"
        ></audio>
      </el-col>
      <el-col :span="6">
        <svg class="icon" aria-hidden="true" @click="isplaylistinfo">
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
        <span>{{ store.state.playqueue.length }}首歌曲</span>
      </div>
      <el-scrollbar max-height="80vh">
        <div
          class="bigbox"
          v-for="playqueue in store.state.playqueue"
          @dblclick="playSongs(playqueue)"
          :key="playqueue"
        >
          <div class="partname">
            <span>{{ playqueue.name }}</span>
            <span @click="goto('/SingerDetails', playqueue.ar[0].id)">{{
              playqueue.ar[0].name
            }}</span>
            <span>{{ store.getters.timeFormat(playqueue.dt / 1000) }}</span>
          </div>
        </div>
      </el-scrollbar>
      <div class="bottom">
        <svg class="icon" aria-hidden="true" @click="isplaylistinfo">
          <use xlink:href="#my-icon-bofangduilie"></use>
        </svg>
        <span @click="isplaylistinfo">收起</span>
      </div>
    </el-aside>
  </transition>
  <!-- 歌词页面 -->
  <transition name="LyricsPage">
    <LyricsPage
      v-show="LyricsPageinfo"
      :song="store.state.playqueue[controls.currentIndex]"
      :isLyricsPageinfo="isLyricsPageinfo"
      :start="controls.start"
    />
  </transition>
</template>
<style lang="less" scoped>
.indicate-enter-active {
  animation: indicate 0.3s linear;
}

.indicate-leave-active {
  animation: indicate 0.3s linear reverse;
}
.LyricsPage-enter-active {
  animation: LyricsPage 0.3s linear;
}
.LyricsPage-leave-active {
  animation: LyricsPage 0.3s linear reverse;
}
@keyframes indicate {
  from {
    transform: translateX(100%);
  }
  to {
    transfrom: translateX(0px);
  }
}
@keyframes LyricsPage {
  from {
    transform: translateY(112%);
  }
  to {
    transfrom: translateY(0px);
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
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  z-index: 4;
  box-shadow: 1px -2px 1px #ccc;
  background-color: #f6f6f6;
  .el-row {
    align-items: center;
    .el-col-5 {
      display: flex;
      align-items: center;
      max-width: 17%;
      flex-basis: 17%;
      margin: 4px 0;
      overflow: hidden;
      img {
        margin-right: 19px;
        height: 60px;
        width: 60px;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
        }
      }
      ul {
        li {
          width: 160px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:nth-child(2) {
            margin-top: 4px;
            span:hover {
              cursor: pointer;
            }
          }
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
    .el-col-13 {
      text-align: center;
      .is-vertical {
        --el-border-color-light: #ced4da;
        --el-slider-height: 8px;
        position: absolute;
        bottom: 84px;
        height: 168px;
        margin-left: 3px;
        border-radius: 5px;
        background-color: #fff;
        :deep(.el-slider__runway) {
          margin: 0 8px;
        }
        :deep(.el-slider__button-wrapper) {
          margin-left: 1px;
          .el-slider__button {
            width: 10px;
            height: 10px;
            transform: scale(1.1) !important;
          }
        }
      }
      .playitem {
        display: flex;
        align-items: center;
        padding: 0 92px 0 90px;
        .el-slider {
          --el-border-color-light: #ced4da;
          padding: 0 10px;
          width: 82%;
          :deep(.el-slider__button-wrapper) {
            .el-slider__button {
              width: 10px;
              height: 10px;
            }
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
      padding-left: 190px;
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
