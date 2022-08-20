<template>
   <div>
              <!-- zone de connexion -->                        
        <h2>Connexion</h2>
        
        <div>
            <label><b>Adresse e-mail</b></label>
            <input type="text" placeholder="Adresse e-mail" name="email" v-model="userEmail" required>
        </div>

        <div>
            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Votre mot de passe" name="password" required>
        </div>

        <div>
            <button type="submit" @click="userLoggedIn" id='submit'>Connectez-vous</button>
        </div>
    </div>   
</template>

<script>    
import { ref } from 'vue';
export default {

    setup(props, ctx) { // entre les parenthèses : le ctx (contexte) permet de mettre à dispo la methode ctx.emit pour 
    // communiquer de l'enfant(user-login.vue) vers le parent (App.vue), permet d'émettre un customEvent, ici il s'appelle logged
    // on va écouter logged et on envoie en payload userEmail.value : ce qui a été saisi par l'user.
        
        let userEmail = ref("");

        const userLoggedIn = function() {
            console.log("user-login | addNewUser() | userEmail", userEmail.value);
            ctx.emit("logged", userEmail.value);
            userEmail.value = "";
        }

        return {
            userEmail,
            userLoggedIn,
        }
    }
}
</script>

<style>


</style>