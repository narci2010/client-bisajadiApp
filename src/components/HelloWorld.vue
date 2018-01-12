<template>
  <div v-if="score && score.length > 0">
    <div v-if="isActive">
      <h2>Score: {{ score[0]['.value'] }}</h2>
      <h1>Sisa Waktu: {{ timer }}</h1> 
      <player-two-screen :roomId="1"/>
      <div v-if="anArray">
        <h1 >
        <!-- {{ anArray[0].word }} -->
        </h1>
        <!-- <img :src="anArray[0].img" alt="" style="width:300px; height: 200px;">   -->
      </div>
      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
        <i class="material-icons" @click="getWord">add</i>
      </button>
    </div>
    
      <!-- <img src="https://i.ytimg.com/vi/aqGGmyQZpoY/hqdefault.jpg" alt=""> -->
    
    <div v-else style="padding: 20px;">
     <h1>
      {{ benarOrTidak }}</h1>
      <form action="#" @submit.prevent="cekJawaban">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input class="mdl-textfield__input" type="text" id="sample3" v-model="text">
        <label class="mdl-textfield__label" for="sample3">Jawaban Anda</label>
      </div>
    </form>
     <player-one-screen :roomId="1"/>
    </div>

  </div>
</template>

<script>
/* eslint-disable */

import firebase from 'firebase'
import axios from 'axios'
import PlayerOneScreen from './PlayerOneScreen'
import PlayerTwoScreen from './PlayerTwoScreen'
import dummy from '@/assets/dummy'

export default {
  name: 'HelloWorld',
  components : {PlayerOneScreen, PlayerTwoScreen},
  data () {
    return {
      isActive: '',
      onplay: false,
      text: '',
      timer: 180,
      benarOrTidak: '',
      word: '',
      index: '',
      history: [],
      jawaban: dummy.jawaban
    }
  },
  firebase () {
    return {
      anArray: firebase.database().ref('teams'),
      score: firebase.database().ref('leaderboard/team_rocket'),
      play: firebase.database().ref('play/flag')
    }
  },
  watch: {
    isActive: function () {
      if (this.$route.params.id === 'playerone') {
        this.isActive = true
      }
    }
  },
  methods: {
    startTheGame: function () {
      let vm = this
      console.log('helasdasdlo')
        setInterval( function () {
         console.log(vm.timer)
         if (vm.onplay) {
           vm.timer--
         }
        if (vm.timer === 0) {
          vm.onplay = false
          vm.timer = 180
          alert('game over')
          
        }
      }, 1000)
    },
    getWord: function () {
      console.log('hello')
      this.benarOrTidak = false
      let index = Math.floor(Math.random() * (this.jawaban.length - this.history.length ))
      this.index = index
      if (this.history.length === this.jawaban.length) {
        this.history = []
      } else if (index) {
        firebase.database().ref('teams/' + 'team_rocket').set({
          word: this.jawaban[index].kata,
          img: this.jawaban[index].image
        })
        this.onplay = !this.onplay
        this.startTheGame()
        this.history.push(index)
      } else {
        return this.getWord()
      }
      // axios.get('https://us-central1-bisajadi-bce8b.cloudfunctions.net/helloWorld')
      // .then(data => {
      //   console.log(data)
      //   this.word = data.kata
      // })
    },
    cekJawaban: function () {
      if (this.text.toLowerCase() === this.anArray[0].word) {
        console.log(this.text, this.anArray[0].word)
        let score = Number(this.score[0]['.value'])
        console.log(score + 'score')
        score += 10
        firebase.database().ref('leaderboard/team_rocket').set({
          score: score
        })
        this.text = ''
        this.getWord()
        return this.benarOrTidak = true
      } else {
        console.log(this.text, this.anArray[0].word)

        return this.benarOrTidak = false
      }
    }
  },
  created () {
    if (this.$route.params.id === 'playerone') {
      this.isActive = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
