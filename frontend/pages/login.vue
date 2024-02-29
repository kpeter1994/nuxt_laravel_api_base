<script lang="ts" setup>

import {useAuthStore} from "~/stores/useAuthStore";
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: 'guest'
})

const form = ref({
  email: 'test@example.com',
  password: 'password'
})

const auth = useAuthStore()
async function handelLogin() {

  if (auth.isLoggedIn){
    return navigateTo('/')
  }

  const {error} = await auth.login(form.value)

  if (error) {
    return navigateTo('/')
  }
}


</script>

<template>
    <form @submit.prevent="handelLogin">
      <label>Email
        <input type="email" v-model="form.email">
      </label>
      <label>Password
        <input type="password" v-model="form.password">
      </label>
      <button type="submit">Login</button>

    </form>
</template>

<style scoped></style>
