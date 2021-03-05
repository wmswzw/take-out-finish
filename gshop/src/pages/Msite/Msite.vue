<template>
<div class="msite">
    <!--首页头部-->
    <!-- <header class="header">
      <a class="header_search">
        <i class="iconfont icon-search"></i>
      </a>
      <a class="header_title">
        <span class="header_title_text ellipsis">绍兴文理学院元培学院(镜湖校区)</span>
      </a>
      <a class="header_login">
        <span class="header_login_text">登录|注册</span>
      </a>
    </header> -->
    <top-guide :title="address.name">
      <router-link to="/search" class="header_search" slot="left_item">
        <i class="iconfont icon-search"></i>
      </router-link>
      <router-link  class="header_login" slot="right_item" :to="userinfo._id ? '/profile':'/login'">
        <span class="header_login_text" v-if="!userinfo._id">登录|注册</span>
        <i class="iconfont icon-geren"  v-if="userinfo._id"></i>
      </router-link>
    </top-guide>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="types.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(types,index) in typesArray" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(type,index) in types" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+ type.image_url">
              </div>
              <span>{{type.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
        <nearby-shops/>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import TopGuide from '../../components/TopGuide/TopGuide.vue'
import NearbyShops from '../../components/NearbyShops/NearbyShops.vue'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  mounted () {
    this.$store.dispatch('getFoodTypes')
    this.$store.dispatch('getShopList')
  },
  components: { TopGuide, NearbyShops },
  computed: {
    ...mapState(['address', 'types', 'userinfo']), // 读数据(要先引入)
    // 根据一维数组types生成一个二维数组typesArray
    // 小数组最大个数为8
    typesArray () {
      const {types} = this
      const arr = []
      let minArr = []
      types.forEach(c => {
        if (minArr.length === 8) {
          minArr = []
        }
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(c)
      })
      return arr
    }

  },
  watch: {
    types (value) { // types中有数据了,在异步更新页面之前了
      // 界面更新就立即创建Swiper对象
      this.$nextTick(() => { // vue自带的函数,一旦完成界面更新,立即调用
        // eslint-disable-next-line no-new
        new Swiper('.swiper-container', {
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  .msite
    width 100%
    overflow hidden
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0 10px
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
