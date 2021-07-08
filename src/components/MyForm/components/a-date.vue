<template>
  <div>
    <a-date-picker
      v-model="date_val"
      :show-time="item.showTime"
      :disabled="item.disabled"
      :disabled-date="item.disabledDate"
      :disabled-time="item.disabledRangeTime"
      type="date"
      :placeholder="item.holder || '请选择日期'"
      :style="item.style || 'width: 90%;'"
      :format="item.format ? item.format : 'YYYY-MM-DD'"
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
      date_val: ''
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
        this.date_val = val
      }
    }
  },
  methods: {
    change() {
      const params = {
        item_name: this.item.name,
        item_val: moment(this.date_val).format(this.item.format)
      }
      this.$emit('getVal', params)
    }
  }
})
</script>
