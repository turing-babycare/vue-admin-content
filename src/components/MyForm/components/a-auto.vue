<template>
  <div>
    <a-auto-complete
      style="width: 300px"
      @change="change"
      v-model="auth_val"
      :dataSource="item.options"
      :allowClear="item.allowClear"
      :disabled="item.disabled"
      :open="item.open"
      :filterOption="
        typeof item.filterOption !== 'undefined'
          ? item.filterOption
          : filterOption
      "
      :placeholder="item.holder || '请选择'"
    >
    </a-auto-complete>
  </div>
</template>
<script>
export default {
  name: 'input',
  data() {
    return {
      auth_val: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    item_name: {}
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.auth_val = val
      }
    }
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    change() {
      const params = {
        item_name: this.item.name,
        item_val: this.auth_val
      }
      this.$emit('getVal', params)
    }
  }
}
</script>
