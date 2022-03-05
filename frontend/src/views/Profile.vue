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
            <a
              v-for="tag in userTags"
              :key="tag._id"
              :href="`tag/manage/${tag._id}`"
            >
              <article
                class="tag-card"
                v-tooltip.top="`${tag.status}`"
                :class="tag.status.toLowerCase()"
              >
                <h1>{{ tag.petName }}</h1>
                <img class="dog-image" :src="tag.image" />
                <img class="tag-image" :src="tag.productDetails.image" />
              </article>
            </a>
          </div>
        </div>
      </div>
      <div class="container">
        <h3>What's the glow color means?</h3>
        <div class="colors-map">
          <div
            v-for="color in colors"
            class="color-and-desc-cont"
            :key="color.name"
          >
            <div class="color-div" :class="color.color"></div>
            <p>- {{ color.desc }}</p>
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
      userTags.value = res;
      return res;
    };

    userStore.$subscribe((mutation, state) => {
      getUserTags();
    });

    onMounted(async () => {
      await getUserTags();
    });

    const colors = [
      {
        color: "blue",
        desc: "The Tag Is Active",
      },
      {
        color: "red",
        desc: "The Pet Marked As Lost",
      },
      {
        color: "yellow",
        desc: "Order Placed, Waiting For Tag Activation",
      },
    ];

    return {
      userTags,
      loggedUser,
      userStore,
      colors,
    };
  },
};
</script>
