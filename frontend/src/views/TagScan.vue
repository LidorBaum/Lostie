<template>
  <div class="dog-scan-page">
    <div v-if="tagObj">
      <h1>{{ tagObj.dogName }}</h1>
      <img class="dog-image" :src="tagObj.image" />
      <h2>Breed: {{ tagObj.breed }}</h2>
      <h2>Gender: {{ dogGender }}</h2>
      <p>{{ tagObj.description }}</p>
      <h1>Owner: {{ tagObj.owner }}</h1>
      <h2>Phone Number: {{ tagObj.phoneNumber }}</h2>
      <h2>Email: {{ tagObj.email }}</h2>
    </div>
    <div    v-else class="loader-div">
      <FingerprintSpinner
        :animation-duration="1400"
        :size="300"
        color="#ff1d5e"
      />
    </div>
  </div>
</template>


<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import tagService from "../services/tagService.js";
import { useRouter, useRoute } from "vue-router";
import { FingerprintSpinner } from "epic-spinners";

export default {
  components: {
    FingerprintSpinner,
  },
  setup() {
    const route = useRoute();
    let tagObj = ref(null);

    const fetchTagObj = async (tagId) => {
      console.log(tagId, "newId from fetch");
      const tag = await tagService.getTagByIdForScan(tagId);
      console.log(tag);
      tagObj.value = tag;
    };

    onMounted(() => {
      setTimeout(() => {
        const tagId = route.params.id;
        fetchTagObj(tagId);
      }, 1500);
    });

    const dogGender = computed(() => {
      // if(!tagObj) return
      return tagObj?.breed === "M" ? "Male" : "Female";
    });

    watch(
      () => route.params.id,
      async (newId) => {
        console.log(newId);
        tagObj.value = await fetch(newId);
      }
    );
    return {
      tagObj,
      dogGender,
      // tagName
    };
  },
};
</script>