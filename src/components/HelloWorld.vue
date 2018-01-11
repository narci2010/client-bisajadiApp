<template>
  <div class="hello">
    <form action="" @submit.prevent="postData">
      <input type="text" v-model="msg">
      <input type="submit" value="submit">
    </form>

    <h1> {{ dataGcf }}</h1>
    
  </div>
</template>

<script>
import axios from 'axios'
const db = this.$firebase
export default {
  name: 'HelloWorld',
  firebase () {
    return {
      anArray: db.ref('test')
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      dataGcf: null
    }
  },
  methods: {
    postData () {
      db.ref('test/' + 'jhvfyugcyg67576576yu').set({ msg: this.msg })
    },
    getGcf () {
      axios.get('https://us-central1-bisajadi-bce8b.cloudfunctions.net/helloWorld')
      .then(response => {
        console.log(response.data)
        this.dataGcf = response.data.kata
      })
      .catch(err => {
        console.log(err)
      })
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
