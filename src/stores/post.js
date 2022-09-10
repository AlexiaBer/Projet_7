import { defineStore } from 'pinia' //crée le store

import axios from 'axios';

export const usePostStore = defineStore('post', { //on nomme le store
  state: () => ({
    // Déclaration d'une nouvelle variable / état au niveau du store concernant les posts
  //  return { posts:[] } // par défaut, aucun post
    token:undefined,
  }),
  actions: {
    // Création d'une tâche qui permettra de mettre à jour la variable / l'état 'posts'
    getList(page){ //savoir sur quelle page on est
      return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json',
        };
        axios.get("http://localhost:3000/api/posts", { headers } )
        .then(response => {
          this.token = response.data.token;
          resolve(response);
        })
        .catch( error => {
          reject(error);
        });
      });
    },

    addPost(post) {
      //this.posts.push(post);
        return new Promise((resolve, reject) => { 
          const postRequest = {
            title: form.title,
            user_id: form.user_id,
            datetime: form.timestamp,
            content: form.content,
            image:form.image
          }
  
          const headers = {
            'Content-Type': 'application/json',
          }
  
          axios.post('http://localhost:3000/api/posts', postRequest, { headers })
          .then (function (response) {
           this.token = response.data.token // il faut intégrer token dans les headers vers le back
            resolve(response);
          })
          .catch(function(error) {
            reject(error);
          })
  
        })
      },
    }
})
