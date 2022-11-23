<script setup>
import { computed } from "vue";

const props = defineProps(["description"]);
const newdescription = computed(() => {
  const arr = [];
  props.description.split("\n").forEach((p) => {
    if (p.length > 1) {
      arr.push(p);
    }
  });
  return arr;
});
</script>
<template>
  <h2>专辑介绍</h2>
  <p v-for="p in newdescription" :key="p">{{ p }}</p>
</template>
<style lang="less" scoped>
h2 {
  font-size: 20px;
}
p {
  font-size: 16px;
  text-indent: 32px;
  margin-top: 12px;
  white-space: pre-wrap;
}
</style>
