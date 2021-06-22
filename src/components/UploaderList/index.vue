<template>
  <div class="upload-list">
    <thumb-container
      v-for="({ type, url }, index) in curUploadList"
      :key="index"
      :file-type="type ? type : 'image'"
      :thumb-url="getThumbUrl(url, type)"
      :width="width"
      :height="height"
      class="upload-list__item"
      :show-close-icon="true"
      inline
      @close="handleDeleteFile(index)"
      @click.native.stop="thumbClickFun(type, url)"
    />
    <uploader
      v-if="curMax > 0 && !disabled"
      class="upload-list__item upload-list__item--last"
      multiple
      :accept="['image/*', 'video/*']"
      :max="curMax"
      @upload="onImageUpload"
      @overUploadMax="overUploadMax"
    >
      <div class="upload-list__uploader" :style="containerStyle">
        <a-icon type="plus" />
        <span>最多{{ max }}个</span>
      </div>
    </uploader>
    <!-- <monitor
      ref="monitor"
      :need-refresh="true"
      :monitor-info="monitorInfo"
      :current-image-url-arr="curUploadUrlList"
    /> -->
  </div>
</template>

<script>
import Uploader from '@/components/Uploader'
import ThumbContainer from '@/components/ThumbContainer'
// import Monitor from '@/components/Monitor'

import { deepCopy, isArray } from '@/utils'
export default {
  components: {
    Uploader,
    ThumbContainer
    // Monitor
  },
  model: {
    prop: 'uploadList',
    event: 'change'
  },
  props: {
    uploadList: {
      type: Array || undefined,
      default: () => []
    },
    value: {
      type: Array || undefined,
      default: () => []
    },
    width: {
      type: String || Number,
      default: '100px'
    },
    height: {
      type: String || Number,
      default: '100px'
    },
    max: {
      type: Number,
      default: 10
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      monitorInfo: {},
      curUploadList: []
      // curUploadUrlList: []
    }
  },
  computed: {
    containerStyle() {
      return {
        width: parseFloat(this.width) + 'px',
        height: parseFloat(this.height) + 'px'
      }
    },
    curMax() {
      return this.max >= this.curUploadList.length
        ? this.max - this.curUploadList.length
        : 0
    },
    curUploadUrlList() {
      let array = []
      this.curUploadList.map((item) => {
        if (item.type === 'image') {
          if (item && item.type === 'image') {
            array.push(item.url)
          }
        }
      })
      return array
    }
  },
  watch: {
    uploadList: {
      handler: function(value) {
        if (value && isArray(value)) this.curUploadList = deepCopy(value)
      },
      immediate: true
    },
    value: {
      handler: function(value) {
        if (isArray(value)) this.curUploadList = deepCopy(value)
      },
      immediate: true
    }
  },
  methods: {
    getThumbUrl(url, type) {
      switch (type) {
        case 'image':
          return url + `?x-oss-process=image/resize,h_${parseFloat(this.width)}`
        case 'video':
          return url + '?x-oss-process=video/snapshot,t_0,w_0,h_0,f_jpg'
        default:
          return ''
        // throw new Error('type !== "image" || "video"')
      }
    },
    onImageUpload(res) {
      this.$emit('change', {
        url: res.url,
        type:
          res.file && res.file.type && res.file.type.indexOf('video') > -1
            ? 'video'
            : 'image'
      })
    },
    overUploadMax() {
      this.$message.error('超出一次能上传的最大个数，超出的文件不上传')
    },
    handleDeleteFile(index) {
      if (
        this.monitorInfo &&
        this.monitorInfo.meta &&
        this.monitorInfo.meta.url &&
        this.curUploadList[index].url === this.monitorInfo.meta.url
      ) {
        if (this.$refs.monitor) this.$refs.monitor.viewerReset()
        this.monitorInfo = {}
      }
      const curUploadList = deepCopy(this.curUploadList)
      curUploadList.splice(index, 1)
      this.$emit('change', curUploadList)
    },
    thumbClickFun(type, url) {
      this.monitorInfo = {
        type,
        meta: { url }
      }
      // this.$refs.monitor.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-list {
  .clearfix {
    &::after {
      display: block;
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
      content: ' ';
    }
  }
  &__item {
    float: left;
    margin-right: 13px;
    max-height: 100%;
    &--last {
      margin-right: 0;
    }
  }
  &__uploader {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 12px;
    font-size: 12px;
    text-align: center;
    color: #808695;
    border: 1px solid #e8eaec;
    border-radius: 4px;
    flex-direction: column;
    letter-spacing: 0;
    cursor: pointer;
    font-family: 'PingFangSC-Regular';
    i {
      font-size: 16px;
      margin-bottom: 4px;
    }
  }
}
</style>
