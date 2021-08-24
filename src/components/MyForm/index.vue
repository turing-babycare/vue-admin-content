<template>
  <div class="margin-bottom-10">
    <a-form-model
      :layout="form.layout"
      ref="myForm"
      :rules="rules"
      :colon="form.colon"
      :model="itemData"
      v-bind="formItemLayout"
    >
      <!-- 表单 -->
      <a-row v-if="form.formColumn > 1" :gutter="24" class="clearfix">
        <template v-for="(item, index) in formItem">
          <a-col
            :span="item.colSpan ? item.colSpan : 24 / formColumn"
            :key="index"
            :class="
              item.fLeft ? 'float-left' : item.fRight ? 'float-right' : ''
            "
          >
            <FormItem :item="item" :form="form" :formData="itemData">
              <slot :name="item.slotName"></slot>
            </FormItem>
          </a-col>
        </template>
      </a-row>

      <!-- 搜索 -->
      <template v-else v-for="(item, index) in formItem">
        <FormItem :item="item" :key="index" :form="form" :formData="itemData">
          <slot :name="item.slotName"></slot>
        </FormItem>
      </template>

      <!-- 操作按钮 -->
      <a-form-model-item>
        <a-row :gutter="20" class="clearfix" style="display: flex">
          <a-col v-for="(it, index) in form.btn" :key="index">
            <Abutton
              style="display: inline-block"
              :item="it"
              v-if="it.text"
              @btnClick="btnClick"
            ></Abutton>
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import FormItem from './FormItem'
import Abutton from './components/a-button.vue'
export default {
  components: { FormItem, Abutton },
  name: 'index',
  props: {
    formData: { type: Object, default: () => ({}) },
    form: {
      type: Object,
      default: () => {
        return {
          layout: '',
          btn: [],
          colon: '',
          labelCol: 4,
          wrapperCol: 20,
          formColumn: 1
        }
      }
    },
    baseUrl: {
      type: String,
      default: ''
    },
    rules: {},
    formItem: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      itemData: {}
    }
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        if (Object.keys(val).length) {
          this.itemData = val
        }
      },
      deep: true
    },
    formItem: {
      immediate: true,
      handler(item) {
        item
          .filter((t) => t.name)
          .map((i) => {
            this.$set(this.itemData, i.name, this.formData[i.name] || undefined)
          })
      },
      deep: true
    }
  },
  computed: {
    formItemLayout() {
      const { layout, labelCol, wrapperCol } = this.form
      let obj =
        layout === 'horizontal'
          ? {
              labelCol: labelCol,
              wrapperCol: wrapperCol
            }
          : layout === 'vertical'
          ? {}
          : {}
      return obj
    }
  },
  methods: {
    btnClick(val) {
      switch (val) {
        case 'submit':
          this.onSubmit()
          break
        case 'cancel':
          this.onCancel()
          break
        default:
          this.$emit(val)
      }
    },
    onSubmit() {
      this.$refs.myForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this._.cloneDeep(this.itemData))
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$refs.myForm.resetFields()
      this.$emit('cancel')
      this.formItem.forEach((i) => {
        this.$set(this.itemData, i.name, undefined)
      })
    }
  }
}
</script>

<style scoped>
.flex_center {
  display: flex;
}
</style>
