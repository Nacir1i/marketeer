<script setup lang="ts">
const user = useUser();

async function logout() {
  await $fetch('/api/logout', {
    method: 'POST',
  });
  await navigateTo('/login');
}

definePageMeta({
  middleware: ['protected'],
});
</script>

<template>
  <UCard class="w-96 border">
    <UAvatar
      :src="user?.profile_picture"
      alt="Avatar"
    />
    <p>{{ user?.username }}</p>
    <p>{{ user?.email }}</p>
    <UButton @click="logout">
      Sign out
    </UButton>
  </UCard>
</template>
