<template>
 <header class="header">
    <img
      alt="logo du réseau social Groupomania"
      src="../assets/small-transp-rectangle-black-icon.png"
    />
    <nav>

        <i class="fa-solid fa-user"></i>
        <a href="#"><i class="fa-solid fa-user"></i> Mon compte</a> | 
        <a href="">Se déconnecter <i class="fa-solid fa-right-from-bracket"></i></a>
    </nav>
  </header>

    <div class="mainwrapper">
        <h1>Quoi de neuf aujourd'hui ? </h1>
       
        <br />
        <div class="post">
            <span class="userid">Jean-Paul,</span>
            <span class="datetime">à 14h59</span>
            <div class="title_content">
                <input type="text" class="title" placeholder="Quel est le sujet ?" v-model="title">
                <input type="text" class="content" placeholder="Qu'avez-vous à raconter ?" v-model="content">
                <button @click="addPost" type="submit">Envoyer mon post</button>
            </div>
            <div class=""></div>
        </div>

        <p v-for="post in posts" :key="post.id">
            {{ post.title }}
            {{ post.content }}
            {{ usePostStore.posts}}
        </p>
        
        <br />
        POST 2
        <br />
        POST 3
    </div>
</template>

<script>  
import { ref } from 'vue';
import { usePostStore } from "../stores/post";
import { useRouter } from "vue-router";

const postStore = usePostStore();

export default {
    setup() { 
        let title = ref("");
        let content = ref("");
        let posts = ref([""]);
        
        const addPost = function() {
            usePostStore()
            .addPost({
                title:title.value,
                //user_id: ?,
                //datetime: ?, comportement auto ? comme l'auto increment ? à vérifier
                content:content.value,
                //image: ?
            })
            .then(()=> {
                this.posts.push({title: this.title, content: this.content});
                console.log(addPost.title, addPost.content)
                console.log(posts) 
            })
            .catch((error) => {
                console.log(error)
            });
        }

        const showPosts = function() {
            usePostStore()
            .getList    
            .then(()=> {
                console.log("getList ici")
            })
            .catch((error) => {
                console.log(error)
            });
        }

      return {
          title,
          content,
          usePostStore,
          addPost,
          posts,
          showPosts
       }
    }
}
</script>

<style>
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

h2 {
  color: white;
}

.title_content {
    display:flex;
    justify-content: center;
    flex-direction: column;
}
  
</style>