<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '#ui/types';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Must be at least 6 characters'),
});
type Schema = z.output<typeof schema>;

const items = [{
  key: 'login',
  label: 'Login',
}, {
  key: 'signup',
  label: 'signup',
}];

const loginState = reactive({
  email: undefined,
  password: undefined,
});
const signupState = reactive({
  email: undefined,
  password: undefined,
});

async function login(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: {
        email: event.data.email,
        password: event.data.password,
      },
    });
    await navigateTo('/');
  } catch (error) {
    console.error(error);
  }
}

async function signup(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch('/api/signup', {
      method: 'POST',
      body: {
        email: event.data.email,
        password: event.data.password,
      },
    });
    await navigateTo('/');
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="flex h-screen w-screen items-center justify-center">
    <UTabs :items="items" class="w-96">
      <template #item="{ item }">
        <UCard>
          <template #header>
            <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {{ item.description }}
            </p>
          </template>

          <UForm
            v-if="item.key === 'login'"
            :schema="schema"
            :state="loginState"
            class="space-y-4"
            @submit="login"
          >
            <UFormGroup label="Email" name="email">
              <UInput v-model="loginState.email" disabled />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="loginState.password" type="password" disabled />
            </UFormGroup>

            <UButton disabled>
              Submit
            </UButton>
          </UForm>
          <UForm
            v-if="item.key === 'signup'"
            :schema="schema"
            :state="signupState"
            class="space-y-4"
            @submit="signup"
          >
            <UFormGroup label="Email" name="email">
              <UInput v-model="signupState.email" disabled />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput v-model="signupState.password" type="password" disabled />
            </UFormGroup>

            <UButton disabled>
              Submit
            </UButton>
          </UForm>

          <UDivider label="OR" />

          <UButton
            to="http://localhost:3000/login/facebook"
            color="black"
            label="Login with Facebook"
            icon="i-simple-icons-facebook"
            block
          />
        </UCard>
      </template>
    </UTabs>
  </div>
</template>
