// import _ from 'lodash'
export function getArrOrLabel(arr, value, type) {
  if (type) {
    return arr
  } else {
    const findObj = arr.find((arr) => arr.value === value)
    if (findObj) {
      return findObj.label
    }
    return ''
  }
}
/**
 *
 * @param {*} value 根据value,返回相应的label
 * @param {*} type 是否返回arr,若不传则getLabelByValue
 * value传入值可能为空，所以arr为必传字段，判断是否返回整个数组还是getLabelByValue
 */
// value为 根据/admin/ask/ask-types 接口返回的值，主要用于服务台咨询历史展示匹配（先这样写）
export function askType(value, type) {
  let arr = [
    {
      label: '儿科问题',
      value: '3'
    },
    {
      label: '妇产科问题',
      value: '2'
    }
  ]
  return getArrOrLabel(arr, value, type)
}

export function genderOption(value, type) {
  let arr = [
    {
      label: '男',
      value: 1
    },
    {
      label: '女',
      value: 2
    },
    {
      label: '未知',
      value: 3 // 0会选不中，所以改为3,可能需要转一下
    }
  ]
  return getArrOrLabel(arr, value, type)
}
export function workDayOptions(value, type) {
  let arr = [
    {
      label: '周一至周五',
      value: 'MON_TO_FRI'
    },
    {
      label: '周一至周六',
      value: 'MON_TO_SAT'
    },
    {
      label: '周一至周日',
      value: 'MON_TO_WEEK'
    }
  ]
  return getArrOrLabel(arr, value, type)
}
export function relationOpt(value, type) {
  let arr = [
    {
      label: '本人',
      value: 1
    },
    {
      label: '配偶',
      value: 2
    },
    {
      label: '子女',
      value: 3
    },
    {
      label: '父母',
      value: 4
    },
    {
      label: '其他',
      value: 5
    }
  ]
  return getArrOrLabel(arr, value, type)
}
