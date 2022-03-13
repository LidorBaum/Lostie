<template>
    <div class="tag-scan-page">
        <Transition name="fade-in" mode="out-in">
            <div v-if="tagObj" class="tag-info-container">
                <h1>{{ tagObj.petName }}</h1>
                <img class="tag-image" :src="tagObj.image" />
                <h2>Breed: {{ tagObj.breed }}</h2>
                <h2>Gender: {{ tagObj.gender }}</h2>
                <p>{{ tagObj.description }}</p>
                <h1>Owner: {{ tagObj.owner }}</h1>
                <h2>Phone Number: {{ tagObj.phoneNumber }}</h2>
                <h2>Email: {{ tagObj.email }}</h2>

                <div class="contact-owner">
                    <h3>Contact Owner:</h3>
                    <div class="icons-btns">
                        <a :href="`tel:${tagObj.phoneNumber}`" target="_blank"
                            ><i class="pi pi-phone phone"
                        /></a>
                        <a
                            :href="`https://wa.me/972${waPhoneNumber}`"
                            target="_blank"
                            ><i class="pi pi-whatsapp whatsapp"
                        /></a>
                    </div>
                </div>
            </div>
            <div v-else class="loader-div">
                <FingerprintSpinner
                    :animation-duration="1400"
                    :size="300"
                    color="#15b485"
                />
            </div>
        </Transition>
    </div>
</template>

<script>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import tagService from '../services/tagService.js';
import { useRouter, useRoute } from 'vue-router';
import { FingerprintSpinner } from 'epic-spinners';
import { useUserStore } from '../store/useUser';
import { storeToRefs } from 'pinia';

export default {
    components: {
        FingerprintSpinner,
    },
    props: {
        tagObj: Object,
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        let tagObj = ref(null);
        let waPhoneNumber = ref(null);
        const userStore = useUserStore();
        const { loggedUser } = storeToRefs(userStore);
        const fetchTagObj = async tagId => {
            const tag = await tagService.getTagByIdForScan(tagId);
            if (tag.error) {
                return notificationStore.newNotification(
                    'error',
                    tag.error.message
                );
            }
            waPhoneNumber.value = tag.phoneNumber.slice(1);
            tagObj.value = tag;
        };

        //To make the header more minimalist when scanning a tag
        //all buttons are removed excepty for the logo
        //when user travels to different page, it back
        const beautifyHeader = () => {
            if (loggedUser.value?.name) return;
            userStore.setLoggedUser({ name: 'scannersecret' });
        };
        const unBeautifyHeader = () => {
            if (loggedUser.value?.name !== 'scannersecret') return;
            userStore.setLoggedUser(null);
        };

        onMounted(() => {
            setTimeout(() => {
                const tagId = route.params.id;
                beautifyHeader();
                fetchTagObj(tagId);
            }, 100);
        });

        onUnmounted(() => {
            unBeautifyHeader();
        });

        //when passing through props - dot value not needed
        watch(
            () => props.tagObj,
            async () => {
                tagObj.value = { ...props.tagObj };
            }
        );
        return {
            tagObj,
            waPhoneNumber,
        };
    },
};
</script>

<style>
.fade-in-enter-from,
.fade-in-leave-to {
    opacity: 0;
    overflow: hidden;
    /* transform: translateY(20px); */
}
.fade-in-enter-active {
    transition: all 0.4s ease-out;
}
.fade-in-leave-active {
    transition: all 0.4s ease-out;
}
</style>
