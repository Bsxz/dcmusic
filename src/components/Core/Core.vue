<script setup></script>
<template>
  <el-scrollbar height="79vh">
    <div class="main">
      <router-view></router-view>
    </div>
  </el-scrollbar>
</template>
<style lang="less" scoped>
.main {
  padding: 40px;
  padding-top: 20px;
}
</style>
