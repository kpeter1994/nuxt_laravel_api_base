<script lang="ts" setup>

import {useAuthStore} from "~/stores/useAuthStore";

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})



const auth = useAuthStore()
async function handelRegister() {
  const {error} = await auth.register(form.value)

  if (!error){
    navigateTo('/')
  }
}


</script>

<template>
  <form @submit.prevent="handelRegister">
    <label>Név
      <input type="text" v-model="form.name">
    </label>
    <label>Email
      <input type="email" v-model="form.email">
    </label>
    <label>Password
      <input type="password" v-model="form.password">
    </label>
    <label>RePassword
      <input type="password" v-model="form.password_confirmation">
    </label>
    <button type="submit">Login</button>

  </form>
</template>

<style scoped></style>
