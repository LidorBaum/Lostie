<template>
<n-config-provider :theme="darkTheme">
  <div class="app">
    <Toast position="bottom-right" />
    <Header  />
    <div class="content">
    <router-view />
    </div>
  </div>
  </n-config-provider>
</template>

<script>
import { onMounted, watch } from "vue";
import Cookies from "js-cookie";
import { useNotificationStore } from "./store/useNotification";
import { useUserStore } from "./store/useUser";
import { storeToRefs } from "pinia";
import Header from "./components/Header.vue";
import { useToast } from "primevue/usetoast";
import userService from "./services/userService";
  import { darkTheme, NConfigProvider } from 'naive-ui'

export default {
  setup() {
    const toast = useToast();
    const userStore = useUserStore();
    const notificationStore = useNotificationStore();
    const { notificationData } = storeToRefs(notificationStore);
    const { loggedUser } = storeToRefs(userStore);

    notificationStore.$subscribe((mutation, state)=>{
      showNotification(
        notificationData.value.severity,
        notificationData.value.summary
      );
    })

    const showNotification = (severity, summary, detail = "") => {
      toast.add({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000,
      });
    };

    onMounted(async () => {
      if (Cookies.get("user")) {
        const userJSON = JSON.parse(Cookies.get("user"));
        const updated = await userService.getById(userJSON._id);
        userStore.setLoggedUser(updated);
      }
    });
    return {
      loggedUser,
      notificationData,
          darkTheme,
    };
  },
  components: {
    Header,
    NConfigProvider
  },
};
</script>
