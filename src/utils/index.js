/**
 * @description 绑定事件 on(element, event, handler)
 */
import _ from 'lodash'

export function findItemByName(arr, name) {
  return _.find(arr, function (o) {
    return o.name === name
  })
}

export function joinByKey(arr, key, transferFun) {
  let joinStr = ''
  _.forEach(arr, (item, ind) => {
    let unit = ind < arr.length - 1 ? '、' : ''
    joinStr += transferFun ? transferFun(item[key]) + unit : item[key] + unit
  })
  joinStr = joinStr.trim()
  return joinStr
}

export function getLableByVal(arr, val, key) {
  let findarr = []
  if (val.id && val.id.length) {
    findarr = arr.filter((o) => {
      return val.id.indexOf(o.id || o.value) >= 0
    })
  } else if (val && val.length) {
    findarr = arr.filter((o) => {
      return val.indexOf(o.value) >= 0
    })
  } else {
    findarr = _.filter(arr, val)
  }
  let arrs = []
  findarr.forEach((item) => {
    arrs.push(item[key])
  })
  return arrs.join('、')
}

export function ellipsisTxt(value, vlength = 25) {
  if (typeof value === 'undefined') {
    return ''
  }
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
}

// 根据当前咨询相关状态，判断当前咨询状态显示文案
export function statusLabel(status) {
  let label = ''
  let className = ''
  switch (status) {
    case 'PENDING':
      className = 'color-green'
      label = '待接入'
      break
    case 'SERVICE':
      className = 'color-green'
      label = '会话中'
      break
    case 'CLOSED':
      className = 'color-orange'
      label = '咨询结束'
      break
    case 'COMPLETED':
      className = 'color-grey'
      label = '会话结束待总结'
      break
    case 'CANCELED':
      className = 'color-grey'
      label = '已取消'
      break
    default:
      break
  }
  return { label, className }
}
// 深拷贝
export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
function isType(type) {
  return function (obj) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']'
  }
}
var isArray = Array.isArray || isType('Array')
export { isArray }
