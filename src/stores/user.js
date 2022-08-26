import { defineStore } from 'pinia' //crée le store


export const useUserStore = defineStore('user', { //on nomme le store
  state: () => {
    // Déclaration d'une nouvelle variable / état au niveau du store concernant les tâches
    return { users:[] } // par défaut, aucun post
  },
  actions: {
    // Création d'une tâche qui permettra de mettre à jour la variable / l'état 'tasks'
    login(){ //savoir sur quelle page on est
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/posts',
            responseType: 'json'
          })
            .then(function (response) {
              console.log(response.data)
            });
    },

    signup(form) { 
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/users',
            data: {
                email: form.email,
                password: form.password,
                firstName: form.firstName,
                lastName: form.lastName
              }
          })
            .then(function (response) {
              console.log(response.data)
            });

    },
  },
})