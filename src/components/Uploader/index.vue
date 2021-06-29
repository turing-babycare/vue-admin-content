<template>
  <div class="uploader" @click="onClick">
    <input
      ref="file"
      type="file"
      class="input-file"
      :accept="accept.join(',')"
      :multiple="multiple"
      @change="onChange"
    />
    <div v-if="uploading" class="loading">
      <div class="icon icon-loading" />
      <div class="text">上传中: {{ progress }}%</div>
    </div>
    <slot />
  </div>
</template>
<script>
import { oss, postObject as PostObjectAPI } from '../../services/upload'
import getFileUrl from './getFileUrl'
import VideoFile from './VideoFile'
import async from 'async'

export default {
  name: 'Uploader',
  props: {
    accept: {
      type: Array,
      default() {
        return ['image/*']
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      uploading: false,
      progress: 0
    }
  },
  methods: {
    async onChange(e) {
      const fileList = e.target.files
      let fileListArr
      // 把上传的文件 FileList 类型转为 Array
      if (fileList.length > this.max) {
        this.$emit('overUploadMax')
      }
      if (fileList && fileList.length > 0) {
        fileListArr = Array.apply(null, {
          length: Math.min.apply(null, [fileList.length, this.max])
        }).reduce((acc, item, index) => acc.concat(fileList[index]), [])
      }
      const res = await oss(this.baseUrl)
      this.$emit('beforeUploading')
      this.uploading = true
      this.progress = 0
      async.each(
        fileListArr,
        async (file, callback) => {
          if (!file) {
            return
          }
          // let fileName = file.name.split('.')
          // fileName = fileName.length > 0 ? fileName[fileName.length - 1] : 'jpg'
          const key = `${res.path}${res.prefix}${Date.now()}`
          let apiParams = null
          let lastProgress = 0
          // 如果文件类型为video, 获取视频的时长、宽、高...
          if (file.type.indexOf('video') > -1) {
            file['videoMeta'] = await new VideoFile(getFileUrl(file)).getInfo()
          }
          apiParams = {
            oss: res,
            key: key,
            file: file,
            onProgress: (r) => {
              const curProgress = Math.floor(
                ((r.loaded / r.total) * 100) / fileListArr.length
              )
              this.progress += curProgress - lastProgress
              lastProgress = curProgress
            }
          }
          const url = await PostObjectAPI(apiParams)
          url.file = file
          this.$emit('upload', url)
          callback()
        },
        (err) => {
          if (!err) {
            this.progress = 100
            setTimeout(() => {
              this.uploading = false
              this.progress = 0
            }, 100)
          }
        }
      )
      // 重新设置input组件file值,修复不能上传同一张图片的bug
      this.$refs.file.value = null
    },
    onClick() {
      this.$refs.file.click()
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes load {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.input-file {
  position: fixed;
  top: -1000000px;
  left: -1000000px;
}
.uploader {
  position: relative;
}
.loading {
  position: absolute;
  top: -28px;
  left: 0;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  height: 24px;
  font-size: 12px;
  white-space: nowrap;
  background: #fff;
  border-radius: 4px;
  z-index: 99;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  .icon {
    margin-right: 4px;
    font-size: 16px;
    animation: load 1.5s linear infinite;
  }
  &::before {
    position: absolute;
    bottom: -5px;
    left: 8px;
    width: 8px;
    height: 8px;
    background: #fff;
    border: 1px solid hsla(0, 0%, 85%, 0.5);
    content: '';
    transform: rotate(45deg);
    border-left: 0;
    border-top: 0;
  }
}
</style>
