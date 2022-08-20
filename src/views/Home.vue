<template>
   <div>
        Bienvenue sur le réseau social Groupomania !
    </div>   

    <button @click="componentType = 'userLogin'">Se connecter</button> | <button>S'inscrire</button>

</template>

<script>  
// import { ref } from 'vue';
import userLogin from "../components/user-login.vue"
export default {

    data: () => ({

        userLogin
    })

 //   setup() { 
        
//     }

//      return {

 //       }

}
</script>

<style>


</style>