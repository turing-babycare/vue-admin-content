<template>
  <div>
    <a-date-picker
      v-model="date_val"
      :show-time="item.showTime || false"
      :disabled="item.disabled"
      :disabled-date="item.disabledDate"
      :disabled-time="item.disabledRangeTime"
      :showToday="!item.showToday"
      type="date"
      :placeholder="item.holder || '请选择日期'"
      :style="item.style || 'width: 90%;'"
      :format="itemFormat"
      @change="change"
    />
  </div>
</template>
<script>
import dayjs from 'dayjs'
export default {
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
  computed: {
    itemFormat() {
      return this.item.showTime
        ? 'YYYY-MM-DD HH:mm:ss'
        : this.item.format || 'YYYY-MM-DD'
    }
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
      let params = {}
      if (!this.date_val) {
        params = {
          item_name: this.item.name,
          item_val: undefined
        }
      } else {
        params = {
          item_name: this.item.name,
          item_val: dayjs(this.date_val).format(this.itemFormat)
        }
      }

      this.$emit('getVal', params)
    }
  }
}
</script>
