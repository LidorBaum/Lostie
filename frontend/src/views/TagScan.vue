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
                        <!-- <a :href="`mailto:${tagObj.email}`" target="_blank"></a> -->
                        <!-- <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 24 24"
                            >
                                <g fill="none">
                                    <path
                                        d="M21 7.511a3.247 3.247 0 0 1 1.5 2.739v6c0 2.9-2.35 5.25-5.25 5.25h-9A3.247 3.247 0 0 1 5.511 20H17.25A3.75 3.75 0 0 0 21 16.25V7.511zM5.25 4h11.5a3.25 3.25 0 0 1 3.245 3.066L20 7.25v8.5a3.25 3.25 0 0 1-3.066 3.245L16.75 19H5.25a3.25 3.25 0 0 1-3.245-3.066L2 15.75v-8.5a3.25 3.25 0 0 1 3.066-3.245L5.25 4zM18.5 8.899l-7.15 3.765a.75.75 0 0 1-.603.042l-.096-.042L3.5 8.9v6.85a1.75 1.75 0 0 0 1.606 1.744l.144.006h11.5a1.75 1.75 0 0 0 1.744-1.607l.006-.143V8.899zM16.75 5.5H5.25a1.75 1.75 0 0 0-1.744 1.606l-.004.1L11 11.152l7.5-3.947A1.75 1.75 0 0 0 16.75 5.5z"
                                        fill="currentColor"
                                    >
                                    </path>
                                        
                                </g>
                            </svg> -->
                        <!-- </a> -->
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
import { ref, reactive, onMounted, computed, watch, onUnmounted } from 'vue';
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
            waPhoneNumber.value = tag.phoneNumber.slice(1);
            tagObj.value = tag;
        };

        //To mmake the header more minimalist when scanning a tag
        //all buttons are removed excepty for the logo
        //when user travels to different page, it back
        const beautifyHeader = () => {
            if (loggedUser.value?.name) return;
            console.log('no logg');
            userStore.setLoggedUser({ name: 'scannersecret' });
        };
        const unBeautifyHeader = () => {
            if (loggedUser.value?.name !== 'scannersecret') return;
            userStore.setLoggedUser(null);
        };

        onMounted(() => {
            setTimeout(() => {
                const tagId = route.params.id;
                const scan = route.query.scan;
                console.log(scan == 1);
                if (scan == 1) beautifyHeader();
                fetchTagObj(tagId);
            }, 100);
        });

        onUnmounted(() => {
            unBeautifyHeader();
        });

        // const dogGender = computed(() => {
        //   return tagObj?.breed === "M" ? "Male" : "Female";
        // });

        //when passing through props - dot value not needed
        console.log(props.tagObj);
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
