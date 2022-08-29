<template>
  <header class="header">
    <img alt="logo du réseau social Groupomania" src="../assets/small-transp-rectangle-black-icon.png">
  </header>
  <br />
    <p>Bienvenue sur le réseau social Groupomania !</p> <br>
  <nav> 
      <router-link to="/signup" >S'inscrire</router-link> | 
      <router-link to="/login">Se connecter</router-link> 
  </nav><br>
   <router-view> </router-view>

 <!--router-view ci-dessus dit à view router où afficher le composant auquel est associé la route quand on visite une url
  -->
</template>

<script>

</script>


<style>
#app {
  font-family: Lato, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

body {
  background-color:#4E5166;
  margin:0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color:white;
}

p {
    color:white;
}

.header {
  display:flex;
  justify-content: center;
  background-color:#FFD7D7;
  padding:0px 30px;
}

</style>
