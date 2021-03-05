<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">小茂外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:showOn}" @click="showOn=true">短信登录</a>
          <a href="javascript:;" :class="{on:!showOn}" @click="showOn=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:showOn}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!truephone" class="get_verification" :class="{true_phone:truephone}" @click.prevent="getCode">{{(countdown!=30) ? countdown+'s后可再发送' : '获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!showOn}">
            <section>
              <section class="login_message" >
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
                <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd ? 'on': 'off'">
                  <!-- <div class="switch_circle" :class="showPwd ? 'right' : ''"></div> -->
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd? 'abc':'...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.go(-1)">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
    <alert-tip :alertText="alertTip" v-show="TipShow" @closeTip="closeTip"></alert-tip>
  </div>
</template>

<script>
import alertTip from '../../components/alertTip/alertTip.vue'
import {reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api'
export default {
  components: {alertTip},
  data () {
    return {
      showOn: true, // 登录方式,true短信
      phone: '', // 手机号
      countdown: 30, // 倒计时
      showPwd: false, // 显示密码
      pwd: '', // 密码
      name: '', // 用户名
      captcha: '', // 图片验证码
      code: '', // 短信验证码
      alertTip: '', // 错误提示码
      TipShow: false // 是否显示错误框
    }
  },
  computed: {
    truephone () {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    // 异步获取短信验证码
    async getCode () {
      // 启动倒计时
      if (this.countdown === 30) {
        this.timer = setInterval(() => {
          this.countdown = this.countdown - 1
          if (this.countdown <= 0) {
            clearInterval(this.timer)
            this.countdown = 30
          }
        }, 1000)
      }
      // 发送ajax请求
      const result = await reqSendCode(this.phone)
      if (result.code === 1) {
        // 提示
        this.alertTip = result.msg
        this.TipShow = true
        // 停止倒计时
        if (this.countdown) {
          clearInterval(this.timer)
          this.countdown = 30
        }
      }
    },
    async login () {
      let result
      if (this.showOn) {
        if (!this.truephone) {
          this.alertTip = '请输入正确的手机号'
          this.TipShow = true
          return
        } else if (!/^\d{6}$/.test(this.code)) {
          this.alertTip = '请输入正确的6位数验证码'
          this.TipShow = true
          return
        } else {
          // 短信登录
          result = await reqSmsLogin(this.phone, this.code)
        }
      } else {
        if (!this.name) {
          this.alertTip = '请输入用户名'
          this.TipShow = true
          return
        } else if (!this.pwd) {
          this.alertTip = '请输入密码'
          this.TipShow = true
          return
        } else if (!this.captcha) {
          this.alertTip = '请输入正确的4位验证码'
          this.TipShow = true
          return
        } else {
          // 密码登录
          const {name, pwd, captcha} = this
          result = await reqPwdLogin({name, pwd, captcha}) // 传入对象
        }
      }
      if (this.countdown) {
        clearInterval(this.timer)
        this.countdown = 30
      }
      // 统一处理
      if (result.code === 0) {
        const user = result.data
        // 将user保存到vuex的state中
        this.$store.dispatch('recordUserInfo', user)
        // 调转路由
        this.$router.replace('/profile')
      } else {
        this.alertTip = result.msg
        this.TipShow = true
        this.getCaptcha()
      }
    },
    closeTip () {
      this.TipShow = false
    },
    getCaptcha () { // 每次路径必须不一样
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
    /*
     getCaptcha (event) { // 利用冒泡机制,每次路径必须不一样
      event.target.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
    */
  }
}

</script>

<style lang="stylus">
 @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.true_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  // transition transform .3s
                  transition all .3s
                  &.right
                    left 25px
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
