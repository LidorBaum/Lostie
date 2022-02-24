<template>
  <div>
    <div v-if="user.name && userTags" class="user-profile">
      <h1>{{ user.name }}</h1>
      <h1>{{ user._id }}</h1>
      <h2>{{ user.email }}</h2>
      <h2>{{ user.address }}</h2>
      <h2>{{ user.phoneNumber }}</h2>
      <div class="user-tags">
        <h1>My Tags</h1>
        <article v-for="tag in userTags" :key="tag._id">
            <h1>{{tag.dogName}}</h1>
        </article>
      </div>
    </div>
    <div v-else>
<ProgressSpinner />
    </div>
  </div>
</template>

<script>
import { reactive, inject, ref , watch} from "vue";
import userService from "../services/userService";
import tagService from "../services/tagService";
export default {
    setup() {
    const user = inject("loggedUser");
    const userTags = ref(null);
    const getUserTags = async () => {   
      const res = await tagService.getUserTags(user._id);
      console.log(res);
      return res
    };
    watch(user, async (user)=>{
        if(!user._id) return
        userTags.value = await getUserTags();
    })

    return {
      user,
      userTags,
    };
  },
};
</script>