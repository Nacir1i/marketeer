<script setup lang="ts">
import type { Test } from '~/server/db/schema/test';

const data = ref<Test[]>([]);

async function getTest() {
  try {
    const res = await $fetch('/api/test');
    data.value = res;
  } catch (error) {
    console.log(error);
  }
}
async function postTest() {
  try {
    await $fetch('/api/test', { method: 'POST', body: { name: 'test' } });
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getTest();
})
</script>

<template>
  <h1 data-testid="test">
    test
  </h1>
  <p v-for="(name, index) in data" :key="index">
    {{ name }}
  </p>
  <UButton @click="postTest">
    test
  </UButton>
</template>
