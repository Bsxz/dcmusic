<script setup>
import SingerList from "./SingerList/SingerList.vue";
import { ref, reactive, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
const param = reactive({
  limit: 30,
  area: -1,
  offset: 0,
  type: -1,
  initial: -1,
});
const store = useStore();
const country = ref([
  {
    areatitle: "全部",
    area: -1,
  },
  {
    areatitle: "华语",
    area: 7,
  },
  {
    areatitle: "欧美",
    area: 96,
  },
  {
    areatitle: "日本",
    area: 8,
  },
  {
    areatitle: "韩国",
    area: 16,
  },
  {
    areatitle: "其他",
    area: 0,
  },
]);
const gender = ref([
  {
    typetitle: "全部",
    type: -1,
  },
  {
    typetitle: "男",
    type: 1,
  },
  {
    typetitle: "女",
    type: 2,
  },
  {
    typetitle: "组合",
    type: 3,
  },
]);
const letter = reactive([
  { title: "全部", initial: -1 },
  { title: "A", initial: "a" },
  { title: "B", initial: "b" },
  { title: "C", initial: "c" },
  { title: "D", initial: "d" },
  { title: "E", initial: "e" },
  { title: "F", initial: "f" },
  { title: "G", initial: "g" },
  { title: "H", initial: "h" },
  { title: "I", initial: "i" },
  { title: "J", initial: "j" },
  { title: "K", initial: "k" },
  { title: "L", initial: "l" },
  { title: "M", initial: "m" },
  { title: "N", initial: "n" },
  { title: "O", initial: "o" },
  { title: "P", initial: "p" },
  { title: "Q", initial: "q" },
  { title: "R", initial: "r" },
  { title: "S", initial: "s" },
  { title: "T", initial: "t" },
  { title: "U", initial: "u" },
  { title: "V", initial: "v" },
  { title: "W", initial: "w" },
  { title: "X", initial: "x" },
  { title: "Y", initial: "y" },
  { title: "Z", initial: "z" },
]);
const tag = reactive({
  type: "全部",
  area: "全部",
  initial: "全部",
});
function flut({
  limit = 30,
  area,
  offset = 0,
  initial,
  type,
  areatitle,
  typetitle,
  title,
}) {
  if (area) {
    param.area = area;
  }
  if (type) {
    param.type = type;
  }
  if (initial) {
    param.initial = initial;
  }
  if (typetitle) {
    tag.type = typetitle;
  }
  if (areatitle) {
    tag.area = areatitle;
  }
  if (title) {
    tag.initial = title;
  }
  store.dispatch("getArtistList", {
    limit,
    area: param.area,
    offset,
    type: param.type,
    initial: param.initial,
  });
}
function change(num) {
  const offset = num * 30;
  param.offset = offset;
  store.dispatch("getArtistList", { ...param });
}

onBeforeMount(() => {
  store.dispatch("getArtistList", { ...param });
});
const isfocus = computed(() => {
  return tag;
});
</script>
<template>
  <div class="header">
    <ul>
      <li>
        <span
          v-for="item in country"
          :key="item.type"
          @click="flut(item)"
          :class="{ active: isfocus.area === item.areatitle }"
          >{{ item.areatitle }}</span
        >
      </li>
      <li>
        <span
          v-for="item in gender"
          :key="item.type"
          @click="flut(item)"
          :class="{ active: isfocus.type === item.typetitle }"
          >{{ item.typetitle }}</span
        >
      </li>
    </ul>
    <span
      v-for="item in letter"
      :key="item.initial"
      @click="flut(item)"
      :class="{ activer: isfocus.initial === item.title }"
      >{{ item.title }}</span
    >
  </div>
  <el-row>
    <SingerList :artistList="store.state.artistList" />
  </el-row>
  <el-pagination
    hide-on-single-page
    :page-size="30"
    :pager-count="11"
    layout="prev, pager, next"
    @current-change="change"
    :total="600"
  />
</template>
<style lang="less" scoped>
.header {
  height: 166px;
  ul {
    li {
      margin-bottom: 20px;
      span {
        display: inline-block;
        width: 68px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border: 1px solid #ccc;
        border-radius: 14px;
        margin-right: 10px;
        &:hover {
          cursor: pointer;
          color: @active;
        }
      }
      .isfocus {
        color: #fff;
        background-color: @active !important;
      }
    }
  }
  span {
    display: inline-block;
    font-size: 15px;
    margin-right: 15px;
    text-align: center;
    &:hover {
      cursor: pointer;
      color: @active;
    }
  }

  .activer {
    color: @active;
  }
}
.el-pagination {
  --el-pagination-hover-color: @active;
  justify-content: center;
}
</style>
