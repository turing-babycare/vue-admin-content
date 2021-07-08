import dayjs from 'dayjs'
// 将秒转换为时分秒
export function secondToHMS(second) {
  var min = Math.floor(second % 3600)
  const hms =
    addZero(Math.floor(second / 3600)) +
    ':' +
    addZero(Math.floor(min / 60)) +
    ':' +
    addZero(second % 60)
  return hms
}
// “HH：mm：SS”和“MM：SS”或“SS”。
export function hmsToSeconds(hms) {
  var a = hms.split(':') // split it at the colons
  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2]
  return seconds
}
export function formatTime(time, options) {
  switch (options) {
    case 'y年m月d日':
      return dayjs(time).format('YYYY年MM月DD日')
    case 'h时m分':
      return dayjs(time).format('HH时mm分')
    case 'y-m-d':
    case '{y}-{m}-{d}':
      return dayjs(time).format('YYYY-MM-DD')
    case 'y.m.d':
      return dayjs(time).format('YYYY.MM.DD')
    case 'm-d':
      return dayjs(time).format('MM-DD')
    case 'h:m':
      return dayjs(time).format('HH:mm')
    case 'h:m:s':
      return dayjs(time).format('HH:mm:ss')
    case 'YMDHM':
      return dayjs(time).format('YYYY年MM月DD日 HH:mm')
    case 'MDHMS':
      return dayjs(time).format('MM-DD HH:mm:ss')
    case 'MDHM':
      return dayjs(time).format('MM-DD HH:mm')
    default:
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  }
}
export function timeByIsBefore(time, beforFormat, nowFormat) {
  let isBefor = dayjs(time).isBefore(new Date(), 'day')
  if (isBefor) {
    return formatTime(time, beforFormat)
  } else {
    return formatTime(time, nowFormat || 'h:m')
  }
}
export function seconds(time) {
  return dayjs(time).format('HH:mm')
}

export function getHours(time) {
  const second = dayjs.duration(time).asSeconds()
  if (second < 3600) {
    return `${dayjs.duration(time).get('minutes')}分钟`
  } else {
    const remainder = second % 3600
    return `${dayjs.duration(time).get('hours')}小时${remainder / 60}分钟`
  }
}

export function formatPT(time, type = 'months') {
  return Math.round(dayjs.duration(time).get(type))
}

export function getServiceDay(time) {
  return seconds(new Date(dayjs().startOf('days') + dayjs.duration(time)))
}

export function price(value) {
  if (!Number(value)) return value
  return `${Number(value).toFixed(2)}`
}

// 保留digits位小数，integer
export function formatDigit(number, digits = 2, integer = true) {
  const zero = (dig) => {
    const numberList = []
    for (let i = 0; i < dig; i++) {
      numberList[i] = 0
    }
    return numberList.join('')
  }
  const arr = String(number).split('.')
  let decimal = arr[1] || ''
  if (decimal) {
    if (decimal.length > digits) {
      decimal = decimal.substr(0, digits)
    }
    if (decimal.length < digits) {
      if (integer) {
        decimal += zero(digits - decimal.length)
      }
    }
  } else {
    if (integer) {
      decimal = zero(digits)
    }
  }
  return integer ? Number(arr[0] + decimal) : Number(`${arr[0]}.${decimal}`)
}
export function RegexText(str, key) {
  return str.replace(new RegExp(`${key}`, 'g'), `%%${key}%%`).split('%%')
}

export function toSeconds({ day = 0, hours = 0, minutes = 0, _seconds = 0 }) {
  return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + _seconds
}

export function addZero(value = 0) {
  if (value.toString().length === 1) {
    return `0${value}`
  } else {
    return value.toString()
  }
}
// // 等待时长，从某个时间点计时-距离当前时间的时长
// export function waitTime(time, type) {
//   let sumSecond = ''
//   if (new Date(time) < Date.now()) {
//     sumSecond = -dayjs(time).diff(dayjs(Date.now()), 'seconds')
//   } else {
//     sumSecond = dayjs(Date.now()).diff(dayjs(time), 'seconds')
//   }
//   if (type === 'obj') {
//     const hms = secondToHMS(sumSecond)
//     let timeObj = {
//       hours: hms.split(':')[0],
//       minutes: hms.split(':')[1],
//       seconds: hms.split(':')[2]
//     }
//     return timeObj
//   } else {
//     return secondToHMS(sumSecond)
//   }
// }

export function secondToTime(_seconds) {
  let [day, hours, minutes, __seconds] = [0, 0, 0, 0]
  if (_seconds > 0) {
    day = Math.floor(_seconds / (60 * 60 * 24))
    hours = Math.floor(_seconds / (60 * 60)) - day * 24
    minutes = Math.floor(_seconds / 60) - day * 24 * 60 - hours * 60
    __seconds =
      Math.floor(_seconds) - day * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
  }
  return {
    day: addZero(day),
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(__seconds)
  }
}

export function diffSecond(time, endTime) {
  const startDate = dayjs(time)
  const endDate = dayjs(endTime || new Date())
  return endDate.diff(startDate, 'seconds')
}

// 计算两个时间内总工作时长（秒）
export function workDiff(start, end, returnType, sWTime, eWTime) {
  let seconds = 0
  let startWorkTime = 0
  let endWorkTime = 0
  if (!eWTime) {
    // 工作时长0-24
    startWorkTime = 0 * 3600 // 早0点
    endWorkTime = 24 * 3600 // 晚24点
  } else {
    // 健康咨询工作时长 8:00-20:00
    startWorkTime = sWTime
    endWorkTime = eWTime
  }
  let startAt = new Date(start)
  let endAt = end ? new Date(end) : new Date()
  // eslint-disable-next-line no-unmodified-loop-condition
  while (startAt < endAt) {
    const startZero = new Date(startAt)
    startZero.setHours(0)
    startZero.setMinutes(0)
    startZero.setSeconds(0)
    startZero.setMilliseconds(0)
    const startHour = (startAt - startZero) / 1000
    if (startHour >= startWorkTime && startHour < endWorkTime) {
      seconds += 1
    }
    startAt.setTime(startAt.setSeconds(startAt.getSeconds() + 1))
  }
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60
  const _seconds = seconds % 60
  if (returnType === 'obj') {
    return {
      hours: addZero(parseInt(hours)),
      minutes: addZero(parseInt(minutes)),
      seconds: addZero(parseInt(_seconds))
    }
  }
  return (
    addZero(parseInt(hours)) +
    ':' +
    addZero(parseInt(minutes)) +
    ':' +
    addZero(parseInt(_seconds))
  )
}

export function checkMobile(mobile) {
  const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
  return reg.test(mobile)
}

export function getAgeOfMonthStr(birthday, from = new Date()) {
  let ageOfMonth = ''

  const span =
    dayjs(from).startOf('day').valueOf() -
    dayjs(birthday).startOf('day').valueOf()

  if (span <= 0) {
    ageOfMonth = '1天'
    return ageOfMonth
  }
  const durations = dayjs.duration(span)
  const year = durations.years()
  const months = durations.months()
  const days = durations.days()
  if (year !== 0) {
    ageOfMonth += `${year}岁`
  }
  if (months !== 0) {
    ageOfMonth += `${months}个月`
  }
  if (days !== 0) {
    ageOfMonth += `${days}天`
  }
  return ageOfMonth || '1天'
}
