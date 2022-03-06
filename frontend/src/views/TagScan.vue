<template>
    <div class="dog-scan-page">
        <div v-if="tagObj">
            <h1>{{ tagObj.petName }}</h1>
            <img class="dog-image" :src="tagObj.image" />
            <h2>Breed: {{ tagObj.breed }}</h2>
            <h2>Gender: {{ tagObj.gender }}</h2>
            <p>{{ tagObj.description }}</p>
            <h1>Owner: {{ tagObj.owner }}</h1>
            <h2>Phone Number: {{ tagObj.phoneNumber }}</h2>
            <h2>Email: {{ tagObj.email }}</h2>
        </div>
        <div v-else class="loader-div">
            <FingerprintSpinner
                :animation-duration="1400"
                :size="300"
                color="#ff1d5e"
            />
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import tagService from '../services/tagService.js';
import { useRouter, useRoute } from 'vue-router';
import { FingerprintSpinner } from 'epic-spinners';

export default {
    components: {
        FingerprintSpinner,
    },
    props: {
        tagObj: Object,
    },
    setup(props) {
        const route = useRoute();
        let tagObj = ref(null);

        const fetchTagObj = async tagId => {
            const tag = await tagService.getTagByIdForScan(tagId);
            tagObj.value = tag;
        };

        onMounted(() => {
            setTimeout(() => {
                const tagId = route.params.id;
                fetchTagObj(tagId);
            }, 100);
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
        };
    },
};
</script>
