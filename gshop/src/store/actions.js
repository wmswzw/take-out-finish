/* eslint-disable space-before-function-paren */

/**
 * 通过mutation间接更新state的多个方法对象
 */
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
import {
  reqAddress,
  reqFoodTypes,
  reqShopList,
  reqUserInfo,
  reqLogout,
  reqShopFoods,
  reqShopRatings,
  reqShopInfo,
  reqSearchShops
} from '../api'
export default {
  // 异步获取地址
  async getAddress({ commit, state }) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const address = result.data
      commit(RECEIVE_ADDRESS, { address })
    }
  },
  // 异步获取食品分类列表
  async getFoodTypes({ commit }) {
    // 发送异步ajax请求
    const result = await reqFoodTypes()
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const types = result.data
      commit(RECEIVE_TYPES, { types })
    }
  },
  // 异步获取商家列表
  async getShopList({ commit, state }) {
    // 发送异步ajax请求
    const { longitude, latitude } = state
    const result = await reqShopList(longitude, latitude)
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const shoplist = result.data
      commit(RECEIVE_SHOPLIST, { shoplist })
    }
  },
  // 同步记录用户信息
  recordUserInfo({ commit, userinfo }) {
    // 提交一个mutation
    commit(RECEIVE_USERINFO, { userinfo })
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    // 发送异步ajax请求
    const result = await reqUserInfo()
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const userinfo = result.data
      commit(RECEIVE_USERINFO, { userinfo })
    }
  },
  async logout({ commit }) {
    // 发送异步ajax请求
    const result = await reqLogout()
    // 提交一个mutation
    if (result.code === 0) { // 判断
      commit(RESET_USERINFO)
    }
  },
  async getShopFoods({ commit }, callback) {
    // 发送异步ajax请求
    const result = await reqShopFoods()
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const shopfoods = result.data
      commit(RECEIVE_SHOPFOODS, { shopfoods })
      // 数据更新了，执行回调函数
      callback && callback()
    }
  },
  async getShopRatings({ commit }, callback) {
    // 发送异步ajax请求
    const result = await reqShopRatings()
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const shopratings = result.data
      commit(RECEIVE_SHOPRATINGS, { shopratings })
      // 数据更新了，执行回调函数
      callback && callback()
    }
  },
  async getShopInfo({ commit }, callback) {
    // 发送异步ajax请求
    const result = await reqShopInfo()
    // 提交一个mutation
    if (result.code === 0) { // 判断
      const shopinfo = result.data
      commit(RECEIVE_SHOPINFO, { shopinfo })
      // 数据更新了，执行回调函数
      callback && callback()
    }
  },
  // 同步更新food中食物数量
  updateCount({ commit }, { isAdd, food }) {
    if (isAdd) {
      commit(INCREMENT_FOODCOUNT, { food })
    } else {
      commit(DECREMENT_FOODCOUNT, { food })
    }
  },
  // 同步清空购物车
  clearCart({ commit }) {
    commit(CLEAR_CART)
  },
  async getSearchShops({ commit, state }, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShops(geohash, keyword)
    if (result.code === 0) {
      const searchshops = result.data
      commit(RECEIVE_SEARCHSHOPS, { searchshops })
    }
  }
}
