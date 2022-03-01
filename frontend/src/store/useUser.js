import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () =>({
        counter: 0,
        loggedUser: null
    }),
    getters:{
        doubleCount: (state) =>{
            state.counter * 2
        }
    },
    actions: {
        async reset(){
            this.counter=0
        },
        addOne(){
            this.counter++
        },
        setLoggedUser(user){
            this.loggedUser  = user
        }
    }
})