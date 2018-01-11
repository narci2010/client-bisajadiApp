<template>
  
</template>

<script>
const db = this.$firebase
export default {
  firebase () {
    return {
      anArray: db.ref('rooms')
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style>

</style>
