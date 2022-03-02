import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () =>({
        loggedUser: null
    }),
    // getters:{
    //     doubleCount: (state) =>{
    //         state.counter * 2
    //     }
    // },
    actions: {
        setLoggedUser(user){
            this.loggedUser  = user
        }
    }
})