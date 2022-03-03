<template>
  <div>
    <div v-if="loggedUser?.name" class="user-profile">
      <div class="container">
        <h1 class="title">Info</h1>
        <div class="user-info">
          <h1>Owner: {{ loggedUser.name }}</h1>
          <h2>Email: {{ loggedUser.email }}</h2>
          <h2>Adrress: {{ loggedUser.address }}</h2>
          <h2>Phone Number: {{ loggedUser.phoneNumber }}</h2>
        </div>
      </div>
      <div class="container">
        <h1 class="title">My Tags</h1>
        <div class="user-tags">
          <div class="tags-list">
            <a v-for="tag in userTags" :key="tag._id" :href="`tag/${tag._id}`">
              <article class="tag-card" :class="tag.status.toLowerCase()">
                <h1>{{ tag.petName }}</h1>
                <img class="dog-image" :src="tag.image" />
                <img class="tag-image" :src="tag.productDetails.image" />
              </article>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <ProgressSpinner />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUserStore } from "../store/useUser";
import { storeToRefs } from "pinia";
import tagService from "../services/tagService";

export default {
  setup() {
    const userStore = useUserStore();

    const { loggedUser } = storeToRefs(userStore);

    const userTags = ref(null);

    const getUserTags = async () => {
      if (!loggedUser.value) return;
      const res = await tagService.getUserTags(loggedUser.value._id);
      console.log(res);
      userTags.value = res;
      return res;
    };

    userStore.$subscribe((mutation, state) => {
      console.log("user mutataed", loggedUser.value);
      getUserTags();
    });

    onMounted(async () => {
      await getUserTags();
    });

    return {
      userTags,
      loggedUser,
      userStore,
    };
  },
};
</script>