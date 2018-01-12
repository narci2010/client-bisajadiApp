<template>
  <div id="app">
     <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout__header-row">
          <!-- Title -->
          <span class="mdl-layout-title">Bisajadi App</span>
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">Bisajadi App</span>
        <nav class="mdl-navigation">
          <a class="mdl-navigation__link" href="">Home</a>
          <a class="mdl-navigation__link" href="">Profile</a>
          <a class="mdl-navigation__link" href="">Donate</a>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <div class="page-content">
          <router-view/>
        </div>
      </main>
    </div>

  
    
  </div>
</template>

<script>
import TheNavBar from './components/TheNavBar'
export default {
  name: 'app',
  components: { TheNavBar }
}
</script>

<style>
.demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type  {
  padding-right: 0;
}

</style>
