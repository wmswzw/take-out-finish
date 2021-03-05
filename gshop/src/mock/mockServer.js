/**
 * 使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/foods', { code: 0, data: data.foods })

Mock.mock('/ratings', { code: 0, data: data.ratings })

Mock.mock('/info', { code: 0, data: data.info })
