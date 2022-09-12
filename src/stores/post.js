import { defineStore } from 'pinia' //crée le store

import axios from 'axios';

export const usePostStore = defineStore('post', { //on nomme le store
  state: () => ({
    // Déclaration d'une nouvelle variable / état au niveau du store concernant les posts
    posts: [],// par défaut, aucun post
    token: undefined
  }),
  actions: {
    // Création d'une tâche qui permettra de mettre à jour la variable / l'état 'posts'
    getList(){ //savoir sur quelle page on est
 //     return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json',
        };
        console.log("coucou avant le get axios")
        axios.get("http://localhost:3000/api/posts", { headers } )
        .then(response => {
        //  this.token = response.data.token;
          this.posts.push(response);
         // console.log("posts dans le store" + posts)
     //     resolve(response);
        })
        .catch( error => {
  //        reject(error);
        });
//      });
    },

    addPost(form) {
   //     return new Promise((resolve, reject) => { 
          const addPostPostRequest = {
            title: form.title,
           // user_id: post.user_id,
           // datetime: post.timestamp,
            content: form.content,
            //image:post.image
          }
          const headers = {
            'Content-Type': 'application/json',
          }
          
         // posts.push({title: this.title, content: this.content});
          let posts = this.posts
          axios.post('http://localhost:3000/api/posts', addPostPostRequest, { headers })

          .then (function (response) {
           //this.token = response.data.token // il faut intégrer token dans les headers vers le back
            posts.push(addPostPostRequest);
            console.log(posts)
            resolve(response);
          })
          .catch(function(error) {
            reject(error);
          })
          

  //      })
      },
    }
})
