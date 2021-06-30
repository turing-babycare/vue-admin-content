<template>
  <div>
    <a-radio-group
      @change="change"
      v-model="radio_val"
      :disabled="item.disabled"
    >
      <a-radio
        v-for="iitem in item.options"
        :key="iitem.value"
        :value="iitem.value"
      >
        {{ iitem.label }}
      </a-radio>
    </a-radio-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio_val: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    item_name: {
      default: ''
    }
  },
  watch: {
    item_name: {
      immediate: true,
      handler(val) {
        this.radio_val = val
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.radio_val
      }
      this.$emit('getVal', params)
    }
  }
}
</script>
