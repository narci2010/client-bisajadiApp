import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Player from '@/components/Player'
import Play from '@/components/Play'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'player',
      component: Player
    },
    {
      path: '/play/:id',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/battle',
      name: 'Play',
      component: Play
    }
  ]
})
