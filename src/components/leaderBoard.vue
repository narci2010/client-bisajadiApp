<template>
  <div>
    <h1>Leader Board</h1>
    <ul class="demo-list-item mdl-list">
      <li class="mdl-list__item" v-for="item in score">
        <span class="mdl-list__item-primary-content">
          {{ item.team }} :  
          {{ item.score }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'LeaderBoard',
  data () {
    return {
      score: []
    }
  },
  firebase () {
    return {
      anArray: firebase.database().ref('teams'),
      play: firebase.database().ref('play/flag')
    }
  },
  created () {
    var scoresRef = firebase.database().ref('leaderboard')
    let bulk = []
    scoresRef.orderByValue().on('value', function (snapshot) {
      snapshot.forEach(function (data) {
        console.log('The ' + data.key)
        let obj = {
          team: data.key,
          score: data.val().score
        }
        bulk.push(obj)
      })
    })
    this.score = bulk
  }
}
</script>

<style>

</style>
