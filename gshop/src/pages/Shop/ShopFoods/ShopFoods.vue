<template>
  <div>

  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li class="menu-item" v-for="(goods,index) in shopfoods" :key="index"
         :class="{current:index===currentIndex}" @click="menuItem(index)">
            <img class="icon" :src="goods.icon" v-if="goods.icon">
          <span class="text bottom-border-1px">{{goods.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul ref="foodsList">
        <li class="food-list-hook" v-for="(goods,index) in shopfoods" :key="index">
          <h1 class="title">{{goods.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in goods.foods" :key="index" @click="showFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
      <ShopCart/>
  </div>
  <Food :food="food" ref="Food"/>
</div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl.vue'
import Food from '../../../components/food/food.vue'
import ShopCart from '../../../components/ShopCart/ShopCart.vue'
export default {
  components: {CartControl, Food, ShopCart},
  data () {
    return {
      scrollY: 0, // 右侧滑动的Y轴坐标(滑动过程时实时变化)
      tops: [], // 所有右侧分类1i的top组成的数组 (列表第一次显示后就不再变化)
      food: {} // 需要显示的food
    }
  },
  mounted () {
    // this.$store.dispatch('getShopFoods')

    // 数据获取成功后创建,可用watch+nexttick,或者以下方式
    // 获取数据是传入一个回调函数,actions里接收
    this.$store.dispatch('getShopFoods', () => { // 数据更新后执行
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['shopfoods']),
    // 计算当前分类的下标
    currentIndex () {
      // 得到数据
      const {tops, scrollY} = this
      const index = tops.findIndex((top, index) => {
        // scrollY>=当前top && scrollY<下一个top
        return scrollY >= top && scrollY < tops[index + 1]
      })
      return index
    }
  },
  methods: {
    // 初始化滚动
    _initScroll () {
      const menuScrll = new BScroll('.menu-wrapper', {
        click: true
      })
      this.foodsScrll = new BScroll('.foods-wrapper', {
        probeType: 2,
        click: true
      })
      this.foodsScrll.on('scroll', ({x, y}) => {
        // console.log(x, y)
        this.scrollY = Math.abs(y)
      })
      this.foodsScrll.on('scrollEnd', ({x, y}) => {
        // console.log(x, y)
        this.scrollY = Math.abs(y)
      })
    },
    // 初始化tops
    _initTops () {
      // 1.初始化tops
      const tops = []
      // 2.搜集
      let top = 0
      tops.push(top)
      // 找到所有分类的li
      // const lis = this.$refs.foodsList.querySelectorAll('.food-list-hook')
      const lis = this.$refs.foodsList.children
      Array.prototype.slice.call(lis).forEach((li) => {
        top += li.clientHeight
        tops.push(top)
      })
      // 3.更新数据
      this.tops = tops
      // console.log(tops);
    },
    menuItem (index) {
      // console.log(index)
      const scrollY = this.tops[index]
      this.scrollY = scrollY
      this.foodsScrll.scrollTo(0, -scrollY, 500)
    },
    showFood (food) {
      // 设置food
      this.food = food
      // 显示food组件(调用子组件对象的方法) 复杂方法
      this.$refs.Food.tabShow()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 275px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
