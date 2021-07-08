<template>
  <div>
    <a-range-picker
      v-model="range_val"
      :show-time="item.showTime"
      :disabled-date="item.disabledDate"
      :disabled-time="item.disabledRangeTime"
      :format="item.format ? item.format : 'YYYY-MM-DD HH:mm'"
      @change="change"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      range_val: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    item_name: {
      default: () => ({})
    }
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.range_val = val || []
      }
    }
  },
  methods: {
    change() {
      const params = {
        item_name: this.item.name,
        item_val: this.range_val
      }
      this.$emit('getVal', params)
    }
  }
}
</script>
