/* eslint-disable space-before-function-paren */
/**
 * 直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_TYPES,
  RECEIVE_ADDRESS,
  RECEIVE_SHOPLIST,
  RECEIVE_USERINFO,
  RESET_USERINFO,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOPFOODS,
  RECEIVE_SHOPRATINGS,
  INCREMENT_FOODCOUNT,
  DECREMENT_FOODCOUNT,
  CLEAR_CART,
  RECEIVE_SEARCHSHOPS
} from './mutation-types'
export default {
  [RECEIVE_ADDRESS](state, { address }) {
    state.address = address
  },
  [RECEIVE_TYPES](state, { types }) {
    state.types = types
  },
  [RECEIVE_SHOPLIST](state, { shoplist }) {
    state.shoplist = shoplist
  },
  [RECEIVE_USERINFO](state, { userinfo }) {
    state.userinfo = userinfo
  },
  [RESET_USERINFO](state) {
    state.userinfo = {}
  },
  [RECEIVE_SHOPINFO](state, { shopinfo }) {
    state.shopinfo = shopinfo
  },
  [RECEIVE_SHOPFOODS](state, { shopfoods }) {
    state.shopfoods = shopfoods
  },
  [RECEIVE_SHOPRATINGS](state, { shopratings }) {
    state.shopratings = shopratings
  },
  [INCREMENT_FOODCOUNT](state, { food }) {
    if (!food.count) {
      // food.count = 1 // 新增加属性(没有数据绑定)
      Vue.set(food, 'count', 1) /** 对象 属性名 属性值 */ // 让新增加的数据也有数据绑定
      state.cartfoods.push(food)// 将food添加到cartfoods中
    } else {
      food.count++
    }
  },
  [DECREMENT_FOODCOUNT](state, { food }) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartfoods.splice(state.cartfoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CART](state) {
    // 清除food中count
    state.cartfoods.forEach(food => food.count = 0)
    // 移除购物车中所有项
    state.cartfoods = []
  },
  [RECEIVE_SEARCHSHOPS](state, { searchshops }) {
    state.searchshops = searchshops
  }

}
