<template>
  <header class="header">
    <nav><a href="../Home.vue">Retour accueil</a></nav>
    <img
      alt="logo du réseau social Groupomania"
      src="../assets/small-transp-rectangle-black-icon.png"
    />
  </header>

  <div class="form">
    <!-- zone de connexion -->
    <h2>Connexion</h2>

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
        placeholder="Votre mot de passe"
        name="password"
        v-model="password"
        required
      />
    </div>

    <div>
      <button @click="userLoggedIn" type="submit" id="submit">
        Connectez-vous
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router"; // pour la redirection

export default {
  setup() {
    const email = ref(""); //ref permet de rendre la donnée dynamique et donc récupérable
    const password = ref("");
    const router = useRouter(); // pour la redirection
    const userLoggedIn = function () {
        useUserStore() // j'appelle le store depuis le composant
        .login({
          email: email.value, // j'envoie les données du front vers le store
          password: password.value,
        })
        .then(() => { //le data correspond au response data du store / en référence à la promise dans le store user
          router.push({name:"newsfeed"}) //REDIRECTION en utilisant le composant router.
        })
        .catch((error) => { //en référence à la promise dans le store user
            console.log(error);
        });
    };
    return {
      //on retourne ce qu'on veut rendre disponible
      email,
      password,
      userLoggedIn,
      useUserStore,
    };
  },
};
</script>

<style>
body {
  background-color: #4e5166;
}

a {
  color: #4e5166;
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: #ffd7d7;
  color: #4e5166;
  padding: 0px 30px;
}

h2 {
  color: white;
}

.form {
  color: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

::placeholder {
  color: #4e5166;
  font-weight: bold;
  font-size: 16px;
  margin: 30px;
  text-align: center;
}

input {
  padding: 10px;
  border-radius: 8px;
}

button {
  background-color: #ffd7d7;
  color: #4e5166;
  padding: 15px;
  font-weight: bold;
  border-radius: 30px;
  font-size: 16px;
}
</style>
