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
      <!-- <h1>{{ loggedUser?.name }}USER</h1> -->
      <Button
        v-if="!loggedUser?.name"
        label="Login"
        class="login-btn p-button-text"
        @click="onLogin"
      />
      <Menubar v-else :model="menuItems" :class="isMenuOpen ? '' : 'menu'"> </Menubar>
    </div>
    <Dialog
      header="Login"
      v-model:visible="showLogin"
      :draggable="false"
      :modal="true"
      :dismissableMask="true"
      @hide="closeBasic"
      :style="{ width: '50vw' }"
    >
      <div class="login-popup">
        <form class="login-form">
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
        </form>
        <p>New here? You have to place an order to get account credentials</p>
      </div>
      <template #footer>
        <Button
          label="Login"
          icon="pi pi-sign-in"
          @click="tryLogin"
          :disabled="isLoading"
        />
      </template>
    </Dialog>
  </div>
</template>

<script>
import { inject, onMounted, reactive, ref, toRefs } from "vue";
import userService from "../services/userService";
import Cookies from "js-cookie";
export default {
  setup() {
    let showLogin = ref(false);
    const isLoading = ref(false);
    const loginCred = reactive({ email: "", password: "" });
    const isMenuOpen = ref(false);
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
      console.log({ ...loggedUser });
      isLoading.value = true;
      if (!loginCred.email || !loginCred.password) {
        isLoading.value = false;
        //NOTIFICATION
      }
      const user = await userService.login({ ...loginCred });
      if (user.error) {
        isLoading.value = false;
        //NOTIFICATION
        console.log(user.error.message);
        return;
      }
      setLoggedUser(user);
      closeLogin();
      console.log({ ...loggedUser });
    };

    onMounted(async () => {
      if (Cookies.get("user")) {
        const userJSON = JSON.parse(Cookies.get("user"));
        const updated = await userService.getById(userJSON._id);
        console.log("updated user from db", updated);
        setLoggedUser(updated);
      }
    });
    const onLogin = () => {
      showLogin.value = true;
    };
    const closeLogin = () => {
      showLogin.value = false;
    };
    const onLogout = () => {
      userService.logout();
      setLoggedUser(null);
      return router.push('/')
    };
    const loggedUser = inject("loggedUser");
    const setLoggedUser = inject("setLoggedUser");
    return {
      onLogout,
      showLogin,
      onLogin,
      tryLogin,
      closeLogin,
      loggedUser,
      setLoggedUser,
      loginCred,
      isLoading,
      isMenuOpen,
      menuItems,
    };
  },
};
</script>
