<template>
    <header class="header">
        <nav> <a href="../Home.vue">Retour accueil</a></nav>
        <img alt="logo du réseau social Groupomania" src="../assets/small-transp-rectangle-black-icon.png">
    </header>
    <h2>Inscription</h2>

    <div class="form">
      <div>
        <label><b>Nom</b></label>
        <input
          type="text"
          placeholder="ex : Dupuis"
          name="lastname"
          v-model="lastName"
          class="lastname"
          required
        />
    </div>

    <div>
      <label><b>Prénom</b></label>
      <input
        type="text"
        placeholder="ex : Aurélie"
        name="firstname"
        v-model="firstName"
        required
      />
    </div>

    <div>
      <label><b>Adresse e-mail</b></label>
      <input
        type="text"
        placeholder="ex : dupuis.aurelie@groupomania.fr"
        name="email"
        v-model="email"
        required
      />
    </div>

    <div>
      <label><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Votre mot de passe"
        name="password"
        v-model="password"
        required
      />
    </div>

    <div>
      <button @click="saveUser" type="submit" id="submit">Créez un compte</button>
    </div>
  </div>
</template>
<script>

import { useUserStore } from "../stores/user";
import { ref } from "vue";
export default {
  setup() {
    // props : passer des données du parent vers l'enfant. ctx : passer des données de l'enfant vers le parent
    // const users = ref([]);
    let lastName = ref(""); //ref permet de rendre la donnée dynamique et donc récupérable
    let firstName = ref("");
    let email = ref("");
    let password = ref("");

    const saveUser = function () {
      console.log(
        lastName.value + firstName.value + email.value + password.value
        ),
        useUserStore().signup({
          lastName: lastName.value,
          firstName: firstName.value,
          email: email.value,
          password: password.value,
        });
    };
    return {
      //on retourne ce qu'on veut rendre disponible
      lastName,
      firstName,
      email,
      password,
      saveUser,
      useUserStore
    };
  },
};

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
  color: #FFD7D7;
}

body {
    color:white;
    background-color:#4E5166;
}

a {
    color:#4E5166;
}

.header {
  display:flex;
  justify-content: space-between;
  background-color:#FFD7D7;
  color:#4E5166;
  padding:0px 30px;
}

.form {
    color:#FFD7D7;
    display:flex;
    flex-direction: column;
    gap:20px;
}

label {
  padding:30px;
}

</style>
