<template>
  <div class="box">
    <!--image-->
    <div class="images">
      <viewer
        :images="imageList"
        @inited="inited"
        class="viewer image-box"
        ref="viewer"
      >
        <template>
          <div
            v-for="item in imageList"
            :key="item + 'image'"
            class="thumb-container"
          >
            <img
              class="el-icon-video-play"
              :src="item"
              :style="containerStyle"
            />
            <div
              class="thumb-container__close-btn"
              @click.stop="closeClick(item, 'image')"
            >
              <a-icon type="close" />
            </div>
          </div>
        </template>
      </viewer>
    </div>
    <!--video -->
    <div class="video-center">
      <div
        v-for="(item, index) in videoList"
        :key="index + 'vedio'"
        :style="containerStyle"
        class="thumb-container video-box"
      >
        <img
          width="100%"
          height="100%"
          controls="controls"
          :src="item.url"
          class="el-icon-video-play"
        />
        <div
          class="thumb-container__close-btn"
          @click.stop="closeClick(item, 'video')"
        >
          <a-icon type="close" />
        </div>

        <div @click="openVideo(item)" class="video-circle">
          <a-icon type="play-circle" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from 'v-viewer'
export default {
  name: 'ThumbContainer',
  components: {
    Viewer
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
    imageList() {
      return this.uploadList
        .filter((it) => it.type === 'image')
        .map((it) => it.url)
    },
    videoList() {
      return this.uploadList
        .filter((it) => it.type === 'video')
        .map((it) => {
          return {
            url: it.url + '?x-oss-process=video/snapshot,t_0,w_0,h_0,f_jpg',
            video: it.url
          }
        })
    },
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
    closeClick(item, type) {
      if (type === 'image') {
        return this.$emit('close', item)
      }
      if (type === 'video') {
        return this.$emit('close', item.video)
      }
    },
    openVideo(item) {
      window.open(item.video)
    },
    inited(viewer) {
      this.$viewer = viewer
    }
  }
}
</script>
<style lang="scss" scope>
.box,
.image-box {
  display: flex;
  flex-wrap: wrap;
}
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
  // display: none;
}
.video-center,
.video-box {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.video-circle {
  display: none;
  position: absolute;
  line-height: 0;
  background: #0085ff;
  border-radius: 50%;
  z-index: 999;
  cursor: pointer;
  i {
    font-size: 24px;
    color: #fff;
    transform: scale(0.7);
  }
}
.video-box:hover .video-circle {
  display: block;
}
</style>
