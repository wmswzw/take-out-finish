<template>
  <div id="app">
    <router-view/>
    <footer-guide v-if="$route.meta.showFooterGuide"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {mapActions} from 'vuex'
export default{
  mounted () {
    // this.$store.dispatch('getAddress')
    this.getAddress() // 先方法,后调用
    // this.$store.dispatch('getUserInfo')
    this.getUserInfo()
  },
  methods: {
    ...mapActions(['getAddress', 'getUserInfo'])
  },
  components: {
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    position relative
</style>>
