<template>
 <header class="header">
    <img
      alt="logo du réseau social Groupomania"
      src="../assets/small-transp-rectangle-black-icon.png"
    />
    <nav>
        <a href="#"> Mon compte</a> | 
        <a href="">Se déconnecter</a>
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
            <button @click="showPosts" type="submit"> showPosts</button>
        </div>

  
        
        <p>

        </p>
        <br />
        ci-dessous, posts

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
        const title = ref("");
        const content = ref("");
       // const posts = [];
     //  let posts = ref([]);
        
        const addPost = function() {
            usePostStore()
            .addPost({
                title: title.value,
                //user_id: ?,
                //datetime: ?, comportement auto ? comme l'auto increment ? à vérifier
                content: content.value,
                //image: ?
            })
            .then(()=> {
              console.log("Post envoyé");
              console.log(postStore.posts);
       //       posts.push({title:title.value, content:content.value});
       //       console.log("posts :" + JSON.stringify(posts))
            })
            .catch((error) => {
                console.log(error)
            });
        }

        const showPosts = function() {
            usePostStore()
            .getList()
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
   //       posts,
          showPosts,
          postStore,
        //  getList
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