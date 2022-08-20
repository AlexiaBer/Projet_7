<template>
  <nav>
    <!-- 
      <router-link to="/">Home</router-link> 
    -->
  </nav>
  <router-view /> 
  <!-- router-view ci-dessus dit à view router où afficher le composant auquel est associé la route quand on visite une url
  -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
