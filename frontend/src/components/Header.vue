<template>
  <!-- eslint-disable vue/no-v-model-argument -->
  <div class="header">
    <div id="nav" class="navbar">
      <router-link to="/">
        <img
          class="logo"
          src="https://res.cloudinary.com/echoshare/image/upload/v1645629438/Lostie/image2vector_iolveb.svg"
        />
      </router-link>
      <Button
        v-if="!loggedUser?.name"
        label="Login"
        class="login-btn p-button-text"
        @click="onLogin"
      />
      <Menubar v-else :model="menuItems" :class="isMenuOpen ? '' : 'menu'">
      </Menubar>
    </div>
    <Dialog
      header="Login"
      v-model:visible="showLogin"
      :draggable="false"
      :modal="true"
      :dismissableMask="true"
      @hide="closeLogin"
      :style="{ width: '50vw' }"
    >
      <div class="login-popup">
        <form id="login-form" class="login-form" @submit.prevent="tryLogin">
          <InputText
            id="email"
            type="text"
            v-model="loginCred.email"
            autofocus
            placeholder="Email"
          />
          <InputText
            id="password"
            type="password"
            v-model="loginCred.password"
            placeholder="Password"
          />
          <input type="submit" hidden :disabled="isLoading" />
        </form>
        <p>New here? You have to place an order to get account credentials</p>
      </div>
      <template #footer>
        <Button
          label="Login"
          type="submit"
          icon="pi pi-sign-in"
          form="login-form"
          :disabled="isLoading"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/useUser";
import { useNotificationStore } from "../store/useNotification";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import userService from "../services/userService";

export default {
  setup() {
    const toast = useToast();
    const router = useRouter();
    let showLogin = ref(false);
    const isLoading = ref(false);
    const emptyCreds = { email: "", password: "" };
    const loginCred = reactive({ ...emptyCreds });
    const isMenuOpen = ref(false);
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();
    const { loggedUser } = storeToRefs(userStore);

    const menuItems = ref([
      {
        label: "Account",
        icon: "pi",
        command: () => {
          isMenuOpen.value = !isMenuOpen.value;
        },
        items: [
          {
            label: "Tags ",
            icon: "pi pi-fw pi-tag",
            to: "/tags",
          },
          {
            label: "Profile ",
            icon: "pi pi-fw pi-user",
            to: "/profile",
          },
          {
            label: "Logout ",
            icon: "pi pi-fw pi-sign-out",
            command: () => {
              onLogout();
            },
          },
        ],
      },
    ]);


    const tryLogin = async () => {
      isLoading.value = true;
      if (!loginCred.email || !loginCred.password) {
      notificationStore.newNotification("error", "missing name / password");
        return (isLoading.value = false);

        //NOTIFICATION
      }
      const user = await userService.login({ ...loginCred });
      if (user.error) {
        isLoading.value = false;
      notificationStore.newNotification("error", user.error.message);

        //NOTIFICATION
        console.log(user.error.message);
        return;
      }
      userStore.setLoggedUser(user);
      loginCred.email = "";
      loginCred.password = "";
      isLoading.value = false;
      notificationStore.newNotification("success", "Logged In Succesfully");
      // await store.dispatch("User/setUser", user);
      closeLogin();
    };

    const onLogout = async () => {
      userStore.$reset();
      userService.logout();
      notificationStore.newNotification("warn", "Logged Out")
      return router.push("/");
    };

    const onLogin = () => {
      showLogin.value = true;
    };
    const closeLogin = () => {
      showLogin.value = false;
    };

    return {
      onLogout,
      showLogin,
      onLogin,
      tryLogin,
      closeLogin,
      loginCred,
      isLoading,
      isMenuOpen,
      menuItems,
      loggedUser,
    };
  },
};
</script>
