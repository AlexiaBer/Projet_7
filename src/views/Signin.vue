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
            <button @add="saveUser" type="submit" id='submit'>Créez un compte</button>
        </div>
</template>
<script>
/* export default {
    setup(props, ctx) { // props : passer des données du parent vers l'enfant. ctx : passer des données de l'enfant vers le parent
      const users = ref([]);
      
      const saveUser = function(data) {
          ctx.emit("add", {lastName, firstName, email, password});
          users.value = [...users.value, { user: data, id: Date.now() }];
          console.log(users.value);
      }
  },

}
*/

</script>

<style scoped>
h2 {
    color:red;
}
</style>