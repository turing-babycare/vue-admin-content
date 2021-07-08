<template>
  <div>
    <a-range-picker
      v-model="range_val"
      :show-time="item.showTime"
      :disabled="item.disable"
      :disabled-date="item.disabledDate"
      :disabled-time="item.disabledRangeTime"
      :format="item.format ? item.format : 'YYYY-MM-DD HH:mm'"
      @change="change"
    />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
export default Vue.extend({
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
      const result = [] as string[]
      result[0] = moment(this.range_val[0]).format(this.item.format)
      result[1] = moment(this.range_val[1]).format(this.item.format)
      const params = {
        item_name: this.item.name,
        item_val: result
      }
      this.$emit('getVal', params)
    }
  }
})
</script>
