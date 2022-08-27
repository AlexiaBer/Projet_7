<template> 
    <h2>Inscription</h2>
                  
        <div>
            <label><b>Nom</b></label>
            <input type="text" placeholder="ex : Dupuis" name="lastname" v-model="lastName" class="lastname" required>
        </div>

        <div>
            <label><b>Prénom</b></label>
            <input type="text" placeholder="ex : Aurélie" name="firstname" v-model="firstName" required>
        </div>

        <div>
            <label><b>Adresse e-mail</b></label>
            <input type="text" placeholder="ex : dupuis.aurelie@groupomania.fr" name="email" v-model="email" required>
        </div>

        <div>
            <label><b>Mot de passe</b></label>
            <input type="password" placeholder="Votre mot de passe" name="password" v-model="password" required>
        </div>

        <div>
            <button @click="saveUser" type="submit" id='submit'>Créez un compte</button>
        </div>
</template>
<script>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';

export default {
    setup() { // props : passer des données du parent vers l'enfant. ctx : passer des données de l'enfant vers le parent
     // const users = ref([]);
      let lastName = ref(""); //ref permet de rendre la donnée dynamique et donc récupérable
      let firstName = ref("");
      let email = ref("");
      let password = ref("");
    
      const saveUser = function() {
        useUserStore().signup({lastName: lastName.value, firstName: firstName.value, email: email.value, password: password.value}),
        console.log(lastName.value + firstName.value + email.value + password.value)
      }
      return {
          saveUser,
          lastName: lastName.value, firstName: firstName.value, email: email.value, password: password.value
      }
            
  }
}


// RECUPERER LES DONNEES DE L'API POUR LES TRANSFERER DANS LA BDD

/*

fetch("http://localhost:5500/api/users")
.catch(error => console.log(error))
.then(data => data.json())
.then(nomDeMaFonction => {
    la fonction qui envoie les données vers la BDD SQL.
})
*/

</script>

<style scoped>
h2 {
    color:red;
}
</style>