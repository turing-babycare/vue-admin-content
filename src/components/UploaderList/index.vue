<template>
  <div class="upload-list">
    <thumb-container
      :uploadList="uploadList"
      :width="width"
      :height="height"
      :show-close-icon="true"
      inline
      @close="handleDeleteFile"
    ></thumb-container>

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
  </div>
</template>

<script>
import Uploader from '../Uploader/index.vue'
import ThumbContainer from '../ThumbContainer/indexList.vue'
import _ from 'lodash'
import { deepCopy, isArray } from '../../utils/index.js'
export default {
  components: {
    Uploader,
    ThumbContainer
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
    item_name: {
      type: String,
      default: ''
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
      curUploadList: [],
      curMax: 0
    }
  },
  computed: {
    containerStyle() {
      return {
        width: parseFloat(this.width) + 'px',
        height: parseFloat(this.height) + 'px'
      }
    }
  },
  watch: {
    uploadList: {
      immediate: true,
      handler(value) {
        if (value && isArray(value)) this.curUploadList = _.cloneDeep(value)
        this.curMax =
          this.max >= this.curUploadList.length
            ? this.max - this.curUploadList.length
            : 0
      },
      deep: true
    },
    value: {
      deep: true,
      immediate: true,
      handler(value) {
        if (value && isArray(value)) this.curUploadList = _.cloneDeep(value)
      }
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
      }
    },
    onImageUpload(res) {
      let result = {
        item_name: this.item_name,
        url: res.url,
        type: 'image'
      }
      if (res.file && res.file.type && res.file.type.indexOf('video') > -1) {
        result.type = 'video'
        result.video =
          res.url + '?x-oss-process=video/snapshot,t_0,w_0,h_0,f_jpg'
        this.$emit('change', result)
      } else {
        this.$emit('change', result)
      }
    },
    overUploadMax() {
      this.$message.error('超出一次能上传的最大个数，超出的文件不上传')
    },
    handleDeleteFile(val) {
      const curUploadList = deepCopy(this.uploadList)
      const index = this._.findIndex(curUploadList, function (e) {
        return e.url === val
      })
      curUploadList.splice(index * 1, 1)
      this.$emit('change', curUploadList)
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
