<template>
  <div
    class="thumb-container"
    :class="{ 'thumb-container-link': fileType === 'link' }"
    :style="containerStyle"
  >
    <div class="images" v-viewer v-if="images.length > 0">
      <img
        v-for="src in images"
        class="thumb-container__img"
        width="100%"
        height="100%"
        :src="src"
        :data-src="src"
        alt="加载失败"
      />
    </div>

    <div
      v-if="maskIsShow"
      class="mask"
      :class="{ 'mask-video': fileType === 'video' }"
    >
      <div v-if="fileType === 'video'" class="el-icon-video-play" />
      <div v-else class="icon-link">
        <div class="iconfont icon-icon-pic_lianjiex" />
      </div>
    </div>
    <div v-if="fileType === 'ellipsis'" class="thumb-container__ellipsis">
      <div
        class="
          thumb-container__ellipsis__dot thumb-container__ellipsis__dot--first
        "
      />
      <div class="thumb-container__ellipsis__dot" />
      <div class="thumb-container__ellipsis__dot" />
      <div class="thumb-container__ellipsis__dot" />
      <div class="thumb-container__ellipsis__dot" />
    </div>
    <div
      v-if="showCloseIcon"
      class="thumb-container__close-btn"
      @click.stop="$emit('close')"
    >
      <a-icon type="close" />
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { directive as viewer } from 'v-viewer'
export default {
  name: 'ThumbContainer',
  directives: {
    viewer: viewer({
      debug: true
    })
  },
  data() {
    return {
      images: []
    }
  },
  props: {
    fileType: {
      type: String,
      required: true,
      validator: function (value) {
        const basicType = ['image', 'video', 'link', 'ellipsis']
        return basicType.indexOf(value) > -1
      }
    },
    thumbUrl: {
      type: String,
      required: true
    },
    showCloseIcon: {
      type: Boolean,
      default: false
    },
    width: {
      type: String || Number,
      default: '80px'
    },
    height: {
      type: String || Number,
      default: '80px'
    }
  },
  watch: {
    thumbUrl: {
      immediate: true,
      deep: true,
      handler(val) {
        this.thumbUrl = val
        this.images.push(val)
      }
    }
  },
  computed: {
    containerStyle() {
      return {
        width: parseFloat(this.width) + 'px',
        height: parseFloat(this.height) + 'px'
      }
    },
    maskIsShow() {
      return this.fileType === 'video' || this.fileType === 'link'
    }
  }
}
</script>
<style lang="scss" scope>
.thumb-container {
  position: relative;
  &__img {
    border-radius: 4px;
    cursor: pointer;
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    .icon {
      font-size: 50px;
      font-weight: bolder;
      color: #fff;
    }
    .icon-link {
      .icon {
        font-size: 30px;
        color: #999;
      }
    }
  }
  .mask-video {
    border-radius: 4px;
  }
  &__close-btn {
    position: absolute;
    top: -6px;
    right: -8px;
    line-height: 0;
    background: #0085ff;
    border-radius: 50%;
    z-index: 999;
    cursor: pointer;
    i {
      font-size: 14px;
      color: #fff;
      transform: scale(0.7);
    }
  }
  &__ellipsis {
    display: flex;
    align-items: flex-end;
    height: 100%;
    &__dot {
      display: inline-block;
      margin-right: 4px;
      width: 4px;
      height: 4px;
      background-color: #402e2e;
      border-radius: 50%;
      margin-bottom: 4px;
      &--first {
        margin-left: 2px;
      }
    }
  }
}
.thumb-container-link {
  background: #fff;
  border: 1px solid #e8eaec;
  border-radius: 4px;
}
.el-icon-video-play {
  font-size: 40px;
  color: #fff;
}
</style>
