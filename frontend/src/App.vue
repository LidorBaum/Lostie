<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <div class="app">
        <Toast position="bottom-right" />
        <Header />
        <div class="content">
            <router-view />
        </div>
    </div>
    <ScrollTop />
</template>

<script>
import { onMounted, watch } from 'vue';
import Cookies from 'js-cookie';
import { useNotificationStore } from './store/useNotification';
import { useUserStore } from './store/useUser';
import { storeToRefs } from 'pinia';
import Header from './components/Header.vue';
import { useToast } from 'primevue/usetoast';
import userService from './services/userService';

export default {
    setup() {
        const toast = useToast();
        const userStore = useUserStore();
        const notificationStore = useNotificationStore();
        const { notificationData } = storeToRefs(notificationStore);
        const { loggedUser } = storeToRefs(userStore);

        notificationStore.$subscribe((mutation, state) => {
            showNotification(
                notificationData.value.severity,
                notificationData.value.summary,
                notificationData.value.life
            );
        });

        const showNotification = (
            severity,
            summary,
            life = 3000,
            detail = ''
        ) => {
            console.log(severity, life);
            toast.add({
                severity: severity,
                summary: summary,
                detail: detail,
                life: life,
            });
        };

        onMounted(async () => {
            if (Cookies.get('user')) {
                const userJSON = JSON.parse(Cookies.get('user'));
                const updated = await userService.getById(userJSON._id);
                userStore.setLoggedUser(updated);
            }
        });
        return {
            loggedUser,
            notificationData,
        };
    },
    components: {
        Header,
    },
};
</script>
