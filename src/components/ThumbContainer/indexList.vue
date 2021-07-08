<template>
  <div class="images" v-viewer="{ movable: false }">
    <div
      v-for="(item, index) in uploadlist"
      :key="index"
      @click="$emit('thunClick', item.type, item.url)"
      :class="{ 'thumb-container-link': item.type === 'link' }"
      class="thumb-container"
      :style="containerStyle"
    >
      <div style="width: 100%; height: 100%">
        <video
          v-if="item.type === 'video'"
          width="100%"
          height="100%"
          controls="controls"
          :src="item.video"
          class="el-icon-video-play"
        ></video>
        <img
          class="thumb-container__img"
          width="100%"
          height="100%"
          :src="item.url"
          :data-src="item.url"
          alt="加载失败"
          v-else
        />
        <div v-if="item.type === 'ellipsis'" class="thumb-container__ellipsis">
          <div
            class="
              thumb-container__ellipsis__dot
              thumb-container__ellipsis__dot--first
            "
          />
          <div class="thumb-container__ellipsis__dot" />
          <div class="thumb-container__ellipsis__dot" />
          <div class="thumb-container__ellipsis__dot" />
          <div class="thumb-container__ellipsis__dot" />
        </div>
      </div>

      <!--
      <div
        v-if="maskIsShow"
        class="mask"
        :class="{ 'mask-video': item.type === 'video' }"
      >
        <div v-if="item.type === 'video'" class="el-icon-video-play">
          <video
            controls="controls"
            src="https://pic1.baobaohehu.com/fhs/admin/521202107071444147501625640266376"
          ></video>
        </div>
        <div v-else class="icon-link">
          <div class="iconfont icon-icon-pic_lianjiex" />
        </div>
      </div>
      <div v-if="item.type === 'ellipsis'" class="thumb-container__ellipsis">
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
      -->
      <!--
       icon操作
      -->
      <div
        v-if="showCloseIcon"
        class="thumb-container__close-btn"
        @click.stop="closeClick(index)"
      >
        <a-icon type="close" />
      </div>
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { directive as viewer, api as viewerApi } from 'v-viewer'
export default {
  name: 'ThumbContainer',
  directives: {
    viewer: viewer({
      debug: true
    })
  },
  data() {
    return {
      uploadlist: []
    }
  },
  props: {
    uploadList: {
      type: Array,
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
    uploadList: {
      immediate: true,
      deep: true,
      handler(val) {
        this.uploadlist = val.map((it) => {
          if (it.type === 'image') {
            return {
              ...it,
              type: it.type ? it.type : 'image',
              url:
                it.url +
                `?x-oss-process=image/resize,h_${parseFloat(this.width)}`
            }
          }
          if (it.type === 'video') {
            return {
              ...it,
              type: it.type ? it.type : 'image',
              url: it.url + '?x-oss-process=video/snapshot,t_0,w_0,h_0,f_jpg',
              video: it.url
            }
          }
        })
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
  },
  methods: {
    closeClick(index) {
      this.$emit('close', index)
    }
  }
}
</script>
<style lang="scss" scope>
.thumb-container {
  position: relative;
  margin-right: 13px;
  margin-bottom: 13px;
  float: left;
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
// 图片遮罩层操作
.setBox {
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  font-size: 18px;
  cursor: pointer;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0px;
  display: none;
}
.thumb-container__close-btn {
  display: none;
}
.thumb-container:hover .thumb-container__close-btn {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
