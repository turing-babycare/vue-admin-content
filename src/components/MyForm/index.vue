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
      <!-- 栅格列布局，表单 -->
      <a-row v-if="formColumn > 1" :gutter="24" class="clearfix">
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

      <!-- 垂直、水平、inline布局 -->
      <template v-else v-for="(item, index) in formItem">
        <FormItem :item="item" :key="index" :form="form" :formData="itemData">
          <slot :name="item.slotName"></slot>
        </FormItem>
      </template>

      <!-- 操作按钮 -->
      <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-row :gutter="20" class="clearfix" style="display:flex">
          <a-col v-for="(it, index) in form.btn" :key="index">
            <Abutton
              style="display: inline-block;"
              :item="it"
              @btnClick="btnClick"
            ></Abutton>
          </a-col>
        </a-row>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import FormItem from "./FormItem";
import Abutton from "./components/a-button.vue";
export default {
  components: { FormItem, Abutton },
  name: "index",
  props: {
    formData: { type: Object, default: () => {} },
    form: {
      type: Object,
      default: () => {
        return { layout: "", btnTxt: "", cancelBtnTxt: "" };
      }
    },
    rules: {},
    labelCol: {
      type: Object,
      default: () => {
        return { span: 4 };
      }
    },
    formColumn: {
      type: Number,
      default: 1
    },
    formItem: {
      type: Array,
      default: () => []
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return { span: 20 };
      }
    }
  },
  data() {
    return {
      itemData: {}
    };
  },
  watch: {
    formData: {
      immediate: true,
      handler(val) {
        if (Object.keys(val).length) {
          this.itemData = val;
        }
      }
    },
    formItem: {
      immediate: true,
      handler(item) {
        item.map(i => {
          this.$set(this.itemData, i.name, this.formData[i.name] || undefined);
        });
      }
    }
  },
  computed: {
    btnWrapperCol() {
      return { span: this.wrapperCol.span, offset: this.labelCol.span };
    },
    formItemLayout() {
      const { layout } = this.form;
      let obj =
        layout === "horizontal"
          ? {
              labelCol: this.labelCol,
              wrapperCol: this.wrapperCol
            }
          : layout === "vertical"
          ? {}
          : {};
      return obj;
    },
    buttonItemLayout() {
      const { layout } = this.form;
      return layout === "horizontal"
        ? {
            wrapperCol: this.btnWrapperCol
          }
        : {};
    }
  },
  methods: {
    btnClick(val) {
      switch (val) {
        case "submit":
          this.onSubmit();
          break;
        case "cancel":
          this.onCancel();
          break;
        default:
          this.$emit(val);
      }
    },
    onSubmit() {
      this.$refs.myForm.validate(valid => {
        if (valid) {
          this.$emit("submit", _.cloneDeep(this.itemData));
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.$refs.myForm.resetFields();
      this.$emit("cancel");
      this.formItem.forEach(i => {
        this.$set(this.itemData, i.name, undefined);
      });
    }
  }
};
</script>

<style scoped>
.flex_center {
  display: flex;
}
</style>
