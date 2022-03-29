<template> 
  <div class="app">
      <router-view/>
  </div>
</template>

<style lang="scss">
  html{
    height:100%;
    min-height: 100%;
    width: 100%;
    body{
      min-height: 100%;
      height:100%;
      box-sizing: border-box;
    }
  }
  #app{
    min-height: 100%;
    height: 100%;
  }
 
</style>