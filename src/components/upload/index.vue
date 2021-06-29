<template>
  <div class="my_upload_wrap">
    <a-upload
      :list-type="listType"
      :showUploadList="false"
      :class="addClass"
      :disabled="loading"
      :customRequest="handleUpload"
      :file-list="fileList"
      :before-upload="beforeUpload"
      @change="handleChange"
    >
      <img
        :style="imgStyle"
        :class="imgRadius ? 'img_radius' : ''"
        v-if="fileList.length > 0"
        :src="fileList[0].url"
        style="object-fit: cover;"
      />
      <div class="upload_btn_box" :style="imgStyle" v-else>
        <div>
          <a-icon :type="loading ? 'loading' : 'plus'" />
        </div>
        <div class="ant-upload-text">
          {{ uploadText }}
        </div>
      </div>
    </a-upload>
    <div class="upload_tip" v-if="showTip">
      <p class="color-lightgrey">
        {{ typeTip }}
      </p>
      <p class="blue_style_box padding10">
        <a-icon class="color-blue" type="info-circle" theme="filled" />
        上传的图片将向用户展示，请慎重上传！
      </p>
    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  name: 'upload',
  props: {
    uploadApi: {
      type: Function
    },
    showTip: {
      type: Boolean,
      default: true
    },
    imgStyle: {
      type: String,
      default: 'width:86px;height:86px'
    },
    typeTip: {
      type: String,
      default: '图片格式支持：bmp、jpeg、jpg、png，大小不超过2MB'
    },
    borderRadius: {
      type: Boolean,
      default: false
    },
    imgRadius: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    maxList: {
      type: Number,
      default: 1
    },
    defaultFileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    uploadText: {
      type: String,
      default: '上传照片'
    },
    // 上传完成后，抛出的更改那个字段的名字
    name: {
      type: String,
      default: null
    }
  },
  computed: {
    addClass() {
      return {
        avatar_radius: this.borderRadius,
        img_radius: this.imgRadius,
        large_size: this.size === 'large',
        small_size: this.size === 'small',
        mini_size: this.size === 'mini'
      }
    }
  },
  data() {
    return {
      fileList: [],
      loading: false,
      previewImage: '',
      previewVisible: false
    }
  },
  created() {},
  watch: {
    defaultFileList(val) {
      if (val && val.length) {
        this.fileList = val
      }
    }
  },
  methods: {
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      if (!isJpgOrPng) {
        this.$message.error('图片格式支持：bmp、jpeg、jpg、png、gif!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJpgOrPng && isLt2M
    },
    handleChange(info) {},
    async handleUpload(file) {
      if (this.loading) {
        return
      }
      this.loading = true
      this.fileList = []
      const data = await this.uploadApi(file, (progress) => {}, this.baseUrl)
      this.fileList.push({
        uid: file.file.name + this._.random(0, 100),
        name: file.file.name,
        status: 'done',
        url: data.url
      })
      this.loading = false
      let params = {
        name: this.name,
        file: file,
        img: data.url
      }
      this.$emit('uploadOk', params)
    }
  }
}
</script>
<style lang="scss">
.avatar_radius {
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container,
  .ant-upload-list-picture-card .ant-upload-list-item {
    overflow: hidden;
    padding: 0; // 图片和边框的距离
    border-radius: 50%;
  }
}
.upload_btn_box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.small_size {
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 70px;
    height: 70px;
  }
}
.mini_size {
  .ant-upload-select-picture-card,
  .ant-upload-list-picture-card-container {
    width: 40px;
    height: 40px;
  }
  .ant-upload-list-picture-card .ant-upload-list-item {
    width: 100%;
    height: 100%;
  }
}

.my_upload_wrap
  .img_radius
  .ant-upload-list-picture-card
  .ant-upload-list-item-thumbnail
  img {
  border-radius: 50%;
}
.img_radius {
  border-radius: 50%;
}
.color-lightgrey,
.blue_style_box {
  color: #ff4440;
}
</style>
