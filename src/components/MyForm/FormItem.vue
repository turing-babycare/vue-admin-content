<template>
  <a-form-model-item
    v-if="showItem(item) && !item.hidden"
    :label="item.label"
    :labelAlign="item.labelAlign || 'left'"
    :prop="item.prop || item.name"
    :class="item.type === 'text' ? 'bold_style' : item.class"
    :colon="form.colon || false"
    :labelCol="item.labelCol"
    :wrapperCol="item.wrapperCol"
    :style="item.style || ''"
  >
    <span v-if="item.tooltip" style="margin-right:8px;">
      <Atooltip
        style="display:inline-block;"
        :tooltip="item.tooltip"
      ></Atooltip>
    </span>
    <div v-if="item.type === 'input'">
      <Ainput
        :item="item"
        :item_name="formData[item.name]"
        @getVal="getVal"
      ></Ainput>
    </div>
    <div v-if="item.type === 'textarea'" class="textarea_wrap">
      <Atextarea
        :item="item"
        :item_name="formData[item.name]"
        @getVal="getVal"
      ></Atextarea>
    </div>
    <div class="text_box" v-if="item.type === 'text'">
      <span
        v-if="typeof item.name !== 'string' && item.name && item.name.length"
      >
        <template v-for="(iitem, nameIndex) in item.name">
          <span :key="nameIndex" v-if="nameIndex !== 0">{{ item.unit }}</span>
          <span :key="nameIndex + '_item_name'">
            {{ formData[iitem] }}
          </span>
        </template>
      </span>
      <span v-else> {{ formData[item.name] }}</span>
    </div>
    <div class="text_box" v-if="item.type === 'gender'">
      {{ genderOption(formData[item.name]) }}
    </div>
    <div class="text_box" v-if="item.type === 'dateTxt'">
      {{ formatTime(formData[item.name]) }}
    </div>
    <div class="text_box" v-if="item.type === 'avatar'">
      <div
        class="avatar_box"
        :style="item.imgStyle ? item.imgStyle : 'width:104px;height:104px;'"
        :class="item.imgRadius ? 'img_radius' : ''"
      >
        <img style="object-fit: cover;" :src="formData[item.name]" alt="" />
      </div>
    </div>
    <Atreeselect
      v-if="item.type === 'treeSelect'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    ></Atreeselect>
    <Aautocomplete
      v-if="item.type === 'autoComplete'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    ></Aautocomplete>
    <Aselect
      v-if="item.type === 'select'"
      :item="item"
      :item_name="formData[item.name] || undefined"
      @getVal="getVal"
    ></Aselect>
    <Acascader
      v-if="item.type === 'cascader'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    >
    </Acascader>
    <template v-if="item.type === 'inputNumber'">
      <AinputNumber
        :item="item"
        :item_name="formData[item.name] * 1 || undefined"
        @getVal="getVal"
      >
      </AinputNumber>
    </template>
    <Acheckbox
      v-if="item.type === 'checkbox'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    >
    </Acheckbox>
    <Aradio
      style="display:inline-block;"
      v-if="item.type === 'radio'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    >
    </Aradio>
    <Adate
      v-if="item.type === 'date'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    ></Adate>
    <Arange
      v-if="item.type === 'rangedate'"
      :item="item"
      :item_name="formData[item.name]"
      @getVal="getVal"
    ></Arange>
    <div v-if="item.type === 'timeRange'">
      <Atime :item="item" :item_name="formData[item.name]" @getVal="getVal">
      </Atime>
    </div>
    <a-switch v-if="item.type === 'switch'" v-model="formData[item.name]" />
    <div v-if="item.type === 'slot'">
      <slot></slot>
    </div>
    <div v-if="item.type === 'yjzq'">
      <a-input-number
        v-model="formData[item.value[0].name]"
        :precision="item.precision || undefined"
        :min="item.min || 0"
        :max="item.max || Infinity"
      />
      <span style="margin-right:4px">
        {{ item.value[0].unit }}
      </span>
      <span>
        {{ item.value[1].label }}
      </span>
      <a-input-number
        style="margin-right:4px"
        v-model="formData[item.value[1].name]"
        :precision="item.precision || undefined"
        :min="item.min || 0"
        :max="item.max || Infinity"
      />{{ item.value[1].unit }}
    </div>
    <span v-if="item.unit" style="margin-left:4px;">{{ item.unit }}</span>
  </a-form-model-item>
</template>
<script>
// import moment from 'moment'
// import { uploadApi } from '@/services/upload.js'
// import upload from '../upload'
// import UploaderList from '../UploaderList'
import { genderOption } from "../../utils/dictionary";

import Atooltip from "./components/a-tooltip.vue";
import Ainput from "./components/a-input.vue";
import Atextarea from "./components/a-textarea.vue";
import Atreeselect from "./components/a-tree-select.vue";
import Aautocomplete from "./components/a-auth.vue";
import Aselect from "./components/a-select.vue";
import Acascader from "./components/a-cascader.vue";
import AinputNumber from "./components/a-input-number.vue";
import Acheckbox from "./components/a-checkbox.vue";
import Aradio from "./components/a-radio.vue";
import Adate from "./components/a-date.vue";
import Arange from "./components/a-range";
import Atime from "./components/a-time.vue";
export default {
  name: "item",
  components: {
    // upload,
    // UploaderList,
    Atooltip,
    Ainput,
    Atextarea,
    Atreeselect,
    Aautocomplete,
    Aselect,
    Acascader,
    AinputNumber,
    Acheckbox,
    Aradio,
    Adate,
    Arange,
    Atime
  },
  computed: {
    // uploadApi() {
    //   return uploadApi
    // }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    formData: { type: Object, default: () => {} },
    form: {
      type: Object,
      default: () => {
        return { layout: "", btnTxt: "", cancelBtnTxt: "" };
      }
    }
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        this.formData = val;
      }
    }
  },
  methods: {
    // moment,
    genderOption,
    showItem(item) {
      // 没有关联项时直接显示
      if (item.show) {
        return true;
      }
      if (!item.cascaderItem) {
        return true;
        // 有关联项时再进行判断
      } else {
        // 当关联项的值等于某值时显示
        if (item.cascaderValue || item.cascaderValue === false) {
          // 当某项值等于或存在某个值时显示（如：数组中存在某个值则显示）
          if (item.parentCascader) {
            if (item.parentVal != this.formData[item.parentCascader]) {
              return false;
            }
          }
          if (
            item.cascaderValue === this.formData[item.cascaderItem] ||
            this._.indexOf(
              this.formData[item.cascaderItem],
              item.cascaderValue
            ) != -1 ||
            this._.indexOf(
              item.cascaderValue,
              this.formData[item.cascaderItem]
            ) != -1
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          // 当关联项的值不等于某个值时显示
          if (
            this.formData[item.cascaderItem] &&
            this.formData[item.cascaderItem] !== item.cascaderValueNot
          ) {
            return true;
          } else {
            return false;
          }
        }
      }
    },

    defaultList(item) {
      let arr = [];
      if (item && this.formData[item.name]) {
        arr.push({
          uid: this.formData.id + "" || Math.random() * 10 + "",
          name: this.formData.id + "" || Math.random() * 10 + "",
          status: "done",
          url: this.formData[item.name]
        });
      }
      return arr;
    },
    uploadOk(val) {
      this.formData[val.name] = val.img;
    },
    // selectChange(value, option) {
    //   const params = { value, option }
    //   this.$emit('selectChange', params)
    // },

    getVal(val) {
      this.formData[val.item_name] = val.item_val;
    }
  }
};
</script>
<style lang="scss">
.ant-select-selection--single .ant-select-selection__rendered {
  min-width: 68px;
}
.bold_style .ant-form-item-label > label {
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
}
.bold_style {
  line-height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.65);
  margin-bottom: 8px !important;
  .ant-form-item-label {
    line-height: 22px;
  }
  .text_box {
    line-height: 22px;
    // white-space: pre-wrap;
    white-space: pre-line;
  }

  .img_radius img {
    border-radius: 50%;
  }
}
.ant-row.ant-form-item.float-left.max_width_50 {
  max-width: 50%;
}
.textarea_wrap {
  position: relative;
}
.textarea_limit_wrap {
  position: absolute;
  right: 24px;
  bottom: 8px;
  height: 20px;
  color: rgba(0, 0, 0, 0.25);
}
.avatar_box {
  padding: 6px;
  // width: 106px;
  // height: 106px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  img {
    width: 100%;
    height: 100%;
  }
}
.input_suffix {
  color: #999;
  letter-spacing: -2px;
  margin-left: 4px;
}
</style>
