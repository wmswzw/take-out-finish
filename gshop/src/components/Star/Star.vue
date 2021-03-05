<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(stars, index) in startslist" :key="index" :class="stars"></span>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    startslist () {
      const {score} = this
      const sts = [] //  ["on","on","half","off","off"] 5个组成
      // 添加on
      const scoreOn = Math.floor(score)
      for (let i = 0; i < scoreOn; i++) {
        sts.push('on')
      }
      // 添加half
      const scoreHalf = Math.round(score)
      if (scoreHalf - scoreOn > 0) {
        sts.push('half')
      }
      // 添加off

      // const scoreOff = 5 - scoreHalf
      // if (scoreOff > 0) {
      //   for (let i = 0; i < scoreOff; i++) {
      //     sts.push('off')
      //   }
      // }
      while (sts.length < 5) {
        sts.push('off')
      }
      return sts
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl'
.star //2x图 3x图
  float left
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('./images/star48_on')
      &.half
        bg-image('./images/star48_half')
      &.off
        bg-image('./images/star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 6px
      background-size 15px 15px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star36_on')
      &.half
        bg-image('./images/star36_half')
      &.off
        bg-image('./images/star36_off')
  &.star-24
    .star-item
      width 10px
      height 10px
      margin-right 3px
      background-size 10px 10px
      &:last-child
        margin-right 0
      &.on
        bg-image('./images/star24_on')
      &.half
        bg-image('./images/star24_half')
      &.off
        bg-image('./images/star24_off')
</style>
