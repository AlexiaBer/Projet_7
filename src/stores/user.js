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
      },
  /*    axios({
            method: 'get',
            url: 'http://localhost:3000/api/users',
            responseType: 'json'
          })
            .then(function (response) {
              console.log(response.data)
            });
*/
  

 /*     fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
          'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Cross-Origin-Resource-Policy': 'same-site'
        }
      })
      .then(response => response.json())
      .then(json => console.log(json));
      */
      signup(form) { 

        const postRequest = {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName
          }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' // + token
            }
    
        axios.post('http://localhost:3000/api/users', postRequest, { headers })
          .then(res => console.log('succesfull')) 
          .catch(function(error) {
              console.log(error.message);    
            })
        }

      }
    })
/*
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
*/
