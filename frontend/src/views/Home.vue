<template>
  <div class="home-page">
    <div class="hero">
      <p>Welcome to <strong>Lostie</strong></p>
      <div class="nfc-tag">
        <img
          src="https://res.cloudinary.com/echoshare/image/upload/v1646151480/Lostie/lostienfc_tgat3x.png"
        />
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
