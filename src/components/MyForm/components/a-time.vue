<template>
  <div>
    <a-time-picker
      @change="change"
      v-model="time_val"
      :placeholder="item.holder || '请选择'"
      :format="item.format ? item.format : 'HH:mm'"
    >
    </a-time-picker>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
export default Vue.extend({
  data() {
    return {
      time_val: ''
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
        this.time_val = val
      }
    }
  },
  methods: {
    change() {
      const params = {
        item_name: this.item.name,
        item_val: this.time_val
      }
      this.$emit('getVal', params)
    }
  }
})
</script>
