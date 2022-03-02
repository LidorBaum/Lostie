<template>
  <div>
    <h1>Place New Order</h1>
    <form id="login-form" class="login-form" @submit.prevent="tryLogin">
      <InputText
        id="email"
        type="text"
        v-model="loginCreds.email"
        autofocus
        placeholder="Email"
      />
      <InputText
        id="password"
        type="password"
        v-model="loginCreds.password"
        placeholder="Password"
      />
      <input type="submit" hidden :disabled="isLoading" />
    </form>
  </div>
</template>

<script>
import { useNotificationStore } from "../store/useNotification";
import { reactive, ref } from "vue";

export default {
  setup() {
      const orderDetails = reactive({
          
      })
  },
};
</script>

