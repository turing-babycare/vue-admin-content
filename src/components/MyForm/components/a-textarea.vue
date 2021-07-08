<template>
  <div>
    <a-input
      :placeholder="item.holder"
      :maxLength="item.maxLength"
      :auto-size="{
        minRows: item.minRows || 2,
        maxRows: item.maxRows || 5
      }"
      @change="textareaChange($event, item)"
      v-model="textarea_val"
      :disabled="item.disabled"
      type="textarea"
    >
    </a-input>
    <div v-if="item.showLimit || item.maxLength" class="textarea_limit_wrap">
      {{ textarea_val ? textarea_val.length : 0 }}/{{ item.maxLength }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea_val: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    item_name: {}
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.textarea_val = val
      }
    }
  },
  methods: {
    textareaChange(event, item) {
      if (item.showLimit && this.textarea_val.length >= item.maxLength) {
        this.textarea_val = this.textarea_val.substring(0, item.maxLength)
      }
      const params = {
        item_name: this.item.name,
        item_val: this.textarea_val
      }
      this.$emit('getVal', params)
    }
  }
}
</script>

<style>
.textarea_limit_wrap {
  position: absolute;
  right: 24px;
  bottom: 8px;
  height: 20px;
  color: rgba(0, 0, 0, 0.25);
}
</style>
