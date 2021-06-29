// import { Modal, message } from 'ant-design-vue'
// import { Modal } from 'ant-design-vue'
import axios from 'axios'
const instance = axios.create()

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('_token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // if (error.response) {
    //   const response = error.response
    //   const traceId = response.headers['X-TRACE-ID']
    //   const id = traceId ? `[${traceId}] ` : ''
    //   const msg = response.data['message']
    //   error.message = msg
    //   if (response.status === 401) {
    //     Modal.error({
    //       title: '操作失败',
    //       content: '登录超时，请重新登陆'
    //     })
    //     setTimeout(() => {
    //       window.localStorage.removeItem('_token')
    //       location.reload()
    //     }, 1000)
    //   } else if (response.status === 500) {
    //     Modal.error({
    //       title: '操作失败',
    //       content: `${msg} ${id}`
    //     })
    //   } else {
    //     Modal.warning({
    //       title: '操作失败',
    //       content: `${msg} ${id}`
    //     })
    //   }
    // } else {
    //   Modal.error({
    //     title: '操作失败',
    //     content: `服务器连接失败: ${error.message}`
    //   })
    //   error.message = `服务器连接失败: ${error.message}`
    // }
    return Promise.reject(error)
  }
)

export const oss = (url) => {
  return instance.get(`${url}/oss/auth`)
}

export const getImageMeta = (url) => {
  return instance.get(url + '?x-oss-process=image/info')
}
export const postObject = async ({ oss: ossData, key, file, onProgress }) => {
  const data = new FormData()
  data.append('OSSAccessKeyId', ossData.OSSAccessKeyId)
  data.append('success_action_status', 200)
  data.append('policy', ossData.policy)
  data.append('Signature', ossData.Signature)
  data.append('key', key)
  data.append('file', file)
  let url = 'https://pic1.baobaohehu.com/'
  await axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onProgress || null
  })
  url = url + key
  let meta
  if (file.type.indexOf('image') > -1) {
    meta = await getImageMeta(url)
  } else if (file.type.indexOf('video') > -1) {
    meta = {
      ...file.videoMeta,
      size: file.size
    }
  } else if (file.type.indexOf('audio') > -1) {
    meta = {
      size: file.size,
      type: file.type
    }
  } else {
    throw new Error(
      '当前上传的类型不是image或者video；当前上传的类型是' + file.type
    )
  }
  return {
    url,
    meta: meta
  }
}
// 获取文件后缀名
export const extname = (filename) => {
  if (!filename || typeof filename !== 'string') {
    return false
  }
  const a = filename
    .split('')
    .reverse()
    .join('')
  const b = a
    .substring(0, a.search(/\./))
    .split('')
    .reverse()
    .join('')
  return b
}
/**
 * 封装下oss获取跟上传
 * @param file
 * @param onProgress
 * @returns {Promise.<*>}
 */
export const uploadApi = async (file, onProgress) => {
  const File = file.file
  const data = await oss()
  const random = Math.floor(Math.random() * (100 - 1)) + 1
  let fileName = new Date().getTime()
  const fileType = extname(File.name)
  fileName = fileName + random + '.' + fileType
  const key = `${data.path}${data.prefix}/${fileName}`
  const res = await postObject({ oss: data, key, file: File, onProgress })
  return res
}
