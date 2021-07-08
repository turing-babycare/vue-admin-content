<template>
  <div>
    <a-input-number
      v-model="input_val"
      :disabled="item.disabled"
      :precision="item.precision || undefined"
      :min="item.min || 0"
      :max="item.max || Infinity"
      :size="item.size"
      @change="change"
    />
    <span style="marginLeft: 20px" v-if="item.tip">{{ item.tip }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input_val: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    item_name: {
      type: Number,
      default: 0
    }
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.input_val = val
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.input_val
      }
      this.$emit('getVal', params)
    }
  }
}
</script>
