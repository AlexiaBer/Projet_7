import { defineStore } from "pinia"; //crée le store

import axios from "axios";

export const useUserStore = defineStore("user", { // le store fait les requêtes vers le backend, centralise tous les appels 
  //centralise les données, les rend dynamiques
  //on nomme le store
  state: () => ({
    // Déclaration d'une nouvelle variable / état du store
    // par défaut, aucun user
    token: undefined,
  }),
  actions: {
    // Création d'une tâche qui permettra de mettre à jour la variable / l'état 'tasks'

    login(form) { 
      return new Promise((resolve, reject) => { //la fonction login retourne une promesse qui retourne un objet
        const postRequest = {
          email: form.email,
          password: form.password
        };
       // const token = headers.token;
        const headers = {
          "Content-Type": "application/json",
//          "Authorization": "Bearer" + token, ça c'est côté back je crois
        };

        axios.post("http://localhost:3000/api/users/login", postRequest, { // appel vers le back
            headers
          })
          .then(response => {
            this.token = response.data.token // il faut intégrer token dans les headers vers le back
            resolve(); //l'action login est terminée quand le server nous a retourné la réponse.
          })
          .catch( error => {
            reject(error);
          });
      });
    },

    signup(form) {

      return new Promise((resolve, reject) => { 
        const postRequest = {
          email: form.email,
          password: form.password,
          firstname: form.firstname,
          lastname: form.lastname,
        }

        const headers = {
          'Content-Type': 'application/json',
        }

        axios.post('http://localhost:3000/api/users/register', postRequest, { headers })
        .then (function (response) {
         //le this.token = response.data.token, il faut intégrer token dans les headers vers le back
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        })

      })

    },
  },
});
 /*     return new Promise((resolve, reject) => {
        //resolve et reject :
        const postRequest = {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        };

        const headers = {
          "Content-Type": "application/json"
        };

        axios
          .post("http://localhost:3000/api/users/register", postRequest, {
            headers
          })
          .then(function (response) {
            //le this.token = response.data.token, il faut intégrer token dans les headers vers le back
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });


      */
      /*
        
        fetch("http://localhost:3000/api/users/register", {
          method: "POST",
          body: JSON.stringify({
            "email": form.email,
            "password": form.password,
            "firstname": form.firstName,
            "lastname": form.lastName
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

/*      const postRequest = {
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName
          }
        async function postData(url = 'http://localhost:3000/api/users', postRequest) {
          // Default options are marked with *
          const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
              email: form.email,
              password: form.password,
              firstName: form.firstName,
              lastName: form.lastName}) // body data type must match "Content-Type" header
          });
          return response.json(); // parses JSON response into native JavaScript objects
        }
        postData('http://localhost:3000/api/users', {    
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName })
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });

      }
    }})
/*
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
