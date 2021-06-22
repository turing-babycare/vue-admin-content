<template>
  <div>
    <a-date-picker
      v-model="date_val"
      show-time
      type="date"
      :placeholder="item.holder || '请选择日期'"
      :style="item.style || 'width: 90%;'"
      :format="item.format ? item.format : 'YYYY-MM-DD'"
      @change="change"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      date_val: ""
    };
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
        this.date_val = val;
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.date_val
      };
      this.$emit("getVal", params);
    }
  }
};
</script>
