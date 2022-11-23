<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function goto(name) {
  router.push(name);
}
</script>
<template>
  <h1>音乐馆</h1>
  <el-breadcrumb separator="">
    <el-breadcrumb-item
      @click="goto('featur')"
      :class="{ focus: route.path.match(RegExp(/featur/)) }"
      >精选
    </el-breadcrumb-item>
    <el-breadcrumb-item
      @click="goto('rank')"
      :class="{ focus: route.path.match(RegExp(/rank/)) }"
      >排行
    </el-breadcrumb-item>
    <el-breadcrumb-item
      @click="goto('singer')"
      :class="{ focus: route.path.match(RegExp(/singer/)) }"
      >歌手
    </el-breadcrumb-item>
    <el-breadcrumb-item
      @click="goto('classify')"
      :class="{ focus: route.path.match(RegExp(/classify/)) }"
      >分类歌单
    </el-breadcrumb-item>
    <el-breadcrumb-item></el-breadcrumb-item>
  </el-breadcrumb>

  <div class="buttom">
    <router-view />
  </div>
</template>
<style lang="less" scoped>
h1 {
  font-size: 32px;
  margin-bottom: 28px;
}

.el-breadcrumb {
  height: 40px;
  line-height: 40px;

  .el-breadcrumb__item {
    font-size: 20px;

    &:hover {
      cursor: pointer;
    }

    :deep(.el-breadcrumb__inner) {
      color: #000;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }
  }
}

.focus {
  :deep(.el-breadcrumb__inner) {
    opacity: 1;
    font-size: 24px;
    font-weight: 600;
    border-bottom: 3px solid @active;
  }
}

.buttom {
  margin-top: 30px;
}
</style>
