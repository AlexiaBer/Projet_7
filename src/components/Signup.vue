<template>
  <header class="header">
    <nav><a href="../Home.vue">Retour accueil</a></nav>
    <img
      alt="logo du réseau social Groupomania"
      src="../assets/small-transp-rectangle-black-icon.png"
    />
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
      <button @click="saveUser" type="submit" id="submit">
        Créez un compte
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    // props : passer des données du parent vers l'enfant. ctx : passer des données de l'enfant vers le parent
    // const users = ref([]);
    const lastName = ref(""); //ref permet de rendre la donnée dynamique et donc récupérable
    const firstName = ref("");
    const email = ref("");
    const password = ref(""); //anciennement tous "let"

    const router = useRouter();

    const saveUser = function () {
        useUserStore()
          .signup({ //ci-dessous, toutes les données que j'envoie au store USER
            lastname: lastName.value,
            firstname: firstName.value,
            email: email.value,
            password: password.value,
          })
          .then(() => {
              router.push({ name: "login" });
            })
          .catch((error) => {
            console.log(error);
          });
    };
    return {
      //on retourne ce qu'on veut rendre disponible
      lastName,
      firstName,
      email,
      password,
      saveUser,
      useUserStore,
    };
  },
};

</script>

<style scoped>
h2 {
  padding-top: 30px;
  color: #ffd7d7;
}

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
  background-color: #fd2d01;
  color: #4e5166;
  padding: 15px;
  font-weight: bold;
  border-radius: 30px;
  font-size: 16px;
}
</style>
