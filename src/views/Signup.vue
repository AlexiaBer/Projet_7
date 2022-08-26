<template> 
    <h2>Inscription</h2>
                  
        <div>
            <label><b>Nom</b></label>
            <input type="text" placeholder="ex : Dupuis" name="lastname" v-model="lastName" required>
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
export default {
    setup(props, ctx) { // props : passer des données du parent vers l'enfant. ctx : passer des données de l'enfant vers le parent
     // const users = ref([]);
      let lastName = ref(""); //ref permet de rendre la donnée dynamique est donc récupérable
      let firstName = ref("");
      let email = ref("");
      let password = ref("");

      const saveUser = function(data) {
          //if() { A METTRE DANS LE BACK (SQL)
            // 1) Need chercher l'email dans la BDD : if email existe, error. If email n'existe pas, on enregistre
            // SELECT * FROM users WHERE email=email.value;
            //INSERT INTO users (`lastname`, `firstname`, `email`, `password`, `image`, `birthdate`)
            // VALUES
            // (lastName.value, firstName.value, email.value, password.value, "null", "null")
         //   }


         

          ctx.emit("addUser", lastName.value, firstName.value, email.value, password.value);
    //      users.value = [...users.value, { user: data, id: Date.now() }];
          console.log(lastName.value, firstName.value, email.value, password.value);
          lastName.value = "";
          firstName.value = "";
          email.value = "";
          password.value = "";
      }
    return {
        lastName, firstName, email, password, saveUser
    }
  },
  }

</script>

<style scoped>
h2 {
    color:red;
}
</style>