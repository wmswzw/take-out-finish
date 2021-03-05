/* eslint-disable space-before-function-paren */
/**
 * 包含多个基于state的getter计算属性的对象
 */
export default {
  // eslint-disable-next-line space-before-function-paren
  totalCount(state) {
    return state.cartfoods.reduce((PreTotal, food) => PreTotal + food.count, 0)
  },
  totalPrice(state) {
    return state.cartfoods.reduce((PreTotal, food) => PreTotal + food.count * food.price, 0)
  },
  positiveSize(state) {
    return state.shopratings.reduce((PreTotal, rating) => PreTotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
