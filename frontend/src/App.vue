<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import { onMounted, provide , ref, reactive, toRefs} from '@vue/runtime-core';
import Header from "./components/Header.vue";
export default {
  setup(){
    let loggedUser = reactive({})
    provide('loggedUser', loggedUser)
    const setLoggedUser = (user) =>{
              Object.assign(loggedUser, user) // equivalent to reassign 
    }
    provide('setLoggedUser', setLoggedUser)
    onMounted(()=>{
      // setTimeout(()=> provider({name: "YOSSI"}), 3000)
    })
    return{
      ...toRefs(loggedUser)
    }
  },
  components: {
    Header,
  },
};
</script>
