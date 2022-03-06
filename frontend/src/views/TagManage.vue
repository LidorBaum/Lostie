<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <h1>Tag Managaement</h1>
  <div class="tag-manage" v-if="tagObj">
    <h1>{{ tagObj.petName }}</h1>
    <div class="tag-scan-preview">
      <TagScan />
    </div>
    <div class="tag-info"></div>
  </div>

  <div v-else class="loader-div">
    <FingerprintSpinner
      :animation-duration="1300"
      :size="600"
      color="#15b485"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import tagService from "../services/tagService.js";
import { FingerprintSpinner } from "epic-spinners";
import { useRouter, useRoute } from "vue-router";
import TagScan from "./TagScan.vue";

export default {
  components: {
    FingerprintSpinner,
    TagScan,
  },
  setup() {
    const route = useRoute();

    let tagObj = ref(null);

    const fetchTagObj = async (tagId) => {
      const tag = await tagService.getTagByIdForScan(tagId);
      tagObj.value = tag;
    };

    onMounted(() => {
      setTimeout(() => {
        const tagId = route.params.id;
        console.log(tagId);
        fetchTagObj(tagId);
      }, 1450);
    });
    return {
      tagObj,
    };
  },
};
</script>
