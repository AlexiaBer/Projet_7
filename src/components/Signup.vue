<template>
  
    <header class="header">
        <nav> <a href="../Home.vue">Retour accueil</a></nav>
        <img alt="logo du réseau social Groupomania" src="../assets/small-transp-rectangle-black-icon.png">
    </header>
  
    <h2>Venez échanger avec vos collègues de travail !</h2>
    <p>Inscription</p>

    <div class="form">
      <div>
        <input
          type="text"
          placeholder="Nom"
          name="lastname"
          v-model="lastName"
          class="lastname"
          required
        />
    </div>

    <div>
      <input
        type="text"
        placeholder="Prénom"
        name="firstname"
        v-model="firstName"
        required
      />
    </div>

    <div>
      <input
        type="text"
        placeholder="Adresse e-mail"
        name="email"
        v-model="email"
        required
      />
    </div>

    <div>
      <input
        type="password"
        placeholder="Mot de passe"
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
    const lastName = ref(""); //ref permet de rendre la donnée dynamique et donc récupérable
    const firstName = ref("");
    const email = ref("");
    const password = ref(""); //anciennement tous "let"

    const saveUser = function () {
      console.log(
        lastName.value + firstName.value + email.value + password.value
        ),
        useUserStore().signup({
          lastName: lastName.value,
          firstName: firstName.value,
          email: email.value,
          password: password.value,
        })
        .then((data) => {
          console.log(data);
          //redirection new page ICI
        })
        .catch((error) => {
          console.log(error);
        })
        
        ;
      
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
  padding-top:30px;
  color: #FFD7D7;
}

body {
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
    color:white;
    display:flex;
    flex-direction: column;
    gap:20px;
}

::placeholder {
  color:#4E5166;
  font-weight: bold;
  font-size: 16px;
  margin:30px;
  text-align:center;
}

input {
  padding:10px;
  border-radius:8px;
}

button {
  background-color:#FD2D01;
  color:#4E5166;
  padding:15px;
  font-weight: bold;
  border-radius: 30px;
  font-size:16px;
}

</style>
