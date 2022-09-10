<template>

 <header class="header">
    <img
      alt="logo du réseau social Groupomania"
      src="../assets/small-transp-rectangle-black-icon.png"
    />
    <nav>
        <a href="#">Mon compte</a> | 
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
                <input type="text" class="title" v-model="title">
                <input type="text" class="content" v-model="content">
                <button @click="addPost" type="submit">Envoyer mon post</button>
            </div>
            <div class=""></div>
        </div>
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

export default {
    setup() { 
        let title = ref("");
        let content = ref("");
        
        const addPost = function() {

        }

      return {
          title,
          content
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