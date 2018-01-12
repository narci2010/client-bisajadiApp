<template>
  <div>
    <div v-if="isActive">
      <h2>{{ score[0]['.value'] }}</h2>
     <h1>{{ timer }}</h1> 
      <div v-if="anArray">
        <h1 >
        {{ anArray[0].word }}
        </h1>
        <img :src="anArray[0].img" alt="" style="width:300px; height: 200px;">  
      </div>
      
      <button class="mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
        <i class="material-icons" @click="getWord">add</i>
      </button>
    </div>
    
      <!-- <img src="https://i.ytimg.com/vi/aqGGmyQZpoY/hqdefault.jpg" alt=""> -->
    
<div v-else>
  {{ benarOrTidak }}
  <form action="#" @submit.prevent="cekJawaban">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
    <input class="mdl-textfield__input" type="text" id="sample3" v-model="text">
    <label class="mdl-textfield__label" for="sample3">Jawaban Anda</label>
  </div>
</form>
</div>

  </div>
</template>

<script>
/* eslint-disable */

import firebase from 'firebase'
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      isActive: '',
      onplay: false,
      text: '',
      timer: 10,
      benarOrTidak: '',
      word: '',
      index: '',
      history: [],
      jawaban: [
        {
          kata: "pisang",
          image: "http://www.solusisehatku.com/wp-content/uploads/2015/03/Pisang-Berkhasiat-Untuk-Menjaga-Kesehatan-Kulit.png"
        },
        {
          kata: "rendang",
          image: "http://ibudanmama.com/wp-content/uploads/2014/08/rendang-daging-rusa.jpg"
        },
        {
          kata: "bakso",
          image: "https://mamikos.com/info/wp-content/uploads/2017/07/Resep-Cara-Membuat-Bakso-Daging-Sapi-Lezat-830x623.jpg"
        },
        {
          kata: "sapu",
          image: "http://tigaem.com/4520-large_default/sapu-nylon-ekonomis-eceran-distributor-resmi-sapu-nilon-scotch-brite-u-membersihkan-lantai-di-jual-dg-harga-murah.jpg"
        },
        {
          kata: "mobil",
          image: "https://s3-ap-southeast-1.amazonaws.com/mobilkamu/artikel/images/9-mobil-sport-murah-kurang-dari-1-milyar/mobil-sport-murah.jpg"
        },
        {
          kata: "sepatu",
          image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/medium//1045/nike_nike-wmns-air-zoom-pegasus-33-831356-001-sepatu-olaharaga_full02.jpg"
        },
        {
          kata: "cumi",
          image: "http://4.bp.blogspot.com/-063dQTBSxAw/VK3IK_VXP1I/AAAAAAAABMQ/5ChyyPA37kQ/s1600/Cara%2BMemasak%2BCumi%2BAgar%2BTidak%2BAlot.jpg"
        },
        {
          kata: "afrika",
          image: "http://www.hus-film.de/assets/Image/filme/Abenteuer_Afrika.jpg"
        },
        {
          kata: "tentara",
          image: "https://hello-pet.com/assets/uploads/2016/11/tentara-nasional-indonesia-angkatan-darat.jpg"
        },
        {
          kata: "tukul",
          image: "http://www.lihat.co.id/wp-content/uploads/2016/08/tukul-1.jpg"
        }
      ]
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
          vm.timer = 10
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
