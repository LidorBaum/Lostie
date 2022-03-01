<template>
  <div>
    <div v-if="loggedUser?.name" class="user-profile">
      <h1>{{ loggedUser.name }}</h1>
      <h1>{{ loggedUser._id }}</h1>
      <h2>{{ loggedUser.email }}</h2>
      <h2>{{ loggedUser.address }}</h2>
      <h2>{{ loggedUser.phoneNumber }}</h2>
      <div class="user-tags">
        <h1>My Tags</h1>
        <article v-for="tag in userTags" :key="tag._id">
          <h1>{{ tag.dogName }}</h1>
        </article>
      </div>
    </div>
    <div v-else>
      <ProgressSpinner />
    </div>
    <h1>{{ counter }}</h1>
    <button @click="userStore.addOne">FML</button>
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

    const { counter, loggedUser } = storeToRefs(userStore);

    const userTags = ref(null);

    const getUserTags = async () => {
      if (!loggedUser.value) return;
      const res = await tagService.getUserTags(loggedUser.value._id);
      return res;
    };

    // watch(loggedUser, async (loggedUser) => {
    //   console.log(loggedUser);
    //   // if (!loggedUser._id) return;
    //   userTags.value = await getUserTags();
    // });

    onMounted(async () => {
      userTags.value = await getUserTags();
    });

    return {
      userTags,
      loggedUser,
      counter,
      userStore,
    };
  },
};
</script>