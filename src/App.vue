<template>
  <div>
    <Hellow></Hellow>
  </div>
</template>

<script>
import Hellow from '../src/components/HelloWorld.vue'
import lib from 'lib'
export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    Hellow
  },
  mounted() {
    console.log(lib)
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
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
