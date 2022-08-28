import { defineStore } from 'pinia' //crée le store

import axios from 'axios';

export const useUserStore = defineStore('user', { //on nomme le store
  state: () => ({
    // Déclaration d'une nouvelle variable / état au niveau du store concernant les tâches
     // par défaut, aucun user
  }),
  actions: {
    // Création d'une tâche qui permettra de mettre à jour la variable / l'état 'tasks'
    login() { //savoir sur quelle page on est
        axios.get('http://localhost:3000/api/users')
        .then (function (response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
  /*    axios({
            method: 'get',
            url: 'http://localhost:3000/api/users',
            responseType: 'json'
          })
            .then(function (response) {
              console.log(response.data)
            });
*/
  
    },

    signup(form) { 
   /*   axios.post('http://localhost:3000/api/users', {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
*/
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
            })
  //          .catch(function(error) {
  //          console.log(error);
   //   });

    },
  },
})