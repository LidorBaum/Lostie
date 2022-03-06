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
                label="Login / Signup"
                class="login-btn p-button-text"
                @click="onLogin"
            />
            <Menubar
                v-else
                :model="menuItems"
                :class="isMenuOpen ? '' : 'menu'"
            >
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
                <form
                    id="login-form"
                    class="login-form"
                    @submit.prevent="tryLogin"
                >
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
            <template #footer>
                <div class="sign-footer-btns">
                    <Button
                        tabindex="-1"
                        label="New here? Signup now!"
                        @click="swapForms"
                        icon="pi"
                    />
                    <Button
                        label="Login"
                        type="submit"
                        icon="pi pi-sign-in"
                        form="login-form"
                        :disabled="isLoading"
                    />
                </div>
            </template>
        </Dialog>

        <Dialog
            header="Signup"
            v-model:visible="showSignup"
            :draggable="false"
            :modal="true"
            :dismissableMask="true"
            @hide="closeSignup"
            :style="{ width: '50vw' }"
        >
            <div class="signup-popup">
                <form
                    id="signup-form"
                    class="signup-form"
                    @submit.prevent="trySignup"
                >
                    <InputText
                        id="name"
                        type="text"
                        v-model="signupCreds.name"
                        autofocus
                        placeholder="Full Name"
                    />
                    <InputText
                        id="address"
                        type="text"
                        v-model="signupCreds.address"
                        placeholder="Address (Street -> City)"
                    />
                    <InputText
                        id="phoneNumber"
                        type="text"
                        v-model="signupCreds.phoneNumber"
                        placeholder="Phone Number"
                    />
                    <InputText
                        id="email"
                        type="text"
                        v-model="signupCreds.email"
                        placeholder="Email"
                    />
                    <InputText
                        id="password"
                        type="password"
                        v-model="signupCreds.password"
                        placeholder="Password"
                    />
                    <input type="submit" hidden :disabled="isLoading" />
                </form>
            </div>
            <template #footer>
                <div class="sign-footer-btns">
                    <Button
                        tabindex="-1"
                        label="Already with us? Login!"
                        @click="swapForms"
                        icon="pi"
                    />

                    <Button
                        label="SignUp"
                        type="submit"
                        icon="pi pi-sign-in"
                        form="signup-form"
                        :disabled="isLoading"
                    />
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/useUser';
import { useNotificationStore } from '../store/useNotification';
import { storeToRefs } from 'pinia';
import userService from '../services/userService';

export default {
    setup() {
        const router = useRouter();
        let showLogin = ref(false);
        let showSignup = ref(false);
        const isLoading = ref(false);
        const emptyLoginCreds = { email: '', password: '' };
        const emptySignupCreds = {
            email: '',
            password: '',
            name: '',
            address: '',
            phoneNumber: '',
        };
        const signupCreds = reactive({ ...emptySignupCreds });
        const loginCreds = reactive({ ...emptyLoginCreds });
        const isMenuOpen = ref(false);
        const userStore = useUserStore();
        const notificationStore = useNotificationStore();
        const { loggedUser } = storeToRefs(userStore);

        const menuItems = ref([
            {
                label: 'Order New Tag ',
                icon: 'pi pi-fw pi-tag',
                to: '/order',
            },
            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                to: '/profile',
            },
            {
                label: 'Logout ',
                icon: 'pi pi-fw pi-sign-out',
                command: () => {
                    onLogout();
                },
            },
        ]);

        const trySignup = async () => {
            isLoading.value = true;
            if (Object.values(signupCreds).some(field => !field)) {
                notificationStore.newNotification('error', 'missing fields!');
                return (isLoading.value = false);
            }
            const newUser = await userService.signup({ ...signupCreds });
            if (newUser.error) {
                isLoading.value = false;
                notificationStore.newNotification(
                    'error',
                    newUser.error.message
                );
                return;
            }
            userStore.setLoggedUser(newUser);
            isLoading.value = false;
            notificationStore.newNotification(
                'success',
                'Logged In Succesfully'
            );
            resetFields();
            closeSignup();
        };

        const tryLogin = async () => {
            isLoading.value = true;
            if (!loginCreds.email || !loginCreds.password) {
                notificationStore.newNotification(
                    'error',
                    'missing name / password'
                );
                return (isLoading.value = false);
            }
            const user = await userService.login({ ...loginCreds });
            if (user.error) {
                isLoading.value = false;
                return notificationStore.newNotification(
                    'error',
                    user.error.message
                );
            }
            userStore.setLoggedUser(user);
            resetFields();
            isLoading.value = false;
            notificationStore.newNotification(
                'success',
                'Logged In Succesfully'
            );
            closeLogin();
        };

        const onLogout = async () => {
            userStore.$reset();
            userService.logout();
            notificationStore.newNotification('warn', 'Logged Out');
            return router.push('/');
        };

        const swapForms = () => {
            if (showLogin.value) {
                showLogin.value = false;
                showSignup.value = true;
                return;
            }
            showSignup.value = false;
            showLogin.value = true;
        };

        const onLogin = () => {
            showLogin.value = true;
        };
        const closeLogin = () => {
            resetFields();
            showLogin.value = false;
        };
        const onSignup = () => {
            showSignup.value = true;
        };
        const closeSignup = () => {
            resetFields();
            showSignup.value = false;
        };

        const resetFields = () => {
            Object.assign(signupCreds, emptySignupCreds);
            Object.assign(loginCreds, emptyLoginCreds);
        };

        return {
            onLogout,
            showLogin,
            showSignup,
            onLogin,
            onSignup,
            closeSignup,
            tryLogin,
            closeLogin,
            loginCreds,
            isLoading,
            isMenuOpen,
            menuItems,
            loggedUser,
            swapForms,
            trySignup,
            signupCreds,
        };
    },
};
</script>
