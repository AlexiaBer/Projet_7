import { defineStore } from 'pinia' //crée le store

import axios from 'axios';

export const usePostStore = defineStore('post', { //on nomme le store
  state: () => {
    // Déclaration d'une nouvelle variable / état au niveau du store concernant les posts
    return { posts:[] } // par défaut, aucun post
  },
  actions: {
    // Création d'une tâche qui permettra de mettre à jour la variable / l'état 'posts'
    getList(page){ //savoir sur quelle page on est
        axios({
            method: 'get',
            url: 'http://localhost:3000/api/posts',
            responseType: 'json'
          })
            .then(function (response) {
              console.log(response.data)
            });
    },

    addPost(post) {
      this.tasks.push(task);
    },
  },
})
