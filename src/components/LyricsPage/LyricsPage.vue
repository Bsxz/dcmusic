<script setup>
import { ref, watch } from "vue";
import { getLyric } from "@/Api/api_music.js";
import { useStore } from "vuex";
const store = useStore();
const props = defineProps(["song", "isLyricsPageinfo", "start"]);
const lyric = ref([]);
const lyrics = ref(null);
const lyricIndex = ref();
async function getsonglyric(id) {
  let lrcObj = {};
  const result = await getLyric(id);
  result.lrc.lyric.split("\n").forEach((item) => {
    const arr = item.replace(new RegExp('[[\\/*?"<>|]', "g"), "").split("]");
    let m = parseInt(arr[0].split(":")[0]);
    let s = parseInt(arr[0].split(":")[1]);
    lrcObj[m * 60 + s] = arr[1];
  });
  lyric.value = lrcObj;
}

watch(
  () => props.start,
  (newv) => {
    let i = 0;
    for (let key in lyric.value) {
      if (store.getters.timeFormat(+key) == store.getters.timeFormat(newv)) {
        lyricIndex.value = i;
        lyrics.value.scrollTop = 30 * (i - 3);
      }
      i++;
    }
  }
);
watch(
  () => props.song,
  () => {
    getsonglyric(props.song.id);
  }
);
</script>
<template>
  <div class="lyricspage">
    <div class="info" @click="props.isLyricsPageinfo">
      <el-icon size="30px"><ArrowDown /></el-icon>
    </div>
    <div class="left" v-if="song">
      <img :src="song.al.picUrl" />
    </div>
    <div class="right">
      <template v-if="lyric">
        <ul class="lyric" ref="lyrics">
          <li
            v-for="(item, key, index) in lyric"
            :key="key"
            :class="{ choose: lyricIndex == index }"
          >
            {{ item }}
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
<style lang="less" scoped>
.lyricspage {
  position: fixed;
  display: flex;
  z-index: 3;
  width: 85.9vw;
  height: 88vh;
  background-color: #fff;
  .info {
    position: absolute;
    right: 30px;
    top: 15px;
    &:hover {
      cursor: pointer;
    }
  }
  .left {
    display: flex;
    width: 50%;
    height: 102%;
    justify-content: center;
    align-items: center;
    img {
      display: inline-block;
      width: 400px;
      height: 400px;
    }
  }
  .right {
    width: 50%;
    height: 102%;
    padding: 200px 0;
    .lyric {
      height: 200px;
      overflow: auto;
      text-align: center;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        height: 30px;
        line-height: 30px;
      }
      .choose {
        height: 30px;
        line-height: 30px;
        font-size: 20px;
      }
    }
  }
}
</style>
