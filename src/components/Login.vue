<template>

    <header class="header">
        <nav> <a href="../Home.vue">Retour accueil</a></nav>
        <img alt="logo du réseau social Groupomania" src="../assets/small-transp-rectangle-black-icon.png">
    </header>

    <div class="form">
              <!-- zone de connexion -->                        
        <h2>Connexion</h2>
        
        <div>
            <input type="text" placeholder="Adresse e-mail" name="email" v-model="userEmail" required>
        </div>

        <div>
            <input type="password" placeholder="Votre mot de passe" name="password" required>
        </div>

        <div>
            <button type="submit" @add="userLoggedIn" id='submit'>Connectez-vous</button>
        </div>
    </div>   
</template>

<script>    
/*import { ref } from 'vue';
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

router.get('/api/users/', (req,res) => {
    const body = req.body
    const userEmail = userEmail.value
    fetch(`http://localhost:5500/api/users`)
    .catch(console.log({ error }))
    .then(data => data.json())
    .then(checkEmail => {
        userEmail 
    }
    )

})
*/

</script>

<style>

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

h2 {
    color: white;
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
  background-color:#FFD7D7;
  color:#4E5166;
  padding:15px;
  font-weight: bold;
  border-radius: 30px;
  font-size:16px;
}

</style>