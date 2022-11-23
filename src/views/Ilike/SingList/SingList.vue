<script setup>
import {ref} from "vue";

const loading = ref(true);
</script>
<template>
  <template v-if="loading"> 歌单</template>
</template>
<style lang="less" scoped></style>
