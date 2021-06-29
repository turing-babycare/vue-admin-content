<template>
  <div>
    <a-checkbox-group
      v-model="checkbox_val"
      :disabled="item.disabled"
      @change="change"
    >
      <a-checkbox
        v-for="iitem in item.options"
        :key="iitem.value"
        :value="iitem.value"
        name="type"
      >
        {{ iitem.label }}
      </a-checkbox>
    </a-checkbox-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkbox_val: []
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
        console.log(val, 'checkbox_val')
        this.checkbox_val = val
      }
    }
  },
  methods: {
    change(val) {
      const params = {
        item_name: this.item.name,
        item_val: this.checkbox_val
      }
      console.log(params, 'params')
      this.$emit('getVal', params)
    }
  }
}
</script>
