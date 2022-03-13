<template>
    <!-- eslint-disable vue/no-v-model-argument -->
    <div>
        <div v-if="loggedUser?.name" class="user-profile">
            <div class="container">
                <h1 class="title">Info</h1>
                <div
                    class="user-info"
                    v-tooltip.top="'click to edit your info'"
                    @click="onEditInfo"
                >
                    <h1>Owner: {{ loggedUser.name }}</h1>
                    <h2>Email: {{ loggedUser.email }}</h2>
                    <h2>Adrress: {{ loggedUser.address }}</h2>
                    <h2>Phone Number: {{ loggedUser.phoneNumber }}</h2>
                </div>
            </div>
            <div class="container">
                <h1 class="title">My Tags</h1>
                <div class="user-tags">
                    <Paginator
                        v-if="userTags.length"
                        :rows="paginatorRows"
                        :totalRecords="userTags.length"
                        template=" PageLinks  "
                        @page="onPaging"
                        class="tags-paginator"
                    >
                    </Paginator>
                    <Transition name="switch" mode="out-in">
                        <div v-if="userTags[0] === 0" class="tags-list empty">
                            <h1>No Tags Yet</h1>
                            <h2>Wanna order one now?</h2>
                        </div>
                        <div v-else-if="userTags.length" class="tags-list">
                            <a
                                v-for="tag in userTagsForDisplay"
                                :key="tag._id"
                                :href="`tag/manage/${tag._id}?auth=${tag.userId}`"
                            >
                                <article
                                    class="tag-card"
                                    v-tooltip.top="`${tag.status}`"
                                    :class="tag.status.toLowerCase()"
                                >
                                    <h1>{{ tag.petName }}</h1>
                                    <img class="pet-image" :src="tag.image" />
                                    <img
                                        class="tag-image"
                                        :src="tag.productDetails.image"
                                    />
                                </article>
                            </a>
                        </div>
                        <div v-else class="loader-div tags-loader-div">
                            <FingerprintSpinner
                                :animation-duration="1300"
                                :size="100"
                                color="#15b485"
                            />
                        </div>
                    </Transition>
                </div>
            </div>
            <div class="container">
                <h3 class="title">What's the glow color means?</h3>
                <div class="colors-map">
                    <div
                        v-for="color in colors"
                        class="color-and-desc-cont"
                        :key="color.name"
                    >
                        <div class="color-div" :class="color.color"></div>
                        <p>-</p>
                        <p>{{ color.desc }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <ProgressSpinner />
        </div>
        <Dialog
            header="Edit Info"
            v-model:visible="showEditInfo"
            :draggable="false"
            :modal="true"
            @hide="closeEditInfo"
            :style="{ width: dialogWidth }"
        >
            <div class="edit-info-popup">
                <form
                    id="edit-info-form"
                    class="edit-info-form"
                    @submit.prevent="saveInfo"
                >
                    <div class="field">
                        <label for="email">Email</label>
                        <InputText
                            id="email"
                            type="text"
                            v-model="userInfoForm.email"
                            autofocus
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div class="field">
                        <label for="name">Full Name</label>
                        <InputText
                            id="name"
                            type="text"
                            v-model="userInfoForm.name"
                            placeholder="Full Name"
                            required
                        />
                    </div>
                    <div class="field">
                        <label for="address">Address</label>
                        <InputText
                            id="address"
                            type="text"
                            v-model="userInfoForm.address"
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div class="field">
                        <label for="phoneNumber">Phone Number</label>
                        <InputText
                            id="phoneNumber"
                            type="text"
                            v-model="userInfoForm.phoneNumber"
                            placeholder="Phone Number"
                        />
                    </div>
                    <input type="submit" hidden :disabled="isLoading" />
                </form>
            </div>
            <template #footer>
                <Button
                    label="Save"
                    type="submit"
                    icon="pi pi-save"
                    form="edit-info-form"
                    :disabled="isLoading"
                />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue';
import { useUserStore } from '../store/useUser';
import { useNotificationStore } from '../store/useNotification';
import { storeToRefs } from 'pinia';
import tagService from '../services/tagService';
import userService from '../services/userService';
import { FingerprintSpinner } from 'epic-spinners';

export default {
    setup() {
        const paginatorRows = ref(2);
        const dialogWidth = ref('30vw');
        if (window.screen.width < 1000) {
            paginatorRows.value = 1;
            dialogWidth.value = '90vw';
        }
        const userStore = useUserStore();
        const showEditInfo = ref(false);
        const { loggedUser } = storeToRefs(userStore);
        const isLoading = ref(false);
        const notificationStore = useNotificationStore();
        const emptyUserInfoForm = {
            name: '',
            email: '',
            address: '',
            phoneNumber: '',
        };
        const userInfoForm = reactive({ ...emptyUserInfoForm });
        const currTagsPage = ref(1);
        const userTags = ref([]);
        const userTagsForDisplay = ref(
            computed(() => {
                if (!userTags.value.length) return [];
                return userTags.value.slice(
                    (currTagsPage.value - 1) * paginatorRows.value,
                    paginatorRows.value +
                        (currTagsPage.value - 1) * paginatorRows.value
                );
            })
        );

        const onPaging = e => {
            currTagsPage.value = e.page + 1;
        };

        const getUserTags = async () => {
            if (!loggedUser.value) return;
            const res = await tagService.getUserTags(loggedUser.value._id);
             if (res.error) {
                return notificationStore.newNotification(
                    'error',
                    res.error.message
                );
            }
            if (res.length === 0) return (userTags.value = [0]);
            return (userTags.value = res);
        };

        const prepareEditInfoForm = () => {
            if (!loggedUser.value) return;
            Object.assign(userInfoForm, loggedUser.value);
        };

        const saveInfo = async () => {
            isLoading.value = true;
            if (Object.values(userInfoForm).some(field => !field)) {
                notificationStore.newNotification(
                    'error',
                    'Please do not leave blank fields'
                );
                return (isLoading.value = false);
            }
            const updatedUser = await userService.updateUser({
                ...userInfoForm,
            });
            if (updatedUser.error) {
                isLoading.value = false;
                return notificationStore.newNotification(
                    'error',
                    updatedUser.error.message
                );
            }
            userStore.setLoggedUser(updatedUser);
            resetFields();
            isLoading.value = false;
            notificationStore.newNotification(
                'success',
                'Information saved successfully!'
            );
            closeEditInfo();
        };

        const onEditInfo = () => {
            console.log('edit user info');
            showEditInfo.value = true;
        };

        const closeEditInfo = () => {
            showEditInfo.value = false;
        };

        const resetFields = () => {
            Object.assign(userInfoForm, emptyUserInfoForm);
        };

        userStore.$subscribe((mutation, state) => {
            prepareEditInfoForm();
            getUserTags();
        });

        onMounted(async () => {
            setTimeout(() => {
                getUserTags();
            }, 1000);
            prepareEditInfoForm();
        });

        const colors = [
            {
                color: 'blue',
                desc: 'The Tag Is Active',
            },
            {
                color: 'red',
                desc: 'The Pet Marked As Lost',
            },
            {
                color: 'yellow',
                desc: 'Order Placed, Waiting For Tag Activation',
            },
            {
                color: 'purple',
                desc: 'Tag is currently Inactive',
            },
        ];

        return {
            userTags,
            loggedUser,
            userStore,
            colors,
            onEditInfo,
            showEditInfo,
            closeEditInfo,
            saveInfo,
            userInfoForm,
            isLoading,
            userTagsForDisplay,
            onPaging,
            paginatorRows,
            dialogWidth,
        };
    },
    components: {
        FingerprintSpinner,
    },
};
</script>
