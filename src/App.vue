<template>
  <a-config-provider>
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import Vue from 'vue'
// import lib, { libExport } from 'lib'
// import locale from 'ant-design-vue/lib/locale-provider/zh_CN'

export default Vue.extend({
  name: 'APP',
  data() {
    return {
      // locale
    }
  },
  mounted() {
    // console.log(lib, libExport)
  }
})
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
